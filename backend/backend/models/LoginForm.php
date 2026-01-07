<?php
// backend/models/LoginForm.php
namespace backend\models;

use Yii;
use yii\base\Model;
use common\models\Users;

class LoginForm extends Model
{
    public $email;
    public $password;

    private $_user;

    public function rules()
    {
        return [
            [['email', 'password'], 'required'],
            ['email', 'email'],
            ['password', 'validatePassword'],
        ];
    }

    public function validatePassword($attribute, $params): void
    {
        if (!$this->hasErrors()) {
            $user = $this->getUser();
            if (!$user || !$user->validatePassword($this->password)) {
                $this->addError($attribute, 'Incorrect email or password.');
            }
        }
    }

   public function getUser()
{
    if ($this->_user === null) {
        $this->_user = Users::findByEmail($this->email);
    }
    
    return $this->_user;
}
}