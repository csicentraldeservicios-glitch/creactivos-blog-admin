import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { go } from "@/lib/http";
import { authUrl } from "@/lib/blogger";

export async function GET() {
  const state = crypto.randomBytes(16).toString("hex");
  let url: string;
  try {
    url = authUrl(state);
  } catch {
    // Faltan GOOGLE_CLIENT_ID / APP_URL en las variables del servidor.
    return go("/connect?error=config");
  }
  const res = NextResponse.redirect(url);
  res.cookies.set("blogger_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/blogger",
    maxAge: 600,
  });
  return res;
}
