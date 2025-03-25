import { getEventsWithoutSong } from "@/services/eventsService"
import { NextResponse } from "next/server"

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const events = await getEventsWithoutSong(id);
        return NextResponse.json(events)
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch available events" },
            { status: 500 }
        )
    }
}