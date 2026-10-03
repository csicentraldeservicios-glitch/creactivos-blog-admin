import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, isValidSessionToken } from "./auth";

/**
 * Verifica la sesión del administrador y, en peticiones que modifican datos, que vengan de este mismo sitio.
 * Devuelve una respuesta de error, o null si todo está bien.
 */
export function guardAdmin(request: NextRequest): NextResponse | null {
  if (!isValidSessionToken(request.cookies.get(SESSION_COOKIE)?.value)) {
    return NextResponse.json({ error: "Tu sesión terminó. Vuelve a entrar." }, { status: 401 });
  }
  if (request.method !== "GET" && request.method !== "HEAD") {
    const origin = request.headers.get("origin");
    if (origin) {
      const allowed = [request.headers.get("host"), request.headers.get("x-forwarded-host")].filter(Boolean);
      let host = "";
      try {
        host = new URL(origin).host;
      } catch {
        /* origen inválido */
      }
      if (!allowed.includes(host)) {
        return NextResponse.json({ error: "Petición no permitida." }, { status: 403 });
      }
    }
  }
  return null;
}
