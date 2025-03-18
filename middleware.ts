import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET!);

const PUBLIC_ROUTES = ["/auth/login", "/auth/register"];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || "";

  const { pathname } = req.nextUrl;

  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  try {
    if (token) {
      await jwtVerify(token, secretKey);

      if (pathname.startsWith("/auth/login")) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  } catch (err) {
    console.error("Invalid Token:", err);

    const response = NextResponse.redirect(new URL("/auth/login", req.url));
    response.cookies.set("token", "", { maxAge: 0 });
    return response;
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/login"],
};
