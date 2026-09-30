import { PLAYLIST_ID, PLAYLIST_URL } from "@/lib/site";

export default function SazonPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-10">
      <h1 className="text-4xl font-bold text-[#E4162B]">Sazón y Fogón</h1>
      <div className="relative aspect-video overflow-hidden rounded-lg bg-zinc-900">
        <p className="absolute inset-0 grid place-items-center text-zinc-400">
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
        className="inline-block rounded bg-[#E4162B] px-5 py-2 font-semibold text-white"
      >
        Ver la lista completa en YouTube
      </a>
    </main>
  );
}
