import prisma from "@/lib/prisma";
import { compare } from "bcryptjs";
import { generateToken } from "@/lib/auth";
// import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

// const SECRET = "your_jwt_secret"; 


export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Check password
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Generate JWT token
    const token = generateToken(user.id);

    return NextResponse.json({ success: true, token });
  } catch (error) {
    return NextResponse.json({ error: "Login failed", details: error}, { status: 500 });
  }
}
