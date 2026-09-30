import Image from "next/image";
import { APOYO, CONTACTO, EJES, MISION, PROPOSITO, SERVICIOS, VALORES } from "@/lib/site";
import { NOTICIAS, PORTAFOLIO } from "@/lib/blog-content";

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-3xl font-bold text-black">{children}</h2>;
}

export default function CreactivosPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-16 px-4 py-10">
      <section id="quienes-somos" className="scroll-mt-6 space-y-10">
        <div className="space-y-4">
          <H2>Quiénes somos</H2>
          <ul className="flex flex-wrap gap-2">
            {EJES.map((e) => (
              <li key={e} className="rounded-full border-2 border-black px-4 py-1 text-sm font-semibold text-black">
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
              <p className="mt-1 text-sm leading-relaxed text-black">{v.texto}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Portafolio</h3>
          <p className="max-w-3xl leading-relaxed">{PORTAFOLIO.proposito}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {PORTAFOLIO.areas.map((a) => (
              <div key={a.titulo} className="rounded-lg border border-zinc-200 p-4">
                <h4 className="font-bold">{a.titulo}</h4>
                <p className="mt-1 text-sm leading-relaxed">{a.texto}</p>
              </div>
            ))}
          </div>
          <a href={PORTAFOLIO.certificado} target="_blank" rel="noreferrer" className="inline-block underline">
            Certificado de existencia y representación legal (abril de 2018)
          </a>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-bold">Qué hacemos</h3>
          {SERVICIOS.map((s, i) => (
            <article key={s.titulo} className="grid gap-4 rounded-lg border border-zinc-200 p-5 md:grid-cols-[1fr_260px]">
              <div className="space-y-2">
                <h4 className="text-xl font-bold">
                  <span>{i + 1}.</span> {s.titulo}
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
        <ul className="grid gap-4 sm:grid-cols-2">
          {NOTICIAS.map((n) => (
            <li key={n.titulo + n.fecha} className="rounded-lg border border-zinc-200 p-4 shadow-sm">
              <p className="text-xs text-black">{n.fecha}</p>
              <p className="mt-1 font-semibold">{n.titulo}</p>
              <p className="mt-2 text-sm leading-relaxed">{n.texto}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="contacto" className="scroll-mt-6 space-y-3">
        <H2>Contacto</H2>
        <ul className="space-y-1 text-lg">
          <li>
            <b>E-mail:</b>{" "}
            <a href={`mailto:${CONTACTO.email}`} className="underline">{CONTACTO.email}</a>
          </li>
          <li>
            <b>Cel:</b>{" "}
            <a href={`tel:${CONTACTO.telefonoTel}`} className="underline">{CONTACTO.telefono}</a>
            {" · "}
            <a href={CONTACTO.whatsapp} target="_blank" rel="noreferrer" className="underline">WhatsApp</a>
          </li>
          <li>
            <b>Facebook:</b>{" "}
            <a href={CONTACTO.facebook} target="_blank" rel="noreferrer" className="underline">CreActivosAudiovisual</a>
          </li>
          <li>
            <b>YouTube:</b>{" "}
            <a href={CONTACTO.youtube} target="_blank" rel="noreferrer" className="underline">@CreActivosAudiovisual</a>
          </li>
          <li><b>Ciudad:</b> por definir</li>
        </ul>
        <div className="space-y-3 pt-6">
          <h3 className="text-xl font-bold">Si quieres apoyar nuestros proyectos</h3>
          <div className="flex flex-wrap gap-3">
            {[
              ["Buy Me a Coffee", APOYO.buymeacoffee],
              ["Patreon", APOYO.patreon],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="rounded bg-[#E4162B] px-5 py-2 font-semibold text-black"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
