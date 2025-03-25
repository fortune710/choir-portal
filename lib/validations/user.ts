import { z } from "zod"

export const userSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone_number: z.string().min(10, "Phone number must be at least 10 digits"),
    birthday: z.date().optional(),
    vocalCategory: z.string().optional(),
});