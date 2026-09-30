import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkAdminPassword, createSessionToken, SESSION_COOKIE } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const password = String(form.get("password") ?? "");
  if (!password || !checkAdminPassword(password)) {
    return NextResponse.redirect(new URL("/login?error=1", request.url), { status: 303 });
  }
  const res = NextResponse.redirect(new URL("/", request.url), { status: 303 });
  res.cookies.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
