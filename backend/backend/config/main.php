<?php
use backend\controllers;

$params = [
    ...require __DIR__ . '/../../common/config/params.php',
    ...require __DIR__ . '/../../common/config/params-local.php',
    ...require __DIR__ . '/params.php',
    ...require __DIR__ . '/params-local.php'
];

return [
    'id' => 'app-backend',
    'basePath' => dirname(__DIR__),
    'controllerNamespace' => 'backend\controllers',
    'bootstrap' => ['log'],
    'modules' => [
        'class' => \yii\symfonymailer\Mailer::class,
    ],
    'components' => [
        'mailer' =>[

        ],
        'request' => [
            'csrfParam' => '_csrf-backend',
            'parsers' => [
                'application/json' => yii\web\JsonParser::class
            ],
            'cookieValidationKey' => $params['cookieValidationKey'],
        ],
        'user' => [
            'identityClass' => common\models\Users::class,
            'enableAutoLogin' => false, 
            'enableSession' => false,
            'loginUrl' => null,
        ],
        'response' => [
            'format' => yii\web\Response::FORMAT_JSON, // Always return JSON
            'charset' => 'UTF-8',
            'formatters' => [
                \yii\web\Response::FORMAT_JSON => [
                    'class' => 'yii\web\JsonResponseFormatter',
                    'prettyPrint' => YII_DEBUG, // Pretty print in dev
                    'encodeOptions' => JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE,
                ],
            ],
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => \yii\log\FileTarget::class,
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'errorHandler' => [
            'errorAction' => 'site/error',
        ],
        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'enableStrictParsing' => true, // Only defined routes work
            'rules' => [
                // Auth routes (public)
                'POST auth/login' => 'auth/login',
                'POST auth/signup' => 'auth/signup',
                'GET auth/refresh' => 'auth/refresh',
                'POST auth/logout' => 'auth/logout',
                'GET auth/verify' => 'auth/verify',
                
                // Protected routes example
                'GET profile' => 'profile/index',
                'PUT profile' => 'profile/update',
                
                // Users resource (protected)
                [
                    'class' => \yii\rest\UrlRule::class,
                    'controller' => 'users',
                    'pluralize' => false,
                    'except' => ['create', 'delete'], // Signup handled separately
                    'extraPatterns' => [
                        'GET me' => 'me', // Custom endpoint for current user
                    ],
                ],
                
                // Default error route
                '<controller:[\w-]+>/<action:[\w-]+>' => '<controller>/<action>',
            ],
        ],
    ],
    'params' => $params,
    
    // CORS is now handled by Apache proxy - removed from here
];