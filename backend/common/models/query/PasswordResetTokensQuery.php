<?php

namespace common\models\query;

/**
 * This is the ActiveQuery class for [[\common\models\PasswordResetTokens]].
 *
 * @see \common\models\PasswordResetTokens
 */
class PasswordResetTokensQuery extends \yii\db\ActiveQuery
{
    /*public function active()
    {
        return $this->andWhere('[[status]]=1');
    }*/

    /**
     * {@inheritdoc}
     * @return \common\models\PasswordResetTokens[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * {@inheritdoc}
     * @return \common\models\PasswordResetTokens|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }
}
