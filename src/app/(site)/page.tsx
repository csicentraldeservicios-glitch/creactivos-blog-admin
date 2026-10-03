import { A, BTN, BTN_ALT, Text } from "@/components/site/Bits";
import { Pic } from "@/components/site/Pic";
import { getContent } from "@/lib/content";
import type { SiteContent } from "@/lib/content-types";
import { telHref, whatsappHref } from "@/lib/content-utils";

export const dynamic = "force-dynamic";

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl font-bold text-black">{children}</h2>
);

function Hero({ c }: { c: SiteContent["portada"] }) {
  const tiles = c.tiles.filter((t) => t.imagen);
  return (
    <section className="grid items-center gap-8 md:grid-cols-[1fr_1.1fr]">
      <div className="space-y-5">
        {c.eyebrow && <p className="text-sm font-semibold uppercase tracking-widest">{c.eyebrow}</p>}
        <h1 className="text-4xl font-bold leading-tight sm:text-5xl">{c.titulo}</h1>
        <Text text={c.texto} className="max-w-md text-lg leading-relaxed" />
        <div className="flex flex-wrap gap-3 pt-1">
          {c.boton1Texto && c.boton1Enlace && (
            <A href={c.boton1Enlace} className={BTN}>
              {c.boton1Texto}
            </A>
          )}
          {c.boton2Texto && c.boton2Enlace && (
            <A href={c.boton2Enlace} className={BTN_ALT}>
              {c.boton2Texto}
            </A>
          )}
        </div>
      </div>
      {tiles.length > 0 && (
        <div className="grid h-[22rem] grid-cols-2 grid-rows-2 gap-2 sm:h-[28rem]">
          {tiles.map((t, i) => {
            const inner = (
              <>
                <Pic
                  src={t.imagen}
                  alt={t.texto}
                  priority
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="transition-transform duration-500 group-hover:scale-105"
                />
                {t.texto && (
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 pb-2 pt-8 text-sm font-semibold text-white">
                    {t.texto}
                  </span>
                )}
              </>
            );
            const cls = `group relative overflow-hidden rounded-lg bg-zinc-900 ${i === 0 && tiles.length > 1 ? "row-span-2" : ""}`;
            return t.enlace ? (
              <A key={i} href={t.enlace} className={cls}>
                {inner}
              </A>
            ) : (
              <div key={i} className={cls}>
                {inner}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

function Quienes({ c }: { c: SiteContent["quienes"] }) {
  return (
    <section id="quienes-somos" className="scroll-mt-6 space-y-10">
      <div className="space-y-4">
        <H2>Quiénes somos</H2>
        {c.ejes.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {c.ejes.map((e) => (
              <li key={e} className="rounded-full border-2 border-black px-4 py-1 text-sm font-semibold">
                {e}
              </li>
            ))}
          </ul>
        )}
        <div className="grid gap-6 md:grid-cols-2">
          {c.proposito && (
            <div>
              <h3 className="mb-1 text-xl font-bold">Nuestro propósito</h3>
              <Text text={c.proposito} className="mb-2 leading-relaxed" />
            </div>
          )}
          {c.mision && (
            <div>
              <h3 className="mb-1 text-xl font-bold">Nuestra misión</h3>
              <Text text={c.mision} className="mb-2 leading-relaxed" />
            </div>
          )}
        </div>
      </div>

      {c.valores.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {c.valores.map((v, i) => (
            <div key={i} className="rounded-lg border-l-4 border-[#E4162B] bg-zinc-50 p-4">
              <h3 className="font-bold">{v.titulo}</h3>
              <Text text={v.texto} className="mt-1 text-sm leading-relaxed" />
            </div>
          ))}
        </div>
      )}

      {(c.portafolio.proposito || c.portafolio.areas.length > 0) && (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Portafolio</h3>
          <Text text={c.portafolio.proposito} className="max-w-3xl leading-relaxed" />
          {c.portafolio.areas.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              {c.portafolio.areas.map((a, i) => (
                <div key={i} className="rounded-lg border border-zinc-200 p-4">
                  <h4 className="font-bold">{a.titulo}</h4>
                  <Text text={a.texto} className="mt-1 text-sm leading-relaxed" />
                </div>
              ))}
            </div>
          )}
          {c.portafolio.certificado && (
            <A href={c.portafolio.certificado} className="inline-block underline">
              Certificado de existencia y representación legal
            </A>
          )}
        </div>
      )}

      {c.servicios.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold">Qué hacemos</h3>
          {c.servicios.map((s, i) => (
            <article
              key={i}
              className={`grid gap-4 rounded-lg border border-zinc-200 p-5 ${s.imagen ? "md:grid-cols-[1fr_260px]" : ""}`}
            >
              <div className="space-y-2">
                <h4 className="text-xl font-bold">
                  {i + 1}. {s.titulo}
                </h4>
                <Text text={s.descripcion} />
                {s.ejemplo && (
                  <p>
                    <b>Ejemplo emblemático:</b> {s.ejemplo}
                  </p>
                )}
                {s.diferencial && (
                  <p>
                    <b>Diferencial:</b> {s.diferencial}
                  </p>
                )}
                {s.entregables && (
                  <p>
                    <b>Entregables:</b> {s.entregables}
                  </p>
                )}
              </div>
              {s.imagen && (
                <div className="space-y-2">
                  <div className="relative aspect-[4/3] overflow-hidden rounded">
                    <Pic src={s.imagen} alt={s.titulo} sizes="260px" />
                  </div>
                  {s.imagen2 && (
                    <div className="relative aspect-[4/3] overflow-hidden rounded">
                      <Pic src={s.imagen2} alt="" sizes="260px" />
                    </div>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

const SPAN: Record<number, string> = { 2: "md:col-span-2", 3: "md:col-span-3", 4: "md:col-span-4", 6: "md:col-span-6" };

/** Ancho de cada foto en pantallas grandes (rejilla de 6 columnas): la primera grande, el resto de a tres,
 *  y la última fila se reparte para que nunca quede un hueco. */
function desktopSpan(i: number, n: number): number {
  if (n === 1) return 6;
  if (i === 0) return 4;
  if (i === 1) return 2;
  const m = n - 2; // fotos después de la primera fila
  const lastRowStart = 2 + Math.floor((m - 1) / 3) * 3;
  if (i >= lastRowStart) return 6 / (n - lastRowStart);
  return 2;
}

function Galeria({ items }: { items: SiteContent["galeria"]["items"] }) {
  const fotos = items.filter((f) => f.imagen);
  if (!fotos.length) return null;
  const n = fotos.length;
  return (
    <section id="galeria" className="scroll-mt-6 space-y-4">
      <H2>Galería</H2>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-6">
        {fotos.map((g, i) => {
          const span = desktopSpan(i, n);
          // En móvil: la primera foto a todo el ancho y, si sobra una suelta al final, también.
          const mobileFull = i === 0 || (i === n - 1 && (n - 1) % 2 === 1);
          return (
            <div
              key={i}
              className={`relative h-44 overflow-hidden rounded-lg bg-zinc-100 sm:h-56 ${mobileFull ? "col-span-2" : ""} ${SPAN[span]}`}
            >
              <Pic
                src={g.imagen}
                alt={g.texto}
                sizes={span >= 4 ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 50vw"}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Noticias({ items }: { items: SiteContent["noticias"]["items"] }) {
  if (!items.length) return null;
  return (
    <section id="noticias" className="scroll-mt-6 space-y-4">
      <H2>Noticias</H2>
      <ul className="grid gap-4 sm:grid-cols-2">
        {items.map((n, i) => (
          <li key={i} className="rounded-lg border border-zinc-200 p-4 shadow-sm">
            {n.fecha && <p className="text-xs">{n.fecha}</p>}
            <p className="mt-1 font-semibold">{n.titulo}</p>
            <Text text={n.texto} className="mt-2 text-sm leading-relaxed" />
          </li>
        ))}
      </ul>
    </section>
  );
}

function Contacto({ c }: { c: SiteContent["contacto"] }) {
  const tel = telHref(c.telefono);
  const wa = whatsappHref(c.telefono);
  const apoyo: [string, string][] = [
    ["Buy Me a Coffee", c.buymeacoffee],
    ["Patreon", c.patreon],
  ];
  return (
    <section id="contacto" className="scroll-mt-6 space-y-3">
      <H2>Contacto</H2>
      <ul className="space-y-1 text-lg">
        {c.email && (
          <li>
            <b>E-mail:</b>{" "}
            <A href={`mailto:${c.email}`} className="underline">
              {c.email}
            </A>
          </li>
        )}
        {c.telefono && (
          <li>
            <b>Cel:</b>{" "}
            {tel ? (
              <A href={tel} className="underline">
                {c.telefono}
              </A>
            ) : (
              c.telefono
            )}
            {wa && (
              <>
                {" · "}
                <A href={wa} className="underline">
                  WhatsApp
                </A>
              </>
            )}
          </li>
        )}
        {c.facebook && (
          <li>
            <b>Facebook:</b>{" "}
            <A href={c.facebook} className="underline">
              {c.facebook.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
            </A>
          </li>
        )}
        {c.youtube && (
          <li>
            <b>YouTube:</b>{" "}
            <A href={c.youtube} className="underline">
              {c.youtube.replace(/^https?:\/\/(www\.)?youtube\.com\//, "").replace(/\/$/, "")}
            </A>
          </li>
        )}
        {c.ciudad && (
          <li>
            <b>Ciudad:</b> {c.ciudad}
          </li>
        )}
      </ul>
      {apoyo.some(([, h]) => h) && (
        <div className="space-y-3 pt-6">
          <h3 className="text-xl font-bold">Si quieres apoyar nuestros proyectos</h3>
          <div className="flex flex-wrap gap-3">
            {apoyo
              .filter(([, h]) => h)
              .map(([label, href]) => (
                <A key={label} href={href} className={BTN}>
                  {label}
                </A>
              ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default async function HomePage() {
  const c = await getContent();
  return (
    <main className="mx-auto max-w-5xl space-y-16 px-4 py-10">
      <Hero c={c.portada} />
      <Quienes c={c.quienes} />
      <Galeria items={c.galeria.items} />
      <Noticias items={c.noticias.items} />
      <Contacto c={c.contacto} />
    </main>
  );
}
