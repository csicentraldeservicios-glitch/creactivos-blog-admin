import { CONTENT_TYPES, readUpload } from "@/lib/uploads";

// Sirve las fotos subidas desde el panel (públicas, como las del sitio).
export async function GET(_request: Request, ctx: { params: Promise<{ name: string }> }) {
  const { name } = await ctx.params;
  const data = await readUpload(name);
  if (!data) return new Response("No encontrada", { status: 404 });
  const ext = name.split(".").pop() ?? "";
  return new Response(new Uint8Array(data), {
    headers: {
      "Content-Type": CONTENT_TYPES[ext] ?? "application/octet-stream",
      // El nombre es aleatorio y único: la foto nunca cambia bajo la misma dirección.
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
