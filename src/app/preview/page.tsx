const NEWS = [
  { title: "Título de noticia (ejemplo)", date: "Fecha por definir" },
  { title: "Título de noticia (ejemplo)", date: "Fecha por definir" },
  { title: "Título de noticia (ejemplo)", date: "Fecha por definir" },
];

export default function CreactivosPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-16 px-4 py-10">
      <section id="quienes-somos" className="scroll-mt-6 space-y-3">
        <h2 className="text-3xl font-bold text-[#E4162B]">Quiénes somos</h2>
        <p className="max-w-3xl text-lg leading-relaxed">
          Creactivos es una propuesta audiovisual de cine y formación ambiental.
          <span className="ml-2 rounded bg-amber-100 px-1.5 py-0.5 text-xs text-amber-900">
            texto de ejemplo
          </span>
        </p>
      </section>

      <section id="noticias" className="scroll-mt-6 space-y-4">
        <h2 className="text-3xl font-bold text-[#E4162B]">Noticias</h2>
        <ul className="grid gap-4 sm:grid-cols-3">
          {NEWS.map((n, i) => (
            <li key={i} className="rounded-lg border border-zinc-200 p-4 shadow-sm">
              <p className="text-xs text-zinc-500">{n.date}</p>
              <p className="mt-1 font-semibold">{n.title}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="contacto" className="scroll-mt-6 space-y-3">
        <h2 className="text-3xl font-bold text-[#E4162B]">Contacto</h2>
        <ul className="space-y-1 text-lg">
          <li>Correo: <span className="text-zinc-500">por definir</span></li>
          <li>Teléfono / WhatsApp: <span className="text-zinc-500">por definir</span></li>
          <li>Ciudad: <span className="text-zinc-500">por definir</span></li>
        </ul>
      </section>
    </main>
  );
}
