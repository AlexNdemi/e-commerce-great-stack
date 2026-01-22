<?php
namespace backend\controllers;

use Yii;
use yii\rest\Controller;
use yii\filters\ContentNegotiator;
use yii\web\Response;
use yii\filters\AccessControl;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\Cors;

class BaseApiController extends Controller
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();

        // 1. Handle CORS (Cross-Origin Resource Sharing)
        $behaviors['corsFilter'] = [
            'class' => Cors::class,
        ];

        // 2. Format everything as JSON
        $behaviors['contentNegotiator'] = [
            'class' => ContentNegotiator::class,
            'formats' => [
                'application/json' => Response::FORMAT_JSON,
            ],
        ];

        // 3. Authenticate via Bearer Token (JWT)
        $behaviors['authenticator'] = [
            'class' => HttpBearerAuth::class,
        ];

        // 4. RBAC Access Control
        $behaviors['access'] = [
            'class' => AccessControl::class,
            'rules' => $this->accessRules(),
        ];

        return $behaviors;
    }

    /**
     * Define permission rules in child controllers.
     * Defaults to denying everyone if not overridden.
     */
    protected function accessRules()
    {
        return [
            [
                'allow' => false, // Default Deny
            ],
        ];
    }
}