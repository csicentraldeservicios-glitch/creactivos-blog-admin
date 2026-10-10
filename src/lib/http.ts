import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Redirección a otra página del mismo sitio desde un manejador de ruta. Usa una dirección relativa para que
 * el navegador conserve el dominio y el https reales aunque el servidor esté detrás de un proxy (Railway).
 */
export function go(path: string, status: 303 | 307 = 303): NextResponse {
  return new NextResponse(null, { status, headers: { Location: path } });
}

/**
 * Redirección desde el proxy de Next, que exige una URL absoluta. Se arma con el dominio y el protocolo
 * públicos (los que reenvía Railway), no con los internos del contenedor.
 */
export function goFromProxy(request: NextRequest, path: string): NextResponse {
  const proto = request.headers.get("x-forwarded-proto")?.split(",")[0].trim() || request.nextUrl.protocol.replace(":", "");
  const host = request.headers.get("x-forwarded-host")?.split(",")[0].trim() || request.headers.get("host") || request.nextUrl.host;
  return NextResponse.redirect(new URL(path, `${proto}://${host}`), 307);
}
