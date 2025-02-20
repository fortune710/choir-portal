import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; 



export async function POST(req: Request) {
  try {
    const { title, artist } = await req.json(); // Parse request body
    const newSong = await prisma.song.create({ data: { title, artist } });

    return NextResponse.json({ success: true, data: newSong }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
