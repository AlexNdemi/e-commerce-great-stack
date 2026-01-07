<?php

namespace backend\controllers;

use Yii;
use yii\rest\Controller;
use common\models\Users;
use backend\models\RefreshToken;
use backend\models\LoginForm;
use backend\models\SignupForm;
use backend\models\PasswordResetRequestForm;
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
        $behaviors = parent::behaviors();
        unset($behaviors['authenticator']);
        return $behaviors;
    }

    public function actionLogin()
    {
        $model = new LoginForm();
        $model->load(Yii::$app->request->post(), '');

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
            return $this->handleSuccessfulAuth($user);
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
        $params = Yii::$app->request->queryParams;

        // Access using array syntax
        $token = $params['token'] ?? null; 
        $selector = $params['selector'] ?? null;
        
        if (!$token || !$selector) {
            Yii::$app->response->statusCode = 400;
        return [
            'valid' => false,
            'error' => 'Invalid reset link'
        ];
}

        $tokenHash = hash('sha256', $token);
        $resetToken = \common\models\PasswordResetTokens::findValidToken($tokenHash,$selector);

        if (!$resetToken) {
            Yii::$app->response->statusCode = 400;
            return ['valid' => false, 'error' => 'Invalid or expired token'];
        }
        return ['valid' => true];
    }

    /**
     * Reset password with token
     * POST /auth/reset-password
     * Body: { "token": "xxxxx", "password": "newpass", "password_confirm": "newpass" }
     */
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