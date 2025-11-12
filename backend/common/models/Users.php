<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "{{%users}}".
 *
 * @property int $id
 * @property string|null $role
 * @property string|null $firstname
 * @property string|null $lastname
 * @property string $email
 * @property string|null $address
 * @property string|null $region
 * @property string|null $city
 * @property string $password_hash
 */
class Users extends \yii\db\ActiveRecord
{

    /**
     * ENUM field values
     */
    const ROLE_CUSTOMER = 'customer';
    const ROLE_ADMIN = 'admin';

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return '{{%users}}';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['role', 'firstname', 'lastname', 'address', 'region', 'city'], 'default', 'value' => null],
            [['role'], 'string'],
            [['email', 'password_hash'], 'required'],
            [['role'], 'default','value' => 'customer'],
            [['firstname', 'lastname', 'email', 'address', 'region', 'city', 'password_hash'], 'string', 'max' => 255],
            ['role', 'in', 'range' => array_keys(self::optsRole())],
            [['email'], 'unique'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'role' => 'Role',
            'firstname' => 'Firstname',
            'lastname' => 'Lastname',
            'email' => 'Email',
            'address' => 'Address',
            'region' => 'Region',
            'city' => 'City',
            'password_hash' => 'Password Hash',
        ];
    }

    /**
     * {@inheritdoc}
     * @return \common\models\query\UsersQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \common\models\query\UsersQuery(get_called_class());
    }


    /**
     * column role ENUM value labels
     * @return string[]
     */
    public static function optsRole()
    {
        return [
            self::ROLE_CUSTOMER => 'customer',
            self::ROLE_ADMIN => 'admin',
        ];
    }

    /**
     * @return string
     */
    public function displayRole()
    {
        return self::optsRole()[$this->role];
    }

    /**
     * @return bool
     */
    public function isRoleCustomer()
    {
        return $this->role === self::ROLE_CUSTOMER;
    }

    public function setRoleToCustomer()
    {
        $this->role = self::ROLE_CUSTOMER;
    }

    /**
     * @return bool
     */
    public function isRoleAdmin()
    {
        return $this->role === self::ROLE_ADMIN;
    }

    public function setRoleToAdmin()
    {
        $this->role = self::ROLE_ADMIN;
    }
}
