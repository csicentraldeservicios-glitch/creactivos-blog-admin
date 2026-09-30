import Image from "next/image";
import { PLAYLIST_ID, PLAYLIST_URL, SAZON } from "@/lib/site";

const FOTOS = [
  { src: "/img/sazon-cocinera.jpg", alt: "Cocinera con pañoleta rosada sostiene una bandeja de masa en bolitas", position: "object-[50%_25%]" },
  { src: "/img/sazon-empanadas.jpg", alt: "Empanadas fritas alrededor de un pocillo de barro con ají verde", position: "object-center" },
  { src: "/img/sazon-abuela.jpg", alt: "Cocinera mayor con gafas sostiene una cuchara de palo en su cocina", position: "object-[30%_30%]" },
];

export default function SazonPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-8 px-4 py-10">
      <div className="grid items-center gap-6 md:grid-cols-[220px_1fr]">
        <Image src="/img/sazon-logo.jpg" alt="Sazón y Fogón" width={471} height={384} className="h-auto w-full rounded-lg" priority />
        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-black">Sazón y Fogón</h1>
          <p className="text-lg">{SAZON.descripcion}</p>
          <p><b>Impacto:</b> {SAZON.impacto}</p>
        </div>
      </div>

      <div className="relative aspect-video overflow-hidden rounded-lg bg-zinc-100">
        <p className="absolute inset-0 grid place-items-center text-black">
          Cargando lista de reproducción…
        </p>
        <iframe
          src={`https://www.youtube.com/embed/videoseries?list=${PLAYLIST_ID}`}
          title="Sazón y Fogón"
          className="absolute inset-0 h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
      <a
        href={PLAYLIST_URL}
        target="_blank"
        rel="noreferrer"
        className="inline-block rounded bg-[#E4162B] px-5 py-2 font-semibold text-black"
      >
        Ver la lista completa en YouTube
      </a>

      <section className="space-y-4 pt-4">
        <h2 className="text-3xl font-bold text-black">Cocina tradicional</h2>
        <div className="grid gap-2 sm:grid-cols-3">
          {FOTOS.map((f) => (
            <div key={f.src} className="relative h-72 overflow-hidden rounded-lg bg-zinc-100">
              <Image src={f.src} alt={f.alt} fill sizes="(min-width: 640px) 33vw, 100vw" className={`object-cover ${f.position}`} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
