import { getEventSongs } from "@/services/eventsService"
import { NextResponse } from "next/server"

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const songs = await getEventSongs(id)
        return NextResponse.json(songs)
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch event songs: " + error },
            { status: 500 }
        )
    }
}