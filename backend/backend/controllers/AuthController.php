<?php

namespace backend\controllers;

use Yii;
use yii\rest\Controller;
use common\models\Users;
use backend\models\RefreshToken;
use backend\models\LoginForm;
use backend\models\SignupForm;
use backend\services\JwtService;

class AuthController extends Controller
{
    public $enableCsrfValidation = false;
    
    // Inject the service via the constructor
    public function __construct($id, $module, private JwtService $jwtService, $config = [])
    {
        parent::__construct($id, $module, $config);
    }

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        
        // Remove authenticator for public endpoints
        unset($behaviors['authenticator']);
        
        // CORS is now handled by Apache proxy - removed from here
        
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
    
    // Try to get access token from Authorization header
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
    
    // Access token invalid/missing - try refresh token from cookie
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
    
    // Generate new access token
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

    // Generate new access token
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

    private function handleSuccessfulAuth($user)
    {
        // Generate tokens and expiries
        $accessToken = $this->jwtService->generateAccessToken($user->uuid, $user->firstname, $user->role);

        $refreshToken = $this->jwtService->generateRefreshToken();

        $refreshTokenExpiry = $this->jwtService->getRefreshTokenExpiry();

        $accessTokenExpiryDuration = $this->jwtService->getAccessTokenExpiry(); // Duration in seconds

        // Save refresh token to database
        $this->saveRefreshToken($user->id, $refreshToken, $refreshTokenExpiry);

        // Set HTTP-only cookie for refresh token
        $this->setRefreshTokenCookie($refreshToken, $refreshTokenExpiry);

        // Return standardized response format
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