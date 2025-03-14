import { adminAuthMiddleware } from "./middleware/adminAuthMiddleware";

export function middleware(req: Request) {
  console.log("Global Middleware Running ✅");

  return adminAuthMiddleware(req);
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
