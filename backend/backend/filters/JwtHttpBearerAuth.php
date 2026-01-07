<?php
// backend/filters/JwtHttpBearerAuth.php
namespace backend\filters;

use Yii;
use yii\filters\auth\HttpBearerAuth;
use common\models\Users;
use backend\services\JwtService;

class JwtHttpBearerAuth extends HttpBearerAuth
{
    /**
     * @inheritdoc
     */
    public function authenticate($user, $request, $response)
    {
        $authHeader = $request->getHeaders()->get('Authorization');
        
        if ($authHeader !== null && preg_match('/^Bearer\s+(.*?)$/', $authHeader, $matches)) {
            $token = $matches[1];
            
            // Validate JWT token
            $jwtService = new JwtService();
            $payload = $jwtService->validateAccessToken($token);
            
            if ($payload !== null) {
                // Find user from JWT payload
                $identity = Users::findActiveUser($payload['sub']);
                
                if ($identity !== null) {
                    // Login user without session
                    Yii::$app->user->setIdentity($identity);
                    return $identity;
                }
            }
        }
        
        // No valid token found
        $this->handleFailure($response);
        return null;
    }
    
    /**
     * @inheritdoc
     */
    public function handleFailure($response)
    {
        $response->setStatusCode(401);
        $response->data = [
            'error' => 'Unauthorized',
            'message' => 'Your request was made with invalid credentials.',
        ];
    }
}