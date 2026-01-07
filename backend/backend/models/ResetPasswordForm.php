<?php
namespace backend\models;
use Yii;
use yii\base\Model;
use common\models\Users;
use common\models\PasswordResetTokens;

class ResetPasswordForm extends Model
{
    public $token;
    public $password;

    public $selector;


    public $password_confirm;

    private $_user;

    public function rules()
    {
        return [
            [['token','selector', 'password', 'password_confirm'], 'required'],
            ['token', 'validateToken'],
            ['password', 'string', 'min' => 8],
            ['password_confirm', 'compare', 'compareAttribute' => 'password', 'message' => 'Passwords do not match'],
        ];
    }

    public function validateToken($attribute, $params)
    {
        if (!$this->hasErrors()) {
            $user = $this->getUser();
            if (!$user) {
                $this->addError($attribute, 'Invalid or expired password reset token.');
            }
        }
    }

    public function resetPassword()
    {
        $user = $this->getUser();
        
        if (!$user) {
            return false;
        }

        $user->setPassword($this->password);
        
        if ($user->save(false)) {
            // Delete the used token
            $tokenHash = hash('sha256', $this->token);
            PasswordResetTokens::deleteAll(['pwdResetToken' => $tokenHash]
        );
            // Delete all refresh tokens for this user (logout from all devices)
            RefreshToken::deleteAll(['user_id' => $user->id]);
            
            return true;
        }

        return false;
    }

    protected function getUser()
    {
        if (!$this->_user) {
            $tokenHash = hash('sha256', $this->token);
            $resetToken = PasswordResetTokens::findOne([
                'pwdResetSelector' => $this->selector,
                'pwdResetToken' => $tokenHash
            ]);

            if ($resetToken && $resetToken->pwdResetExpires >= time()) {
                $this->_user = Users::findOne([
                    'email' => $resetToken->pwdResetEmail,
                    'status' => Users::getStatusActive(),
                ]);
            }
        }

        return $this->_user;
    }
}