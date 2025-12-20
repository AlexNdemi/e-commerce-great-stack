<?php
// backend/models/RefreshToken.php
namespace backend\models;

use Yii;
use common\models\Users;
use yii\behaviors\TimestampBehavior;
use yii\db\ActiveRecord;


/**
 * @property int $id
 * @property int $user_id
 * @property string $token_hash
 * @property string|null $ip_address
 * @property string|null $user_agent
 * @property int $expires_at
 * @property int $created_at
 * @property int $updated_at
 * @property Users $user
 */

class RefreshToken extends ActiveRecord
{
    public static function tableName()
    {
        return '{{%refresh_tokens}}';
    }

    public function behaviors()
    {
        return [
            TimestampBehavior::class,
        ];
    }

    public function rules()
    {
        return [
            [['user_id', 'token_hash', 'expires_at'], 'required'],
            [['user_id', 'expires_at', 'created_at','updated_at'], 'integer'],
            [['token_hash'], 'string', 'max' => 64],
            [['ip_address'], 'string', 'max' => 45],
            [['user_agent'], 'string'],
            ['user_id', 'validateUserIsActive'],
            ['user_id', 'exist', 'skipOnError' => true, 'targetClass' => Users::class, 'targetAttribute' => ['user_id' => 'id']],
        ];
    }
    

    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'user_id' => 'User ID',
            'token_hash' => 'Token Hash',
            'ip_address' => 'IP Address',
            'user_agent' => 'User Agent',
            'expires_at' => 'Expires At',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At'
        ];
    }

    public function getUser()
    {
        return $this->hasOne(Users::class, ['id' => 'user_id']);
    }

    public static function findValidToken($tokenHash)
    {
        return static::find()
            ->where(['token_hash' => $tokenHash])
            ->andWhere(['>', 'expires_at', time()])
            ->one();
    }

    public function validateUserIsActive($attribute, $params)
    {
        if ($this->hasErrors($attribute)) {
            return;
        }

        $user = Users::findActiveUser($this->$attribute);

        if (!$user) {
            $this->addError($attribute, 'The associated user account is inactive or invalid.');
        }
    }

}
