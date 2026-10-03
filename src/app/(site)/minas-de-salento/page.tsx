import type { Metadata } from "next";
import { A, BTN, Text } from "@/components/site/Bits";
import { Pic } from "@/components/site/Pic";
import { getSection } from "@/lib/content";
import { youtubeEmbedUrl } from "@/lib/content-utils";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getSection("minas");
  return { title: c.titulo, description: c.descripcion.slice(0, 160) };
}

export default async function MinasPage() {
  const c = await getSection("minas");
  const embed = c.video ? youtubeEmbedUrl(c.video) : null;
  const fotos = c.imagenes.filter((f) => f.imagen);
  return (
    <main className="mx-auto max-w-5xl space-y-8 px-4 py-10">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold">{c.titulo}</h1>
        {c.lema && <p className="text-xl font-semibold">{c.lema}</p>}
        <Text text={c.descripcion} className="max-w-3xl text-lg leading-relaxed" />
      </div>

      {embed && (
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
      )}
      {c.teaser && (
        <A href={c.teaser} className={BTN}>
          Ver el teaser
        </A>
      )}

      {fotos.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {fotos.map((f, i) => (
            <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-zinc-100">
              <Pic src={f.imagen} alt={f.texto} sizes="(min-width: 640px) 50vw, 100vw" />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
