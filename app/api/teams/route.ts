import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; 
import { getTeams } from "@/services/teamsService"



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

export async function GET() {
    try {
        const teams = await getTeams()
        return NextResponse.json(teams)
    } catch (error) {
        console.error('Error fetching teams:', error)
        return NextResponse.json(
            { error: "Failed to fetch teams" },
            { status: 500 }
        )
    }
}


