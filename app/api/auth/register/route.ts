import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create a new user
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role },
    });

    return NextResponse.json({ message: "User registered successfully", user });
  } catch  {
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
