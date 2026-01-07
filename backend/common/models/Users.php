<?php

namespace common\models;

use Yii;
use yii\behaviors\TimestampBehavior;
use yii\web\IdentityInterface;


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
 * @property int $status
 * @property string|null $mobile_no
 * @property string $password_hash
 * @property string $uuid
 * @property int|null $created_at
 * @property int|null $updated_at  
 */
class Users extends \yii\db\ActiveRecord 
{
    /**
     * ENUM field values
     */
    private const ROLE_CUSTOMER = 'customer';
    private const ROLE_ADMIN = 'admin';


    /**
     *STATUS  field values
     */
    private const STATUS_DELETED = 0;
    private const STATUS_INACTIVE = 9;
    private const STATUS_ACTIVE = 10;

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return '{{%users}}';
    }

    public function behaviors()
    {
        return [
            TimestampBehavior::class,
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            ['status', 'default', 'value' => self::STATUS_ACTIVE],
            ['status', 'in', 'range' => [self::STATUS_ACTIVE, self::STATUS_DELETED]],
            [['role', 'firstname', 'lastname', 'address', 'region', 'city', 'mobile_no'], 'default', 'value' => null],
            [['role', 'uuid'], 'string'],
            [['email', 'password_hash','uuid'], 'required'],
            ['role', 'default','value' => self::ROLE_CUSTOMER],
            ['mobile_no', 'match', 'pattern' => '/^\+(?:[1-9]\d{0,2})(?:\d{4,14})$/', 'message' => 'Invalid format.Use international format, like +254712345678..'],
            [['firstname', 'lastname', 'email', 'address', 'region', 'city','uuid', 'password_hash'], 'string', 'max' => 255],
            ['role', 'in', 'range' => array_keys(self::optsRole())],
            [['email'], 'unique'],
        ];
    }


    public static function findActiveUser($id)
    {
        return static::findOne(['id' => $id, 'status' => self::STATUS_ACTIVE]);
    }

    public static function findByEmail($email): Users|null
    {
        return static::findOne(['email' => $email, 'status' => self::STATUS_ACTIVE]);
    }

    
    public function validatePassword($password)
    {
        return Yii::$app->security->validatePassword($password, $this->password_hash);
    }

    public function setPassword($password)
    {
        $this->password_hash = Yii::$app->security->generatePasswordHash($password);
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'role' => 'Role',
            'status' =>'Status',
            'firstname' => 'Firstname',
            'lastname' => 'Lastname',
            'email' => 'Email',
            'address' => 'Address',
            'region' => 'Region',
            'mobile_no'=>'Mobile No',
            'uuid'=>'Uuid',
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


    /**
     * column status ENUM value labels
     * @return string[]
     */
    public static function optsStatus()
    {
        return [
            self::STATUS_ACTIVE => 'active',
            self::STATUS_DELETED => 'deleted',
            self::STATUS_INACTIVE => 'inactive'
        ];
    }

    /**
     * @return string
     */
    public function displayStatus()
    {
        return self::optsStatus()[$this->status];
    }

    /**
     * @return bool
     */
    public function isStatusActive(): bool
    {
        return $this->status === self::STATUS_ACTIVE;
    }

     /**
     * @return bool
     */
    public function isStatusInactive()
    {
        return $this->status === self::STATUS_INACTIVE;
    }

      /**
     * @return bool
     */
    public function isStatusDeleted(): bool
    {
        return $this->status === self::STATUS_DELETED;
    }

    public function setStatusToInactive()
    {
        $this->status = self::STATUS_INACTIVE;
    }

    public function setStatusToActive()
    {
        $this->status = self::STATUS_ACTIVE;
    }

    public function setStatusToDeleted()
    {
        $this->status = self::STATUS_DELETED;
    }

    public static function getStatusActive()
    {
        return self::STATUS_ACTIVE;
    }

    public static function getStatusDeleted(){
        return self::STATUS_DELETED;
    }

    public static function getStatusInactive(){
        return self::STATUS_INACTIVE;
    }

    public static function getRoleCustomer(){
        return self::ROLE_CUSTOMER;
    }

    public static function getRoleAdmin(){
        return self::ROLE_ADMIN;
    }
}
