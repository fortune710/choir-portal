import { getEventsWithoutMember } from "@/services/eventMemberService"
import { NextResponse } from "next/server"

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const events = await getEventsWithoutMember(id)
        return NextResponse.json(events)
    } catch {
        return NextResponse.json(
            { error: "Failed to fetch available events" },
            { status: 500 }
        )
    }
}