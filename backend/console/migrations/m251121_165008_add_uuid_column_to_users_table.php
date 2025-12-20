<?php

use yii\db\Migration;

/**
 * Handles adding columns to table `{{%users}}`.
 */
class m251121_165008_add_uuid_column_to_users_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('{{%users}}','uuid',$this->string(36)->unique()->notNull());
        
        $this->createIndex('idx-users-uuid', '{{%users}}', 'uuid');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('{{%users}}','uuid');
    }

    



}
