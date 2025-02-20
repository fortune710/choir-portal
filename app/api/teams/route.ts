import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; 



//  (Create a new team)
export async function POST(req: Request) {
  try {
    const { name, description } = await req.json(); // Parse request body
    const newTeam = await prisma.team.create({
      data: { name, description },
    });

    return NextResponse.json({ success: true, data: newTeam }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
