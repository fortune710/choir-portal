import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, role } = await req.json();

    // Check if the role exists
    const existingRole = await prisma.role.findUnique({ where: { name: role } });
    if (!existingRole) {
      return NextResponse.json({ error: "Role does not exist" }, { status: 400 });
    }

    // Assign role to user
    await prisma.userRole.create({
      data: {
        userId,
        roleId: existingRole.id,
      },
    });

    return NextResponse.json({ message: "Role assigned successfully" });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
