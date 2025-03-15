import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || "";
  const isLoginPage = req.nextUrl.pathname === "/auth/login";
  const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");

  try {
    if (token) {
      await jwtVerify(token, secretKey);

      if (isLoginPage) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      return NextResponse.next(); // Allow access to dashboard
      
    } else {
      if (isLoginPage) {
        return NextResponse.next();
      }

      // ❌ Redirect to login page when trying to access the dashboard
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  } catch (err) {
    console.error("Invalid Token:", err);

    // ❌ Clear invalid token and redirect to login
    const response = NextResponse.redirect(new URL("/auth/login", req.url));
    response.cookies.set("token", "", { maxAge: 0 });
    return response;
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/login"],
};
