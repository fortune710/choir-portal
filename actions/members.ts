//TODO: Members functions
'use server'

import { addUser } from "@/services/usersService";
import { revalidatePath } from "next/cache";

export async function createUser(formData: FormData) {
    const memberName = formData.get("name")?.toString() ?? "";
    const memberEmail = formData.get("email")?.toString() ?? "";
    const memberPhone = formData.get("phone_number")?.toString() ?? "";

    await addUser({
        name: memberName,
        email: memberEmail,
        phone_number: memberPhone,
    })

    //Refetch members
    revalidatePath('/members')
}
