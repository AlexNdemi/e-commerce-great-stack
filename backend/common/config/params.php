<?php
return [
    'adminEmail' => 'admin@example.com',
    'supportEmail' => 'support@example.com',
    'senderEmail' => 'noreply@example.com',
    'senderName' => 'Example.com mailer',
    'user.passwordResetTokenExpire' => 3600,
    'user.passwordMinLength' => 8,
    
    // JWT Configuration
    'jwtSecret' => getenv('JWT_SECRET'),
    'jwtAccessExpire' => getenv('JWT_ACCESS_EXPIRE') ?: 3600, // 1 hour default
    'jwtRefreshExpire' => getenv('JWT_REFRESH_EXPIRE') ?: 2592000, // 30 days default
    
    'cookieValidationKey' => getenv('COOKIE_VALIDATION_KEY'),
];