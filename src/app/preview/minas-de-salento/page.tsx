import Image from "next/image";
import { MINAS } from "@/lib/blog-content";

export default function MinasPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-8 px-4 py-10">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold text-black">Minas de Salento</h1>
        <p className="text-xl font-semibold">{MINAS.lema}</p>
        <p className="max-w-3xl text-lg leading-relaxed">{MINAS.descripcion}</p>
      </div>

      <div className="relative aspect-video overflow-hidden rounded-lg bg-zinc-100">
        <iframe
          src={`https://www.youtube.com/embed/${MINAS.videoId}`}
          title="Minas de Salento"
          className="absolute inset-0 h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
      <a
        href={MINAS.teaserUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-block rounded bg-[#E4162B] px-5 py-2 font-semibold text-black"
      >
        Ver el teaser
      </a>

      <div className="grid gap-4 sm:grid-cols-2">
        {MINAS.imagenes.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={i === 0 ? "Afiche de Minas de Salento" : `Fotografía ${i} de Minas de Salento`}
            width={800}
            height={600}
            className="h-auto w-full rounded-lg object-cover"
          />
        ))}
      </div>
    </main>
  );
}
