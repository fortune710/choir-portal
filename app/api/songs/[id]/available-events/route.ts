import { getEventsWithoutSong } from "@/services/eventsService"
import { NextResponse } from "next/server"

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const events = await getEventsWithoutSong(params.id)
        return NextResponse.json(events)
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch available events" },
            { status: 500 }
        )
    }
}