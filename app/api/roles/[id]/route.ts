import { getRolePermissions } from "@/services/rolesService"
import { NextResponse } from "next/server"

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const permissions = await getRolePermissions(id)
        return NextResponse.json(permissions)
    } catch (error) {
        console.error('Error fetching role permissions:', error)
        return NextResponse.json(
            { error: "Failed to fetch role permissions" },
            { status: 500 }
        )
    }
} 