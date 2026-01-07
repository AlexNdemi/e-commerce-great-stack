<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%password_reset_tokens}}`.
 */
class m251227_101050_create_password_reset_tokens_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%password_reset_tokens}}', [
            'id' => $this->primaryKey(),
            'pwdResetEmail' => $this->string()->notNull(), 
            'pwdResetSelector' => $this->string()-> notNull(), 
            'pwdResetToken' => $this->string()->notNull(), 
            'pwdResetExpires'=> $this->integer()->notNull(), 
            'ip_address' => $this->string(45),]); 
            
            $this->createIndex( 'idx-password_reset_token-token_hash', 'password_reset_tokens', 'pwdResetToken' 
            ); $this->createIndex( 'idx-password_reset_token-expires_at', 'password_reset_tokens', 'pwdResetExpires' 
        ); 
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%password_reset_tokens}}');
    }
}
