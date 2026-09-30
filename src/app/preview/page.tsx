import Image from "next/image";
import Link from "next/link";
import { APOYO, CONTACTO, EJES, MISION, PROPOSITO, SERVICIOS, VALORES } from "@/lib/site";
import { MINAS, NOTICIAS, PORTAFOLIO } from "@/lib/blog-content";

const TILES = [
  {
    href: "/preview/minas-de-salento",
    src: MINAS.imagenes[0],
    alt: "Cielo estrellado y palma de cera sobre las montañas de Salento",
    caption: "Minas de Salento",
    className: "row-span-2",
    // El afiche trae título y créditos impresos: se muestra solo el cielo y la palma.
    position: "object-[57%_top]",
    frame: "absolute inset-x-0 top-0 h-[165%]",
  },
  {
    href: "/preview#quienes-somos",
    src: "/img/proyector.jpg",
    alt: "Proyector de películas con dos carretes",
    caption: "Memoria audiovisual",
    className: "",
    position: "object-center",
    frame: "absolute inset-0",
  },
  {
    href: "/preview/sazon-y-fogon",
    src: "/img/sazon-logo.jpg",
    alt: "Logo de la serie Sazón y Fogón",
    caption: "Sazón y Fogón",
    className: "",
    position: "object-center",
    frame: "absolute inset-0",
  },
];

function Hero() {
  return (
    <section className="grid items-center gap-8 md:grid-cols-[1fr_1.1fr]">
      <div className="space-y-5">
        <p className="text-sm font-semibold uppercase tracking-widest">Asociación CreActivos Audiovisual</p>
        <h1 className="text-4xl font-bold leading-tight text-black sm:text-5xl">Cine y formación ambiental</h1>
        <p className="max-w-md text-lg leading-relaxed">
          Profesionales de la comunicación que desarrollan productos culturales, educativos y socioambientales.
        </p>
        <div className="flex flex-wrap gap-3 pt-1">
          <Link href="/preview/minas-de-salento" className="rounded bg-[#E4162B] px-5 py-2 font-semibold text-black">
            Conoce Minas de Salento
          </Link>
          <Link href="/preview/sazon-y-fogon" className="rounded border-2 border-black px-5 py-2 font-semibold text-black">
            Ver Sazón y Fogón
          </Link>
        </div>
      </div>

      <div className="grid h-[22rem] grid-cols-2 grid-rows-2 gap-2 sm:h-[28rem]">
        {TILES.map((t) => (
          <Link
            key={t.caption}
            href={t.href}
            className={`group relative overflow-hidden rounded-lg bg-zinc-900 ${t.className}`}
          >
            <div className={t.frame}>
              <Image
                src={t.src}
                alt={t.alt}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className={`object-cover ${t.position} transition-transform duration-500 group-hover:scale-105`}
                priority
              />
            </div>
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 pb-2 pt-8 text-sm font-semibold text-white">
              {t.caption}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

const GALERIA = [
  { src: "/img/galeria-musicos.jpg", alt: "Músicos con violín y guitarras bajo un árbol grande", span: "md:col-span-4", position: "object-[50%_30%]" },
  { src: "/img/galeria-bellotas.jpg", alt: "Bellotas verdes sobre hojarasca", span: "md:col-span-2", position: "object-center" },
  { src: "/img/sazon-cocinera.jpg", alt: "Cocinera con pañoleta rosada sostiene una bandeja de masa en bolitas", span: "md:col-span-2", position: "object-[50%_25%]" },
  { src: "/img/sazon-empanadas.jpg", alt: "Empanadas fritas alrededor de un pocillo de barro con ají verde", span: "md:col-span-2", position: "object-center" },
  { src: "/img/galeria-paramo.jpg", alt: "Laguna de páramo entre montañas y niebla", span: "md:col-span-2", position: "object-center" },
  { src: "/img/sazon-abuela.jpg", alt: "Cocinera mayor con gafas sostiene una cuchara de palo en su cocina", span: "md:col-span-2", position: "object-[30%_30%]" },
  { src: "/img/galeria-flor.jpg", alt: "Flor naranja de pétalos tubulares", span: "md:col-span-2", position: "object-center" },
  { src: "/img/galeria-rosa.jpg", alt: "Rosa roja con gotas de lluvia entre la niebla", span: "md:col-span-2", position: "object-center" },
];

function Galeria() {
  return (
    <section id="galeria" className="scroll-mt-6 space-y-4">
      <h2 className="text-3xl font-bold text-black">Galería</h2>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-6">
        {GALERIA.map((g, i) => (
          <div
            key={g.src}
            className={`relative h-44 overflow-hidden rounded-lg bg-zinc-100 sm:h-56 ${g.span} ${i === 0 || i === GALERIA.length - 1 ? "col-span-2" : ""}`}
          >
            <Image
              src={g.src}
              alt={g.alt}
              fill
              sizes={i === 0 ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 50vw"}
              className={`object-cover ${g.position}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-3xl font-bold text-black">{children}</h2>;
}

export default function CreactivosPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-16 px-4 py-10">
      <Hero />
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

      <Galeria />

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
