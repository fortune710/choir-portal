//TODO: Members functions
'use server'

import { addUser } from "@/services/usersService";
import { revalidatePath } from "next/cache";

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