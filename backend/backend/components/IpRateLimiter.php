<?php
namespace backend\components;

use Yii;
use yii\base\Behavior;
use yii\web\Controller;
use yii\web\HttpException;

class IpRateLimiter extends Behavior
{
    
    public $actions = [];       
    public $limit = 5;          
    public $window = 60;  
    public $message = 'Too many requests. Please slow down.';

    public function events()
    {
        return [
            Controller::EVENT_BEFORE_ACTION => 'checkRateLimit',
        ];
    }

    public function checkRateLimit($event)
    {
        $actionId = $event->action->id;

        if (!in_array($actionId, $this->actions)) {
            return;
        }

        $cache = Yii::$app->cache;
        $ip = Yii::$app->request->userIP;
        $key = "ip_limit_{$actionId}_{$ip}";

        $attempts = $cache->get($key) ?: 0;

        if ($attempts >= $this->limit) {
            
            throw new HttpException(429, $this->message);
        }

        $cache->set($key, $attempts + 1, $this->window);
    }
}