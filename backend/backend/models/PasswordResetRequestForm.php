<?php
namespace backend\models;

use Yii;
use yii\base\Model;
use common\models\Users;
use common\models\PasswordResetTokens;

class PasswordResetRequestForm extends Model
{
    public $email;

    public function rules()
    {
        return [
            ['email', 'trim'],
            ['email', 'required'],
            ['email', 'email'],
        ];
    }

    public function sendEmail()
    {
        $user = Users::findOne([
            'email' => $this->email,
            'status' => Users::getStatusActive(),
        ]);

        if (!$user) {
            Yii::info("Password reset requested for non-existent email: {$this->email}", __METHOD__);
            return true; // Pretend it worked
        }

        // Generate unique token
        $token = Yii::$app->security->generateRandomString(32);
        $tokenHash = hash('sha256', $token);

        $selector = bin2hex(random_bytes(8));

        // Delete any existing reset tokens for this user
        PasswordResetTokens::deleteAll(['pwdResetEmail' => $user->email]);

        // Save new token to database
        $resetToken = new PasswordResetTokens();
        $resetToken->pwdResetEmail = $user->email;
        $resetToken->pwdResetToken = $tokenHash;
        $resetToken->pwdResetSelector = $selector;
        $resetToken->pwdResetExpires = time() + 3600; // 1 hour expiry
        $resetToken->ip_address = Yii::$app->request->userIP;
        
        if (!$resetToken->save()) {
            throw new \yii\web\ServerErrorHttpException('Unable to process password reset request.');
        }

        // Build reset URL with token
        $resetUrl = Yii::$app->params['frontendUrl'] . 'reset-password?token=' . $token ."&selector=$selector";

        // Send email
        return Yii::$app->mailer->compose(
            ['html' => 'passwordResetToken-html', 'text' => 'passwordResetToken-text'],
            ['user' => $user, 'resetUrl' => $resetUrl]
        )
        ->setFrom([Yii::$app->params['adminEmail'] => Yii::$app->name])
        ->setTo($this->email)
        ->setSubject('Password Reset link  for ' . Yii::$app->name)
        ->send();
    }
}

