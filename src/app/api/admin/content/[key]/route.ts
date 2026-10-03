import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { guardAdmin } from "@/lib/admin-guard";
import { resetSection, saveSection } from "@/lib/content";
import { getEditor, sanitizeSection } from "@/lib/content-schema";

type Ctx = { params: Promise<{ key: string }> };

// Guardar una sección. El cuerpo es el contenido completo de esa sección.
export async function PUT(request: NextRequest, ctx: Ctx) {
  const denied = guardAdmin(request);
  if (denied) return denied;
  const { key } = await ctx.params;
  const def = getEditor(key);
  if (!def) return NextResponse.json({ error: "Sección desconocida." }, { status: 404 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "No se pudo leer lo enviado." }, { status: 400 });
  }
  const { value, errors } = sanitizeSection(def.key, body);
  if (errors.length) return NextResponse.json({ error: errors[0], errors }, { status: 400 });
  try {
    await saveSection(def.key, value);
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "No se pudo guardar." }, { status: 500 });
  }
  return NextResponse.json({ ok: true, value });
}

// Volver la sección a los textos originales del sitio.
export async function DELETE(request: NextRequest, ctx: Ctx) {
  const denied = guardAdmin(request);
  if (denied) return denied;
  const { key } = await ctx.params;
  const def = getEditor(key);
  if (!def) return NextResponse.json({ error: "Sección desconocida." }, { status: 404 });
  try {
    await resetSection(def.key);
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "No se pudo restaurar." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
