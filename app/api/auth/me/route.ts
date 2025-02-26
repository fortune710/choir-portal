import { verifyToken } from "../../../../lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface DecodedToken {
  userId: string;
}

export async function GET(req: Request) {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Extract and verify token
    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token) as DecodedToken;
    if (!decoded?.userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Fetch user data
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch user", details: String(error) }, { status: 500 });
  }
}
