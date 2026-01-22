<?php

use yii\db\Migration;

/**
 * Handles adding columns to table `{{%products}}`.
 */
class m260116_090459_add_updated_at_column_to_products_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('{{%products}}','updated_at',$this->integer()->notNull());
        $this->createIndex(
            'idx-products-updated_at',
            '{{%products}}',
            'updated_at',
        );
        
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropIndex('idx-products-updated_at', '{{%products}}');
        $this->dropColumn('{{products}}', 'updated_at');
    }
}
