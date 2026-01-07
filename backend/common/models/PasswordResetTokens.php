<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "{{%password_reset_tokens}}".
 *
 * @property int $id
 * @property string $pwdResetEmail
 * @property string $pwdResetSelector
 * @property string $pwdResetToken
 * @property int $pwdResetExpires
 * @property string|null $ip_address
 */
class PasswordResetTokens extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return '{{%password_reset_tokens}}';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['ip_address'], 'default', 'value' => null],
            [['pwdResetEmail', 'pwdResetSelector', 'pwdResetToken', 'pwdResetExpires'], 'required'],
            [['pwdResetExpires'], 'integer'],
            [['pwdResetEmail', 'pwdResetSelector', 'pwdResetToken'], 'string', 'max' => 255],
            [['ip_address'], 'string', 'max' => 45],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'pwdResetEmail' => 'Pwd Reset Email',
            'pwdResetSelector' => 'Pwd Reset Selector',
            'pwdResetToken' => 'Pwd Reset Token',
            'pwdResetExpires' => 'Pwd Reset Expires',
            'ip_address' => 'Ip Address',
        ];
    }

    /**
     * {@inheritdoc}
     * @return \common\models\query\PasswordResetTokensQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \common\models\query\PasswordResetTokensQuery(get_called_class());
    }

     /**
     * Finds a valid token by hash
     */
    public static function findValidToken(string $token, string $selector)
    {
        $record = static::find()
            ->where(['pwdResetSelector' => $selector])
            ->andWhere(['>', 'pwdResetExpires', time()])
            ->one();

        if (!$record) {
            return null;
        }

        if (!hash_equals($record->pwdResetToken, hash('sha256', $token))) {
            return null;
        }

        return $record;
}


    /**
     * Delete expired tokens (can be run as a cron job)
     */
    public static function deleteExpired()
    {
        return static::deleteAll(['<', 'pwdResetExpires', time()]);
    }

}
