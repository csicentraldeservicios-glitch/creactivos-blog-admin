import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { guardAdmin } from "@/lib/admin-guard";
import { MAX_UPLOAD_BYTES, saveUpload } from "@/lib/uploads";

export async function POST(request: NextRequest) {
  const denied = guardAdmin(request);
  if (denied) return denied;
  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: "Elige una foto para subir." }, { status: 400 });
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json({ error: "La foto pesa más de 8 MB. Redúcela e inténtalo de nuevo." }, { status: 413 });
    }
    const url = await saveUpload(Buffer.from(await file.arrayBuffer()));
    return NextResponse.json({ ok: true, url });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "No se pudo subir la foto." }, { status: 400 });
  }
}
