import { getTeamById } from "@/services/teamsService"
import { NextResponse } from "next/server"

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const team = await getTeamById(id);
        return NextResponse.json(team)
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch team" },
            { status: 500 }
        )
    }
} 