import type { Metadata } from "next";
import { A, Text } from "@/components/site/Bits";
import { getSection } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getSection("ruta");
  return { title: "Ruta", description: c.intro.slice(0, 160) };
}

export default async function RutaPage() {
  const c = await getSection("ruta");
  return (
    <main className="mx-auto max-w-5xl space-y-10 px-4 py-10">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide">Ruta</p>
        <h1 className="text-4xl font-bold">{c.titulo}</h1>
        <Text text={c.intro} className="max-w-3xl text-lg leading-relaxed" />
      </div>

      {c.festivales.length > 0 && (
        <section className="space-y-3">
          {c.festivalesTitulo && <h2 className="text-2xl font-bold">{c.festivalesTitulo}</h2>}
          <ul className="list-disc space-y-1 pl-6">
            {c.festivales.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </section>
      )}

      {(c.reconocimiento || c.nota) && (
        <section className="space-y-2 rounded-lg border-l-4 border-[#E4162B] bg-zinc-50 p-4">
          {c.reconocimiento && (
            <>
              <h2 className="text-xl font-bold">Reconocimiento</h2>
              <Text text={c.reconocimiento} />
            </>
          )}
          <Text text={c.nota} />
        </section>
      )}

      {c.documentales.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Producciones documentales</h2>
          <ul className="space-y-1">
            {c.documentales.map((d, i) => (
              <li key={i}>
                {d.url ? (
                  <A href={d.url} className="font-semibold underline">
                    {d.titulo}
                  </A>
                ) : (
                  <b>{d.titulo}</b>
                )}
                {d.director && <> · dirección de {d.director}</>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {c.videos.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Videos</h2>
          <ul className="space-y-1">
            {c.videos.map((v, i) => (
              <li key={i}>
                {v.url ? (
                  <A href={v.url} className="font-semibold underline">
                    {v.titulo}
                  </A>
                ) : (
                  <b>{v.titulo}</b>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
