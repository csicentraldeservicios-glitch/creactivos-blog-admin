import Image from "next/image";
import { EJES, MISION, PROPOSITO, SERVICIOS, VALORES } from "@/lib/site";

const NEWS = [
  { title: "Título de noticia (ejemplo)", date: "Fecha por definir" },
  { title: "Título de noticia (ejemplo)", date: "Fecha por definir" },
  { title: "Título de noticia (ejemplo)", date: "Fecha por definir" },
];

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-3xl font-bold text-[#E4162B]">{children}</h2>;
}

export default function CreactivosPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-16 px-4 py-10">
      <section id="quienes-somos" className="scroll-mt-6 space-y-10">
        <div className="space-y-4">
          <H2>Quiénes somos</H2>
          <ul className="flex flex-wrap gap-2">
            {EJES.map((e) => (
              <li key={e} className="rounded-full bg-black px-4 py-1 text-sm font-semibold text-white">
                {e}
              </li>
            ))}
          </ul>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-1 text-xl font-bold">Nuestro propósito</h3>
              <p className="leading-relaxed">{PROPOSITO}</p>
            </div>
            <div>
              <h3 className="mb-1 text-xl font-bold">Nuestra misión</h3>
              <p className="leading-relaxed">{MISION}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {VALORES.map((v) => (
            <div key={v.titulo} className="rounded-lg border-l-4 border-[#E4162B] bg-zinc-50 p-4">
              <h3 className="font-bold">{v.titulo}</h3>
              <p className="mt-1 text-sm leading-relaxed text-zinc-700">{v.texto}</p>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-bold">Qué hacemos</h3>
          {SERVICIOS.map((s, i) => (
            <article key={s.titulo} className="grid gap-4 rounded-lg border border-zinc-200 p-5 md:grid-cols-[1fr_260px]">
              <div className="space-y-2">
                <h4 className="text-xl font-bold">
                  <span className="text-[#E4162B]">{i + 1}.</span> {s.titulo}
                </h4>
                <p>{s.descripcion}</p>
                {s.ejemplo && <p><b>Ejemplo emblemático:</b> {s.ejemplo}</p>}
                {s.diferencial && <p><b>Diferencial:</b> {s.diferencial}</p>}
                <p><b>Entregables:</b> {s.entregables}</p>
              </div>
              {s.imagen && (
                <div className="space-y-2">
                  <Image src={s.imagen} alt={s.titulo} width={520} height={400} className="h-auto w-full rounded object-cover" />
                  {s.imagen2 && (
                    <Image src={s.imagen2} alt="Proyector de película" width={520} height={400} className="h-auto w-full rounded object-cover" />
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <section id="noticias" className="scroll-mt-6 space-y-4">
        <H2>Noticias</H2>
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
        <H2>Contacto</H2>
        <ul className="space-y-1 text-lg">
          <li>Correo: <span className="text-zinc-500">por definir</span></li>
          <li>Teléfono / WhatsApp: <span className="text-zinc-500">por definir</span></li>
          <li>Ciudad: <span className="text-zinc-500">por definir</span></li>
        </ul>
      </section>
    </main>
  );
}
