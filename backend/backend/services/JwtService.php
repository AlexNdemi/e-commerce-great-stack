<?php
namespace backend\services;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Yii;
use yii\base\Component;

class JwtService extends Component 
{
    private $refreshTokenExpire;
    private $accessTokenExpireSeconds;
    private $secret;
    
    public function __construct($config = []) // Add $config parameter for Yii component compatibility
    {
        parent::__construct($config); // Call parent constructor if using yii\base\Component

        $this->refreshTokenExpire = Yii::$app->params['jwtRefreshExpire'];

        $this->accessTokenExpireSeconds = Yii::$app->params['jwtAccessExpire'];

        $this->secret = Yii::$app->params['jwtSecret'];
    }

    public function generateAccessToken(string $userId, string $username, string $role)
    {
        $now = time();
        $exp = $now + $this->accessTokenExpireSeconds; 

        $payload = [
            'iss' => 'http://192.168.100.5:5173', 
            'iat' => $now,
            'nbf' => $now,
            'exp' => $exp,
            'sub' => (string)$userId,
            'role' => $role,
            'username' => $username,
        ];

        return JWT::encode($payload, $this->secret, 'HS256');
    }

   
    public function validateAccessToken($token): ?array
    {
        try {
            $decoded = JWT::decode($token, new Key($this->secret, 'HS256'));
            return (array)$decoded;
        } catch (\Exception $e) {
            Yii::error('JWT validation failed: ' . $e->getMessage());
            return null;
        }
    }

   
    public function generateRefreshToken(): string
    {
        return Yii::$app->security->generateRandomString(128);
    }

    
    public function getRefreshTokenExpiry(): int
    {
        return time() + $this->refreshTokenExpire;
    }

    public function getAccessTokenExpiry(): int
    {
        return $this->accessTokenExpireSeconds;
    }
}
