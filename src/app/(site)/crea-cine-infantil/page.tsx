import type { Metadata } from "next";
import { Text } from "@/components/site/Bits";
import { getSection } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getSection("crea");
  return { title: "CreA Cine Infantil", description: c.intro.slice(0, 160) };
}

export default async function CreaPage() {
  const c = await getSection("crea");
  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-10">
      <p className="text-sm font-semibold uppercase tracking-wide">CreA Cine Infantil</p>
      <h1 className="text-4xl font-bold">{c.titulo}</h1>
      <Text text={c.intro} className="max-w-3xl text-lg leading-relaxed" />

      {c.datos.length > 0 && (
        <dl className="grid gap-x-6 gap-y-3 rounded-lg border border-zinc-200 p-5 sm:grid-cols-[140px_1fr]">
          {c.datos.map((d, i) => (
            <div key={i} className="contents">
              <dt className="font-bold">{d.etiqueta}</dt>
              <dd>{d.valor}</dd>
            </div>
          ))}
        </dl>
      )}

      {c.apoyan.length > 0 && (
        <section className="space-y-2">
          {c.apoyanTitulo && <h2 className="text-2xl font-bold">{c.apoyanTitulo}</h2>}
          <ul className="list-disc space-y-1 pl-6">
            {c.apoyan.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
