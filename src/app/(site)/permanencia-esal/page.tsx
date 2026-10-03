import type { Metadata } from "next";
import { A, Text } from "@/components/site/Bits";
import { getSection } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getSection("esal");
  return { title: c.titulo };
}

export default async function EsalPage() {
  const c = await getSection("esal");
  return (
    <main className="mx-auto max-w-5xl space-y-8 px-4 py-10">
      <h1 className="text-4xl font-bold">{c.titulo}</h1>
      <Text text={c.intro} className="max-w-3xl text-lg" />
      {c.anios.map((y, i) => (
        <section key={i} className="space-y-2">
          <h2 className="border-b-2 border-[#E4162B] pb-1 text-2xl font-bold">{y.anio}</h2>
          <ul className="space-y-1">
            {y.documentos.map((d, j) => (
              <li key={j}>
                {d.url ? (
                  <A href={d.url} className="underline">
                    {d.titulo}
                  </A>
                ) : (
                  d.titulo
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
