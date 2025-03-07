'use server'

import { revalidatePath } from "next/cache";
import { addRole, deleteRole as deleteRoleById, assignPermissionsToRole, assignRoleToUser } from "@/services/rolesService";

export async function createRole(formData: FormData) {
    try {
        const roleName = formData.get("name")?.toString() ?? "";
        const isAdmin = formData.get("is_admin") === "on";

        // Append "Admin" to role name if isAdmin is checked
        const finalRoleName = isAdmin ? `${roleName} (Admin)` : roleName;

        await addRole({
            name: finalRoleName,
        });

        revalidatePath('/roles');
        return { success: true };
    } catch (error) {
        console.error('Error creating role:', error);
        return { success: false, error: 'Failed to create role' };
    }
}

export async function assignRole(userId: string, roleId: string) {
    try {
        await assignRoleToUser(userId, roleId);
        revalidatePath('/roles');
        return { success: true };
    } catch (error) {
        console.error('Error assigning role:', error);
        return { success: false, error: 'Failed to assign role' };
    }
}

export async function deleteRole(roleId: string) {
    try {
        await deleteRoleById(roleId);
        revalidatePath('/roles');
        return { success: true };
    } catch (error) {
        console.error('Error deleting role:', error);
        return { success: false, error: 'Failed to delete role' };
    }
}

export async function updateRolePermissions(roleId: string, permissionIds: string[]) {
    try {
        await assignPermissionsToRole(roleId, permissionIds);
        revalidatePath('/roles');
        return { success: true };
    } catch (error) {
        console.error('Error updating role permissions:', error);
        return { success: false, error: 'Failed to update role permissions' };
    }
} 