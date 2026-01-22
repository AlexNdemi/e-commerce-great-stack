<?php
// backend/models/SignupForm.php
namespace backend\models;

use Yii;
use yii\base\Model;
use common\models\Users;

class SignupForm extends Model
{
    public $email;
    public $firstname;

    public $lastname;
    public $password;

    public $uuid;

    public $repeatPassword;


   public function rules()
{
    return [
        [['email', 'password', 'repeatPassword', 'firstname', 'lastname'], 'required'],
        ['email', 'email'],
        [['email','activationHash'], 'unique', 'targetClass' => Users::class],
        ['password', 'string', 'min' => 8],
        ['repeatPassword', 'string', 'min' => 8],
        [['firstname', 'lastname'], 'string', 'min' => 1, 'max' => 255],
        ['uuid', 'string', 'max' => 255],
        ['uuid', 'unique', 'targetClass' => Users::class],
        ['uuid', 'validateUuidFormat'],
        ['repeatPassword', 'compare', 'compareAttribute' => 'password', 'message' => 'Passwords do not match.'],
    ];
}

    public function signup()
    {   
        if (!$this->validate()) {
            return null;
        }
        $user = new Users();
        $user->email = $this->email;
        $user->setPassword($this->password);
        $user->uuid = $this->uuid;
        $user->firstname = $this->firstname;
        $user->lastname=$this->lastname;
        $user->status = Users::getStatusInactive();
        $user->setStatusToInactive();
        $rawToken = $user->generateActivationToken();

        if ($user->save()) {
          $this->sendActivationEmail($user, $rawToken);  

            return $user;
        }

        return null;
    }
    private function sendActivationEmail($user,$rawToken){
      $activationUrl = Yii::$app->params['frontendUrl'] . 'activate-email?token=' . $rawToken;

        Yii::$app->mailer->compose(
            ['html' => 'activationToken-html', 'text' => 'activationToken-text'],
            ['user' => $user, 'activationUrl' => $activationUrl] 
        )
        ->setFrom([Yii::$app->params['adminEmail'] => Yii::$app->name])
        ->setTo($this->email)
        ->setSubject('Activate your account - ' . Yii::$app->name)
        ->send();
    }

    public function validateUuidFormat($attribute, $params)
    {
        if (empty($this->$attribute)) {
            return;
        }
        // Validate it's a proper UUID v4 format
        $pattern = '/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i';

        if (!preg_match($pattern, $this->$attribute)) {
            $this->addError($attribute, 'Invalid UUID format.');
        }
    }
}