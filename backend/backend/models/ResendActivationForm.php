<?php
namespace backend\models;

use Yii;
use yii\base\Model;
use common\models\Users;

class ResendActivationForm extends Model
{
    public $email;

    public function rules()
    {
        return [
            ['email', 'required'],
            ['email', 'email'],
            // We do NOT use the 'exist' validator here because we don't 
            // want to return a "User not found" error to the frontend.
        ];
    }

    public function sendEmail()
    {
        $user = Users::findByEmail($this->email);

        // Case 1: User doesn't exist 
        // Case 2: User is already active
        if (!$user || $user->isStatusActive()) {
            // We return true to trick the controller into showing "Success"
            return true; 
        }

        // Case 3: User exists and is Inactive
        // Generate a new token (replaces the old one for security)
        $rawToken = $user->generateActivationToken();

        if ($user->save()) {
            return $this->sendEmailInternal($user, $rawToken);
        }

        return false;
    }

    protected function sendEmailInternal($user, $rawToken)
    {
        $activationUrl = Yii::$app->params['frontendUrl'] . '/activate-account?token=' . $rawToken;

        return Yii::$app->mailer->compose(
            ['html' => 'userActivation-html', 'text' => 'userActivation-text'],
            ['user' => $user, 'activationUrl' => $activationUrl]
        )
        ->setFrom([Yii::$app->params['supportEmail'] => Yii::$app->name])
        ->setTo($this->email)
        ->setSubject('New Activation Link for ' . Yii::$app->name)
        ->send();
    }
}