<?php
// backend/mail/passwordResetToken-text.php

/* @var $this yii\web\View */
/* @var $user common\models\Users */
/* @var $resetUrl string */
?>
Password Reset Request

Hello <?= $user->firstname ?>,

We received a request to reset your password. Click the link below to create a new password:

<?= $resetUrl ?>

This link will expire in 1 hour.

If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.

Best regards,
The <?= Yii::$app->name ?> Team

