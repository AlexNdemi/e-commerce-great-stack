<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%refresh_tokens}}`.
 */
class m251121_093541_create_refresh_tokens_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%refresh_tokens}}', [
            'id' => $this->primaryKey(),
            'user_id' => $this->integer()->null(),
            'token_hash'=>$this->string(64)->notNull()->unique(),
            'ip_address' => $this->string(45),
            'user_agent' => $this->text(),
            'updated_at'=>$this->integer()->notNull(),
            'expires_at'=>$this->integer()->notNull(),
            'created_at'=>$this->integer()->notNull()
        ]);

        $this->createIndex('idx-refresh_token-user_id', '{{%refresh_tokens}}', 'user_id');
        $this->createIndex('idx-refresh_token-token_hash', '{{%refresh_tokens}}', 'token_hash');
        $this->createIndex('idx-refresh_token-expires_at', '{{%refresh_tokens}}', 'expires_at');

        $this->addForeignKey(
            'fk-refresh_tokens_users_user_id','refresh_tokens','user_id','{{%users}}','id','CASCADE',
            'CASCADE'
        );

    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropForeignKey('fk-refresh_tokens_user_user_id','{{%refresh_tokens}}');
        $this->dropTable('{{%refresh_tokens}}');
    }
}
