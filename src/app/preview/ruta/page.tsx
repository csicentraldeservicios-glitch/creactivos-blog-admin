import { RUTA } from "@/lib/blog-content";

export default function RutaPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-10 px-4 py-10">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide">Ruta</p>
        <h1 className="text-4xl font-bold text-black">{RUTA.titulo}</h1>
        <p className="max-w-3xl text-lg leading-relaxed">{RUTA.intro}</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold">Festivales, muestras y talleres</h2>
        <ul className="list-disc space-y-1 pl-6">
          {RUTA.festivales.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-2 rounded-lg border-l-4 border-[#E4162B] bg-zinc-50 p-4">
        <h2 className="text-xl font-bold">Reconocimiento</h2>
        <p>{RUTA.reconocimiento}</p>
        <p>{RUTA.nota}</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold">Producciones documentales</h2>
        <ul className="space-y-1">
          {RUTA.documentales.map((d) => (
            <li key={d.url}>
              <a href={d.url} target="_blank" rel="noreferrer" className="font-semibold underline">
                {d.titulo}
              </a>{" "}
              · dirección de {d.director}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold">Videos</h2>
        <ul className="space-y-1">
          {RUTA.videos.map((v) => (
            <li key={v.url}>
              <a href={v.url} target="_blank" rel="noreferrer" className="font-semibold underline">
                {v.titulo}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
