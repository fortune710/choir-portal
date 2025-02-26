import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  // Redirect to login if the user is not authenticated
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Ensure roles exist as an array
  const userRoles = (token.roles as string[]) || [];

  const pathname = req.nextUrl.pathname;

  // Restrict admin pages
  if (pathname.startsWith("/admin") && !userRoles.includes("Admin")) {
    return NextResponse.redirect(new URL("/403", req.url)); // Forbidden page
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // ✅ Protect all admin routes
};
