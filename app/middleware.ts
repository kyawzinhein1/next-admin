import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken"
 
export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || "";

  const isLoginPage = req.nextUrl.pathname === "/auth/login";
  const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");

  // Redirect to dashboard if logged in and tries to access login page
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Redirect to login page if not logged in and tries to access dashboard
  if (!token && isDashboard) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

    try {
    jwt.verify(token, process.env.JWT_SECRET|| "");
    return NextResponse.next(); // Allow access
  } catch (err) {
    // Invalid token, redirect to login
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/login"],
};
