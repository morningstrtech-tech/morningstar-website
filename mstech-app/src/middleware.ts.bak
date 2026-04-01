import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin/dashboard routes
  if (pathname.startsWith("/admin/dashboard")) {
    const sessionCookie = request.cookies.get("better-auth.session-token") || request.cookies.get("__better-auth-session-token");

    if (!sessionCookie) {
      // No session cookie found, redirect to login
      const loginUrl = new URL("/admin", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
