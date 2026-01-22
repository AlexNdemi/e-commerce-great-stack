<?php

use yii\db\Migration;

/**
 * Handles adding columns to table `{{%users}}`.
 */
class m260113_120343_add_activation_hash_column_to_users_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('{{%users}}','activation_hash',$this->string(64)->unique());
        $this->createIndex(
            'idx-users-activation_hash',
            '{{%users}}',
            'activation_hash',
            true 
        );
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropIndex('idx-users-activation_hash', '{{%users}}');
        $this->dropColumn('{{%users}}', 'activation_hash');
    }
}
