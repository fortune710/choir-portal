import { getUsers } from "@/services/usersService"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const members = await getUsers()
        return NextResponse.json(members)
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch members" },
            { status: 500 }
        )
    }
}