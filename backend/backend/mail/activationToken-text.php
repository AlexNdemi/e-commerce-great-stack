<?php
// backend/mail/passwordResetToken-text.php

/* @var $this yii\web\View */
/* @var $user common\models\Users */
/* @var $activationUrl string */
?>
Account Activation

Hello <?= $user->firstname ?>,

You created your account now activate it . Click the link below to Activate your account:

<?= $activationUrl ?>

If you didn't create an account with us , you can safely ignore this email.

Best regards,
The <?= Yii::$app->name ?> Team