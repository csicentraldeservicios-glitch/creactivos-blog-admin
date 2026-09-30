import { CREA_CINE } from "@/lib/blog-content";

export default function CreaCineInfantilPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-10">
      <p className="text-sm font-semibold uppercase tracking-wide">CreA Cine Infantil</p>
      <h1 className="text-4xl font-bold text-black">{CREA_CINE.titulo}</h1>
      <p className="max-w-3xl text-lg leading-relaxed">{CREA_CINE.intro}</p>

      <dl className="grid gap-x-6 gap-y-3 rounded-lg border border-zinc-200 p-5 sm:grid-cols-[140px_1fr]">
        {CREA_CINE.datos.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="font-bold">{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>

      <section className="space-y-2">
        <h2 className="text-2xl font-bold">Con el apoyo de</h2>
        <ul className="list-disc space-y-1 pl-6">
          {CREA_CINE.apoyan.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
