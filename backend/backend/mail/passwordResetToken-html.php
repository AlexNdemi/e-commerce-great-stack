<?php
// backend/mail/passwordResetToken-html.php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $user common\models\Users */
/* @var $resetUrl string */
?>
<!DOCTYPE html>
<html>
<head>
    <style>
        .reset-link {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: white;
            background-color: #f68b1e;
            text-decoration: none;
            border-radius: 5px;
        }
        .reset-link:hover {
            background-color: #e07a0e;
        }
    </style>
</head>
<body>
    <div>
        <p>Hello <?= Html::encode($user->firstname) ?>,</p>
        <p>You have requested a password reset. Please follow the link below to reset your password:</p>
        <a href="<?= Html::encode($resetUrl) ?>" class="reset-link">
            Reset Your Password
        </a>
        <p>Or copy and paste this link into your browser:</p>
        <p><?= Html::encode($resetUrl) ?></p>
        <p><strong>This link will expire in 1 hour.</strong></p>
        <p>Please ignore this email if you did not request a password change.</p>
    </div>
</body>
</html><!DOCTYPE html>
<html>
<head>
    <style>
        .reset-link {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: white;
            background-color: #f68b1e;
            text-decoration: none;
            border-radius: 5px;
        }
        .reset-link:hover{
          background-color:#e07a0e
        }
    </style>
</head>
<body>
    <div>
        <p>Hello User,</p>
        <p>You have requested a password reset. Please follow the link below to reset your password:</p>
        <a href="yourwebsite.com" class="reset-link">
            Reset Your Password
        </a>
        <p>Please ignore this email if you did not request a password change.</p>
    </div>
</body>
</html>
