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
            'status' => $this->smallInteger()->notNull()->defaultValue(10),            
            'password_hash'=> $this->string()->notNull(),
            'created_at' => $this->integer()->notNull(),
            'updated_at' => $this->integer()->notNull(),

        ]);

        $this->createIndex('idx-users-email', '{{%users}}', 'email');
        $this->createIndex('idx-users-status', '{{%users}}', 'status');


    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%users}}');
    }
}
