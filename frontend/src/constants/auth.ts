type Role = keyof typeof ROLES;
type Permission = (typeof ROLES)[Role][number];

const ROLES ={
  admin:["view:orders","delete:orders","create:products","view:products","update:products","delete:products"],
  user:["view:ownOrders","delete:ownOrders","update:ownOrders","create:orders"]
} as const;

export function hasPerrmission(
  user:{id:string;role:Role},
  permission:Permission
){
  return (ROLES[user.role] as readonly Permission[]).includes(permission)
}