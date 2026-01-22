<?php
use yii\helpers\Html;

/** @var yii\web\View $this */
/** @var common\models\Users $user */
/** @var string $activationUrl */

?>
<div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 10px;">
    <h2 style="color: #f68b1e; margin-bottom: 20px;">Activate Your Account</h2>
    
    <p>Hello <?= Html::encode($user->firstname) ?>,</p>
    
    <p>Thank you for joining <strong><?= Html::encode(Yii::$app->name) ?></strong>. To get started, please confirm your email address by clicking the button below:</p>
    
    <div style="text-align: center; margin: 30px 0;">
        <?= Html::a('Activate My Account', $activationUrl, [
            'style' => 'background-color: #f68b1e; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;'
        ]) ?>
    </div>
    
    <p style="font-size: 14px; color: #666;">
        If the button above doesn't work, copy and paste this link into your browser:
        <br>
        <?= Html::a($activationUrl, $activationUrl, ['style' => 'color: #f68b1e; word-break: break-all;']) ?>
    </p>
    
    <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">
    
    <p style="font-size: 12px; color: #999; text-align: center;">
        If you did not create an account, no further action is required.
        <br>
        &copy; <?= date('Y') ?> <?= Html::encode(Yii::$app->name) ?>. All rights reserved.
    </p>
</div>