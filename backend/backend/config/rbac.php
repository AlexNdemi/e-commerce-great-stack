<?php
// backend/config/rbac.php
return [
    'roles' => [
        'admin' => [
            'view:orders',
            'delete:orders',
            'create:products',
            'view:products',
            'update:products',
            'delete:products',
            'view:users',
            'manage:users',
        ],
        'customer' => [
            'view:ownOrders',
            'delete:ownOrders',
            'update:ownOrders',
            'create:orders',
            'view:products',
        ],
    ],
    
    'inheritance' => [
      //  'admin' => ['customer'],
    ],
];