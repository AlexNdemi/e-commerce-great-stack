<?php
// backend/mail/passwordResetToken-html.php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $user common\models\Users */
/* @var $activationUrl string */
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
        <p>Account Activation</p>
        <a href="<?= Html::encode($activationtUrl) ?>" class="reset-link">
            click to Activate your account.
        </a>
        <p>Or copy and paste this link into your browser:</p>
        <p><?= Html::encode($activationUrl) ?></p>
    </div>
</body>
</html>

