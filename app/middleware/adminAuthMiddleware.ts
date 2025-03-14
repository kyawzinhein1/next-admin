import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export function adminAuthMiddleware(req: Request) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader && authHeader.split(" ")[1];

  console.log("adminAuthMiddleware called ✅");

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY!);
    return NextResponse.next();
  } catch (error) {
    console.error("Invalid Token:", error);
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}
