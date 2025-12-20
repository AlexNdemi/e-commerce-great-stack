<?php
// backend/services/RbacService.php
namespace backend\services;

use Yii;
use yii\base\Component;
use common\models\Users;

class RbacService extends Component
{
    private $rbacConfig;
    
    public function init()
    {
        parent::init();
        $this->rbacConfig = require Yii::getAlias('@backend/config/rbac.php');
    }
    
    /**
     * Check if user has permission (mirrors frontend hasPermission)
     */
    public function hasPermission(Users $user, string $permission): bool
    {
        return Yii::$app->user->can($permission);
    }
    
    /**
     * Get all permissions for a role
     */
    public function getRolePermissions(string $role): array
    {
        return $this->rbacConfig['roles'][$role] ?? [];
    }
    
    /**
     * Get all permissions for current user
     */
    public function getUserPermissions(?Users $user ): array
    {
        if (!$user) {
            $user = Yii::$app->user->identity;
        }
        
        if (!$user) {
            return [];
        }
        
        $auth = Yii::$app->authManager;
        return array_keys($auth->getPermissionsByUser($user->id));
    }
    
    /**
     * Check if user has any of the given permissions
     */
    public function hasAnyPermission(Users $user, array $permissions): bool
    {
        foreach ($permissions as $permission) {
            if ($this->hasPermission($user, $permission)) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * Check if user has all of the given permissions
     */
    public function hasAllPermissions(Users $user, array $permissions): bool
    {
        foreach ($permissions as $permission) {
            if (!$this->hasPermission($user, $permission)) {
                return false;
            }
        }
        return true;
    }
}