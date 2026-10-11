import { go } from "@/lib/http";
import type { NextRequest } from "next/server";
import { checkAdminPassword, createSessionToken, SESSION_COOKIE } from "@/lib/auth";
import { clearFailures, clientIp, isBlocked, recordFailure } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const ip = clientIp(request.headers);
  if (isBlocked(ip)) {
    return go("/login?error=wait");
  }
  const form = await request.formData();
  const password = String(form.get("password") ?? "");
  let ok = false;
  try {
    ok = !!password && checkAdminPassword(password);
  } catch {
    // Faltan ADMIN_PASSWORD o ADMIN_SESSION_SECRET en el servidor.
    return go("/login?error=config");
  }
  if (!ok) {
    recordFailure(ip);
    return go("/login?error=1");
  }
  clearFailures(ip);
  const res = go("/admin");
  res.cookies.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
