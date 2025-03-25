import { getEventById } from "@/services/eventsService"
import { NextResponse } from "next/server"

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const event = await getEventById(id)
        return NextResponse.json(event)
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch event" + error },
            { status: 500 }
        )
    }
} 