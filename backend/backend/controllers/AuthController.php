<?php

namespace backend\controllers;

use Yii;
use yii\rest\Controller;
use yii\filters\Cors;
use common\models\Users;
use common\models\PasswordResetTokens;
use backend\models\RefreshToken;
use backend\models\LoginForm;
use backend\models\SignupForm;
use backend\models\PasswordResetRequestForm;
use backend\models\ResendActivationForm;
use backend\models\ResetPasswordForm;
use backend\services\JwtService;

class AuthController extends Controller
{
    public $enableCsrfValidation = false;
    
    public function __construct($id, $module, private JwtService $jwtService, $config = [])
    {
        parent::__construct($id, $module, $config);
    }

    public function behaviors()
    {
        $behaviors['corsFilter'] = [
            'class' => Cors::class,
        ];
        $behaviors['rateLimiter'] = [
            'class' => \backend\components\IpRateLimiter::class,
            'actions' => ['login', 'signup', 'resend-activation'],
            'limit' => 10,
            'window' => 60,
            'message' => 'Too many attempts from your IP. Please wait a minute.'
        ];

    
        $behaviors['strictRateLimiter'] = [
            'class' => \backend\components\IpRateLimiter::class,
            'actions' => ['request-password-reset'],
            'limit' => 3,
            'window' => 300, // 5 minutes
            'message' => 'Please wait 5 minutes before requesting another reset link.'
        ];
        
        return $behaviors;
    }

   public function actionLogin()
{
    $model = new LoginForm();
    $model->load(Yii::$app->request->post(), '');

    if (!$model->validate() && isset($model->getErrors()['activation'])) {
        Yii::$app->response->statusCode = 403;
        return [
            'error_type' => 'inactive_account',
            'message' => $model->getFirstError('activation')
        ];
    }

    if (!$model->validate()) {
        Yii::$app->response->statusCode = 422;
        return ['errors' => $model->getErrors()];
    }

    $user = $model->getUser();
    return $this->handleSuccessfulAuth($user);
}

    public function actionSignup()
    {
        $model = new SignupForm();
        $model->load(Yii::$app->request->post(), '');

        if (!$model->validate()) {
            Yii::$app->response->statusCode = 422;
            return ['errors' => $model->getErrors()];
        }

        $user = $model->signup();

        if ($user) {
        Yii::$app->response->statusCode = 201;
        // Do NOT log them in. Instead, return a message for the frontend.
        return [
            'success' => true,
            'message' => 'Registration successful! Please check your email to activate your account.',
            'email' => $user->email
        ];
    }

        Yii::$app->response->statusCode = 500;
        return ['error' => 'Unable to create user'];
    }
    
    public function actionVerify()
    {
        $authHeader = Yii::$app->request->headers->get('Authorization');
        $accessToken = null;
        
        if ($authHeader && preg_match('/^Bearer\s+(.*)$/i', $authHeader, $matches)) {
            $accessToken = $matches[1];
            $payload = $this->jwtService->validateAccessToken($accessToken);
            
            if ($payload) {
                $user = Users::findActiveUser($payload['sub']);
                
                if ($user) {
                    return [
                        'token' => [
                            'token' => $accessToken,
                            'expires_in' => $payload['exp'] - time(),
                        ],
                        'user' => [
                            'id' => $user->uuid,
                            'email' => $user->email,
                            'username' => $user->firstname,
                            'role' => $user->role
                        ],
                    ];
                }
            }
        }
        
        $refreshToken = Yii::$app->request->cookies->getValue('refresh_token');
        
        if (!$refreshToken) {
            Yii::$app->response->statusCode = 401;
            return ['error' => 'Authentication required'];
        }
        
        $tokenHash = hash('sha256', $refreshToken);
        $storedToken = RefreshToken::findValidToken($tokenHash);
        
        if (!$storedToken) {
            Yii::$app->response->statusCode = 401;
            return ['error' => 'Invalid or expired refresh token'];
        }
        
        $user = $storedToken->user;
        
        if (!$user || $user->status !== Users::getStatusActive()) {
            Yii::$app->response->statusCode = 401;
            return ['error' => 'User not found or inactive'];
        }
        
        $newAccessToken = $this->jwtService->generateAccessToken($user->uuid, $user->firstname, $user->role);
        $accessTokenExpiryDuration = $this->jwtService->getAccessTokenExpiry();
        
        return [
            'token' => [
                'token' => $newAccessToken,
                'expires_in' => $accessTokenExpiryDuration,
            ],
            'user' => [
                'id' => $user->uuid,
                'email' => $user->email,
                'username' => $user->firstname,
                'role' => $user->role
            ],
        ];
    }

    public function actionRefresh()
    {
        $refreshToken = Yii::$app->request->cookies->getValue('refresh_token');
        
        if (!$refreshToken) {
            Yii::$app->response->statusCode = 401;
            return ['error' => 'Refresh token required'];
        }

        $tokenHash = hash('sha256', $refreshToken);
        $storedToken = RefreshToken::findValidToken($tokenHash);

        if (!$storedToken) {
            Yii::$app->response->statusCode = 401;
            return ['error' => 'Invalid or expired refresh token'];
        }

        $user = $storedToken->user;
        
        if (!$user || !$user->isStatusActive()) {
            Yii::$app->response->statusCode = 401;
            return ['error' => 'User not found or inactive'];
        }

        $accessToken = $this->jwtService->generateAccessToken($user->uuid, $user->firstname, $user->role);
        $accessTokenExpiryDuration = $this->jwtService->getAccessTokenExpiry();

        return [
            'token' => [
                'token' => $accessToken,
                'expires_in' => $accessTokenExpiryDuration,
            ],
        ];
    }

    public function actionLogout()
    {
        $refreshToken = Yii::$app->request->cookies->getValue('refresh_token');
        
        if ($refreshToken) {
            $tokenHash = hash('sha256', $refreshToken);
            RefreshToken::deleteAll(['token_hash' => $tokenHash]);
        }

        $this->clearRefreshTokenCookie();
        return ['message' => 'Successfully logged out'];
    }

    /**
     * Request password reset - sends email with reset link
     * POST /auth/request-password-reset
     * Body: { "email": "user@example.com" }
     */
    public function actionRequestPasswordReset()
    {
        $model = new PasswordResetRequestForm();
    
        if ($model->load(Yii::$app->request->post(), '') && $model->validate()) {

            try {
                $model->sendEmail();
            
            return [
                'success' => true,
                'message' => 'If an account exists with this email, you will receive a password reset link.'
            ];
            
        } catch (\yii\web\ServerErrorHttpException $e) {
            Yii::$app->response->statusCode = 500;
            return [
                'success' => false,
                'message' => 'Unable to process your request. Please try again later.'
            ];
        }
    }
    
    Yii::$app->response->statusCode = 422;
    return [
        'success' => false,
        'message' => 'Validation failed',
        'errors' => $model->errors
    ];
}

    /**
     * Validate password reset token
     * GET /auth/validate-reset-token?token=xxxxx
     */
    public function actionValidateResetToken()
{
    Yii::info('Validate reset token called', __METHOD__);
    
    $params = Yii::$app->request->queryParams;
    $token = $params['token'] ?? null;
    $selector = $params['selector'] ?? null;
    
    Yii::info("Token: $token, Selector: $selector", __METHOD__);
    
    if (!$token || !$selector) {
        Yii::warning('Missing token or selector', __METHOD__);
        Yii::$app->response->statusCode = 400;
        return [
            'valid' => false,
            'message' => 'Invalid reset link'
        ];
    }
    
    
    $resetToken = PasswordResetTokens::findValidResetToken($token, $selector);
    
    if (!$resetToken) {
        Yii::warning('Token not found in database', __METHOD__);
        Yii::$app->response->statusCode = 400;
        return ['valid' => false, 'message' => 'Invalid or expired token'];
    }
    
    Yii::info('Token validated successfully', __METHOD__);
    return [
        'valid' => true,
        'message' => "Token validated successfully you can now go on to reset your password"
    ];
}

public function actionResendActivation()
{
    $model = new ResendActivationForm();
    $model->load(Yii::$app->request->post(), '');

    // Even if the email doesn't exist, we return 200 OK with this message
    if ($model->validate() && $model->sendEmail()) {
        return [
            'success' => true,
            'message' => 'If an account exists with that email, a new activation link has been sent.'
        ];
    }

    // Only return errors for malformed emails (e.g. "not-an-email")
    Yii::$app->response->statusCode = 422;
    return ['errors' => $model->getErrors()];
}

public function actionActivateAccount($token)
{
    $user = Users::findByActivationToken($token);
    
    if (!$user) {
        Yii::$app->response->statusCode = 400;
        return ['valid' => false, 'message' => 'Invalid or expired activation link.'];
    }

    // Guard: If already active, just send them to login
    if ($user->isStatusActive()) {
        return ['valid' => true, 'message' => 'Account is already active.'];
    }

    $user->setStatusToActive();
    $user->removeActivationHash(); // CLEAR THE HASH HERE

    if ($user->save()) {
        return ['valid' => true, 'message' => 'Account successfully activated!'];
    }

    Yii::$app->response->statusCode = 500;
    return ['valid' => false, 'message' => 'Could not activate account. Please try again.'];
}

   

    
    public function actionResetPassword()
    {
        $model = new ResetPasswordForm();
        $model->load(Yii::$app->request->post(), '');

        if (!$model->validate()) {
            Yii::$app->response->statusCode = 422;
            return ['errors' => $model->getErrors()];
        }

        if ($model->resetPassword()) {
            return [
                'success' => true,
                'message' => 'Password has been reset successfully. You can now login with your new password.'
            ];
        }

        Yii::$app->response->statusCode = 500;
        return ['error' => 'Unable to reset password'];
    }

    private function handleSuccessfulAuth($user)
    {
        $accessToken = $this->jwtService->generateAccessToken($user->uuid, $user->firstname, $user->role);
        $refreshToken = $this->jwtService->generateRefreshToken();
        $refreshTokenExpiry = $this->jwtService->getRefreshTokenExpiry();
        $accessTokenExpiryDuration = $this->jwtService->getAccessTokenExpiry();

        $this->saveRefreshToken($user->id, $refreshToken, $refreshTokenExpiry);
        $this->setRefreshTokenCookie($refreshToken, $refreshTokenExpiry);

        return [
            'user' => [
                'id' => $user->uuid,
                'email' => $user->email,
                'username' => $user->firstname,
                'role' => $user->role
            ],
            'token' => [
                'token' => $accessToken,
                'expires_in' => $accessTokenExpiryDuration,
            ],
        ];
    }

    private function saveRefreshToken($userId, $refreshToken, $refreshTokenExpiry)
    {
        $model = new RefreshToken();
        $model->user_id = $userId;
        $model->token_hash = hash('sha256', $refreshToken);
        $model->ip_address = Yii::$app->request->userIP;
        $model->user_agent = Yii::$app->request->userAgent;
        $model->expires_at = $refreshTokenExpiry;
        return $model->save();
    }

    private function setRefreshTokenCookie($refreshToken, $expiry)
    {
        Yii::$app->response->cookies->add(new \yii\web\Cookie([
            'name' => 'refresh_token',
            'value' => $refreshToken,
            'expire' => $expiry,
            'httpOnly' => true,
            'secure' => YII_ENV_PROD,
            'sameSite' => 'Lax',
            'path' => '/',
            'domain' => ''
        ]));
    }

    private function clearRefreshTokenCookie()
    {
        Yii::$app->response->cookies->add(new \yii\web\Cookie([
            'name' => 'refresh_token',
            'value' => '',
            'expire' => 1,
            'path' => '/',
        ]));
    }
}