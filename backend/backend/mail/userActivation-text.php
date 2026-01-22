<?php
/** @var common\models\Users $user */
/** @var string $activationUrl */
?>
Hello <?= $user->firstname ?>,

Thank you for joining <?= Yii::$app->name ?>.

To activate your account, please copy and paste the following link into your web browser:

<?= $activationUrl ?>

If you did not create an account, please ignore this email.

Best regards,
The <?= Yii::$app->name ?> Team