import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { authUrl } from "@/lib/blogger";

export async function GET() {
  const state = crypto.randomBytes(16).toString("hex");
  const res = NextResponse.redirect(authUrl(state));
  res.cookies.set("blogger_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/blogger",
    maxAge: 600,
  });
  return res;
}
