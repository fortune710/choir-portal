import { getEventMembers } from "@/services/eventMemberService"
import { NextResponse } from "next/server"

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const members = await getEventMembers(id)
        return NextResponse.json(members)
    } catch (error) {
        console.error('Error fetching event members:', error)
        return NextResponse.json(
            { error: "Failed to fetch event members" },
            { status: 500 }
        )
    }
}