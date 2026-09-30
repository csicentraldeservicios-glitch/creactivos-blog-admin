import { ESAL } from "@/lib/blog-content";

export default function EsalPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-8 px-4 py-10">
      <h1 className="text-4xl font-bold text-black">Permanencia Esal</h1>
      <p className="max-w-3xl text-lg">
        Documentos de la Asociación CreActivos Audiovisual (NIT 900411102-1), organizados por año.
      </p>
      {ESAL.map((y) => (
        <section key={y.anio} className="space-y-2">
          <h2 className="border-b-2 border-[#E4162B] pb-1 text-2xl font-bold">{y.anio}</h2>
          <ul className="space-y-1">
            {y.docs.map((d) => (
              <li key={d.url + d.titulo}>
                <a href={d.url} target="_blank" rel="noreferrer" className="underline">
                  {d.titulo}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
