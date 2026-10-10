import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, isValidSessionToken } from "@/lib/auth";
import { goFromProxy } from "@/lib/http";

// El sitio público no necesita sesión. Solo el panel, la administración de Blogger y sus APIs.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!isValidSessionToken(request.cookies.get(SESSION_COOKIE)?.value)) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    return goFromProxy(request, "/login");
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/blogger/:path*",
    "/connect/:path*",
    "/posts/:path*",
    "/api/admin/:path*",
    "/api/posts/:path*",
    "/api/blogger/:path*",
  ],
};
