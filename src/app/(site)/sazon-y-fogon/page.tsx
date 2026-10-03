import type { Metadata } from "next";
import { A, BTN, Text } from "@/components/site/Bits";
import { Pic } from "@/components/site/Pic";
import { getSection } from "@/lib/content";
import { youtubeEmbedUrl, youtubePlaylistId } from "@/lib/content-utils";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getSection("sazon");
  return { title: c.titulo, description: c.descripcion.slice(0, 160) };
}

export default async function SazonPage() {
  const c = await getSection("sazon");
  const embed = c.lista ? youtubeEmbedUrl(c.lista) : null;
  const list = youtubePlaylistId(c.lista);
  const fotos = c.fotos.filter((f) => f.imagen);
  return (
    <main className="mx-auto max-w-5xl space-y-8 px-4 py-10">
      <div className={`grid items-center gap-6 ${c.logo ? "md:grid-cols-[220px_1fr]" : ""}`}>
        {c.logo && (
          <div className="relative aspect-[471/384] overflow-hidden rounded-lg bg-zinc-100">
            <Pic src={c.logo} alt={c.titulo} priority sizes="220px" />
          </div>
        )}
        <div className="space-y-3">
          <h1 className="text-4xl font-bold">{c.titulo}</h1>
          <Text text={c.descripcion} className="text-lg" />
          {c.impacto && (
            <p>
              <b>Impacto:</b> {c.impacto}
            </p>
          )}
        </div>
      </div>

      {embed && (
        <>
          <div className="relative aspect-video overflow-hidden rounded-lg bg-zinc-100">
            <iframe
              src={embed}
              title={c.titulo}
              className="absolute inset-0 h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
          {list && (
            <A href={`https://www.youtube.com/playlist?list=${list}`} className={BTN}>
              Ver la lista completa en YouTube
            </A>
          )}
        </>
      )}

      {fotos.length > 0 && (
        <section className="space-y-4 pt-4">
          {c.fotosTitulo && <h2 className="text-3xl font-bold">{c.fotosTitulo}</h2>}
          <div className="grid gap-2 sm:grid-cols-3">
            {fotos.map((f, i) => (
              <div key={i} className="relative h-72 overflow-hidden rounded-lg bg-zinc-100">
                <Pic src={f.imagen} alt={f.texto} sizes="(min-width: 640px) 33vw, 100vw" />
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
