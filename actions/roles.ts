'use server'

import { revalidatePath } from "next/cache";
import { addRole, assignRoleToUser } from "@/services/rolesService";

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