<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%users}}`.
 */
class m251107_221509_create_users_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%users}}', [
            'id' => $this->primaryKey(),
            'role' =>"ENUM('customer', 'admin')",
            'firstname'=>$this->string(),
            'lastname'=>$this->string(),
            'email' => $this->string()->notNull()->unique(),
            'address'=>$this->string(),
            'region'=>$this->string(),
            'city'=>$this->string(),
            'password_hash'=> $this->string()->notNull()
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%users}}');
    }
}
