//TODO: Members functions
'use server'

import prisma from "@/lib/prisma";
import { userSchema } from "@/lib/validations/user";
import { addUser, deleteUser, updateUser } from "@/services/usersService";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { hashSync } from "bcryptjs";

export async function register(email: string, password: string) {
    const hashedPassword = hashSync(password);

    try {
        await prisma.user.update({
            where: { email },
            data: {
                email,
                password: hashedPassword
            }
        })

        return {
            success: true
        }
    } catch {
        return {
            success: false
        }
    }
    
}
  

export async function createUser(formData: FormData) {
    const memberName = formData.get("name")?.toString() ?? "";
    const memberEmail = formData.get("email")?.toString() ?? "";
    const memberPhone = formData.get("phone_number")?.toString() ?? "";
    const memberBirthday = formData.get("birthday")?.toString() ?? "";
    const memberVocalCategory = formData.get("vocal_category")?.toString() ?? "";
    
    await addUser({
        name: memberName,
        email: memberEmail,
        phone_number: memberPhone,
        birthday: new Date(memberBirthday),
        vocalCategory: memberVocalCategory
    })

    //Refetch members
    revalidatePath('/members')
}

export async function editUser(userId: string, formData: FormData) {
    try {
        const data = {
            name: formData.get("name")?.toString(),
            email: formData.get("email")?.toString(),
            phone_number: formData.get("phone_number")?.toString(),
            birthday: formData.get("birthday")?.toString(),
            vocalCategory: formData.get("vocal_category")?.toString(),
        };

        const validatedData = userSchema.parse({
            ...data,
            birthday: data.birthday ? new Date(data.birthday) : undefined,
        });

        await updateUser(userId, validatedData);
        revalidatePath('/members');
        return { success: true };
    } catch (error) {
        console.error('Error updating user:', error);
        if (error instanceof ZodError) {
            const validationError = fromZodError(error);
            return { success: false, error: validationError.message };
        }
        return { success: false, error: 'Failed to update user' };
    }
}

export async function deactivateMember(userId: string) {
    try {
        await updateUser(userId, { isActive: false });
        revalidatePath('/members');
        return { success: true };
    } catch (error) {
        console.error('Error deactivating user:', error);
        return { success: false, error: 'Failed to deactivate user' };
    }
}

export async function activateMember(userId: string) {
    try {
        await updateUser(userId, { isActive: true });
        revalidatePath('/members');
        return { success: true };
    } catch (error) {
        console.error('Error deactivating user:', error);
        return { success: false, error: 'Failed to deactivate user' };
    }
}

export async function deleteMember(userId: string) {
    try {
        await deleteUser(userId);
        revalidatePath('/members');
        return { success: true };
    } catch (error) {
        console.error('Error deleting user:', error);
        return { success: false, error: 'Failed to delete user' };
    }
}