import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { exchangeCode } from "@/lib/blogger";

// Muestra el refresh token una sola vez para copiarlo a BLOGGER_REFRESH_TOKEN.
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const state = searchParams.get("state");
  const code = searchParams.get("code");
  const expected = request.cookies.get("blogger_oauth_state")?.value;

  if (!code || !state || state !== expected) {
    return NextResponse.redirect(new URL("/connect?error=1", request.url));
  }
  try {
    const tokens = await exchangeCode(code);
    if (!tokens.refresh_token) {
      return NextResponse.redirect(new URL("/connect?error=norefresh", request.url));
    }
    const res = new NextResponse(
      `<!doctype html><meta charset="utf-8"><title>Blogger conectado</title>
<body style="font-family:system-ui;max-width:640px;margin:3rem auto;padding:0 1rem">
<h1>Blogger conectado</h1>
<p>Copia este valor en tu <code>.env</code> (o en las variables del hosting) y reinicia la app. No lo compartas.</p>
<pre style="white-space:pre-wrap;word-break:break-all;background:#f4f4f5;padding:1rem;border-radius:8px">BLOGGER_REFRESH_TOKEN=${tokens.refresh_token}</pre>
<p><a href="/">Ir al panel</a></p></body>`,
      { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } },
    );
    res.cookies.delete("blogger_oauth_state");
    return res;
  } catch {
    return NextResponse.redirect(new URL("/connect?error=exchange", request.url));
  }
}
