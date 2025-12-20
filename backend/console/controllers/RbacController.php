<?php
// backend/commands/RbacController.php
namespace console\controllers;

use Yii;
use yii\console\Controller;
use yii\helpers\ArrayHelper;

class RbacController extends Controller
{
    /**
     * Initialize RBAC matching frontend structure
     */
    public function actionInit()
    {
        $auth = Yii::$app->authManager;
        $rbacConfig = require __DIR__ . '/../../backend/config/rbac.php';
        
        $auth->removeAll();
        
        
        // ============ CREATE ALL PERMISSIONS ============
        $allPermissions = [];
        foreach ($rbacConfig['roles'] as $roleName => $permissions) {
            foreach ($permissions as $permissionName) {
                if (!isset($allPermissions[$permissionName])) {

                    $permission = $auth->createPermission($permissionName);

                    $permission->description = $this->getPermissionDescription($permissionName);

                    $auth->add($permission);

                    $allPermissions[$permissionName] = $permission;
                    echo "  Created permission: $permissionName\n";
                }
            }
        }
        
        // ============ CREATE ROLES WITH PERMISSIONS ============
        $roles = [];
        foreach ($rbacConfig['roles'] as $roleName => $permissions) {
            $role = $auth->createRole($roleName);
            $auth->add($role);
            $roles[$roleName] = $role;
            echo "\nCreated role: $roleName\n";
            
            // Assign permissions to role
            foreach ($permissions as $permissionName) {
                $auth->addChild($role, $allPermissions[$permissionName]);
            }
        }
        
        // ============ SET UP ROLE INHERITANCE ============
        foreach ($rbacConfig['inheritance'] as $parentRole => $childRoles) {
            if (isset($roles[$parentRole])) {
                foreach ($childRoles as $childRole) {
                    if (isset($roles[$childRole])) {
                        $auth->addChild($roles[$parentRole], $roles[$childRole]);
                        echo "\nSet inheritance: $parentRole inherits from $childRole\n";
                    }
                }
            }
        }
    }
    
    /**
     * Assign role to user
     */
    public function actionAssignRole($userId, $roleName)
    {
        $auth = Yii::$app->authManager;
        $role = $auth->getRole($roleName);
        
        if (!$role) {
            echo "Error: Role '$roleName' does not exist.\n";
            return;
        }
        
        // Remove any existing roles
        $auth->revokeAll($userId);
        
        // Assign new role
        $auth->assign($role, $userId);
        echo "Assigned role '$roleName' to user ID: $userId\n";
    }
    
    /**
     * List all permissions for a role
     */
    public function actionRolePermissions($roleName)
    {
        $auth = Yii::$app->authManager;
        $role = $auth->getRole($roleName);
        
        if (!$role) {
            echo "Role '$roleName' not found.\n";
            return;
        }
        
        $permissions = $auth->getPermissionsByRole($roleName);
        
        echo "Permissions for role '$roleName':\n";
        echo "================================\n";
        
        foreach ($permissions as $permission) {
            echo "- {$permission->name}";
            if ($permission->description) {
                echo " ({$permission->description})";
            }
            echo "\n";
        }
    }
    
    private function getPermissionDescription($permission)
    {
        $descriptions = [
            'view:orders' => 'View all orders',
            'delete:orders' => 'Delete any order',
            'create:products' => 'Create new products',
            'view:products' => 'View products',
            'update:products' => 'Update products',
            'delete:products' => 'Delete products',
            'view:users' => 'View users',
            'manage:users' => 'Manage users',
            'view:ownOrders' => 'View own orders',
            'delete:ownOrders' => 'Delete own orders',
            'update:ownOrders' => 'Update own orders',
            'create:orders' => 'Create orders',
        ];
        
        return $descriptions[$permission] ?? $permission;
    }
}