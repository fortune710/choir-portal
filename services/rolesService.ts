import prisma from "@/lib/prisma";

/*
  Get all roles with user count
 */
export async function getRoles() {
  return await prisma.role.findMany({
    include: {
      _count: {
        select: { 
          users: true,
          permissions: true 
        }
      }
    },
    orderBy: {
        createdAt: 'desc'
    }
  });
}

/*
  Add a new role
 */
export async function addRole(data: { name: string }) {
  return await prisma.role.create({ data });
}

/*
  Get a single role by ID with its users
 */
export async function getRoleById(id: string) {
  return await prisma.role.findUnique({
    where: { id },
    include: {
      users: {
        include: {
          user: true
        }
      }
    }
  });
}

/*
  Update an existing role
 */
export async function updateRole(id: string, data: { name: string }) {
  return await prisma.role.update({ where: { id }, data });
}

/*
  Delete a role by ID
 */
export async function deleteRole(id: string) {
  return await prisma.role.delete({ where: { id } });
}

/*
  Assign role to user
 */
export async function assignRoleToUser(userId: string, roleId: string) {
  return await prisma.userRole.create({
    data: {
      userId,
      roleId,
    }
  });
}

/*
  Remove role from user
 */
export async function removeRoleFromUser(userId: string, roleId: string) {
  return await prisma.userRole.deleteMany({
    where: {
      userId,
      roleId,
    }
  });
}

/*
  Assign permissions to a role
 */
export async function assignPermissionsToRole(roleId: string, permissionIds: string[]) {
  // First, remove all existing permissions
  await prisma.rolePermission.deleteMany({
    where: { roleId }
  });

  // Then, create new permission assignments
  const permissionData = permissionIds.map(permissionId => ({
    roleId,
    permissionId
  }));

  return await prisma.rolePermission.createMany({
    data: permissionData
  });
}

/*
  Get role permissions
 */
export async function getRolePermissions(roleId: string) {
  const permissions = await prisma.rolePermission.findMany({
    where: { roleId },
    select: { permissionId: true }
  });

  return permissions.map(p => p.permissionId);
} 