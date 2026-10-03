import { NextResponse } from "next/server";

/**
 * Redirección a otra página del mismo sitio. Usa una dirección relativa para que el navegador
 * conserve el dominio y el https reales aunque el servidor esté detrás de un proxy (Railway).
 */
export function go(path: string, status: 303 | 307 = 303): NextResponse {
  return new NextResponse(null, { status, headers: { Location: path } });
}
