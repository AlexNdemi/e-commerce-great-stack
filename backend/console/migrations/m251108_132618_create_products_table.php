<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%products}}`.
 */
class m251108_132618_create_products_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%products}}', [
            'id' => $this->primaryKey(),
            'name' => $this->string()->notNull(),
            'price' => $this->decimal(10,2)->notNull(),
            'description' => $this->text(),
            'category'=> $this->string(100),
            'subcategory'=> $this->string(100),
            'image_url'=>$this->string(255),
            'is_bestseller'=>$this->boolean()
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%products}}');
    }
}
