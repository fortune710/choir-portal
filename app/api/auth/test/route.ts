import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import prisma from "@/lib/prisma"; // Ensure this path is correct

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        // Hash the password before storing it
        const hashedPassword = await hash(password, 10);

        // Create user in database
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        return NextResponse.json({ message: "User registered successfully", user }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Registration failed", details: error }, { status: 500 });
    }
}
