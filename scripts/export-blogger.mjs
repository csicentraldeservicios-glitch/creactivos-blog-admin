// Genera el HTML de cada página para pegarlo en Blogger (Páginas → Editar → vista HTML).
// Uso: node scripts/export-blogger.mjs   →   escribe blogger/*.html
// Lee los mismos datos que la vista previa (src/lib/site.ts y src/lib/blog-content.ts).
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const site = await import(join(root, "src/lib/site.ts"));
const blog = await import(join(root, "src/lib/blog-content.ts"));
const { EJES, PROPOSITO, MISION, VALORES, SERVICIOS, SAZON, CONTACTO, APOYO, PLAYLIST_ID, PLAYLIST_URL } = site;
const { PORTAFOLIO, NOTICIAS, CREA_CINE, MINAS, RUTA, ESAL } = blog;

// ---- Configuración ---------------------------------------------------------
const BLOG = "https://creactivosaudiovisual.blogspot.com";

// Dirección de cada página en Blogger. Las existentes conservan su URL;
// «inicio» y «sazon» son páginas nuevas que hay que crear con ese nombre de URL.
const LINKS = {
  inicio: `${BLOG}/p/inicio.html`,
  crea: `${BLOG}/p/crea.html`,
  minas: `${BLOG}/p/minas-de-salento.html`,
  ruta: `${BLOG}/p/noticias.html`,
  portafolio: `${BLOG}/p/portafolio.html`,
  contacto: `${BLOG}/p/contacto.html`,
  esal: `${BLOG}/p/permanencia-esal.html`,
  sazon: `${BLOG}/p/sazon-y-fogon.html`,
};

// Las imágenes deben estar en internet para que Blogger las muestre.
// Por defecto se leen de este repositorio (público) vía jsDelivr, fijadas a un commit que ya contiene todas las fotos.
// Cuando las fotos estén en main puedes cambiar el commit por «main».
// Para usar otras direcciones, escribe blogger/imagenes.json: { "galeria-musicos.jpg": "https://..." }
const IMG_BASE =
  process.env.IMG_BASE ??
  "https://cdn.jsdelivr.net/gh/csicentraldeservicios-glitch/creactivos-blog-admin@251ad88b2c1a437e4a5a2a2bccb42f610c720a0f/public/img";
const overridesPath = join(root, "blogger/imagenes.json");
const overrides = existsSync(overridesPath) ? JSON.parse(readFileSync(overridesPath, "utf8")) : {};
const img = (file) => overrides[file] ?? `${IMG_BASE}/${file}`;
const base = (p) => p.split("/").pop();

// ---- Utilidades ------------------------------------------------------------
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const ext = (href) => `href="${esc(href)}" target="_blank" rel="noopener noreferrer"`;
const yt = (id) => `https://www.youtube.com/embed/${id}`;

const CSS = `
.cr{--cr-red:#E4162B;color:#000;font-size:17px;line-height:1.6;max-width:1000px;margin:0 auto}
.cr *{box-sizing:border-box}
.cr a{color:#000}
.cr h1,.cr h2,.cr h3,.cr h4{color:#000;line-height:1.2;margin:0 0 .5em;font-weight:700}
.cr h1{font-size:2.6em}.cr h2{font-size:1.9em}.cr h3{font-size:1.35em}.cr h4{font-size:1.1em}
.cr p{margin:0 0 .9em}
.cr ul{margin:0 0 1em;padding-left:1.3em}
.cr section{margin:0 0 3em}
.cr-nav{display:flex;flex-wrap:wrap;gap:.4em 1.2em;border-bottom:4px solid var(--cr-red);padding:0 0 .6em;margin:0 0 2em;font-weight:700}
.cr-nav a{text-decoration:none}.cr-nav a:hover{text-decoration:underline}
.cr-pills{display:flex;flex-wrap:wrap;gap:.5em;list-style:none;padding:0}
.cr-pills li{border:2px solid #000;border-radius:999px;padding:.1em .9em;font-size:.9em;font-weight:700}
.cr-btn{display:inline-block;background:var(--cr-red);color:#000!important;font-weight:700;padding:.5em 1.2em;border-radius:4px;text-decoration:none;margin:0 .5em .5em 0}
.cr-btn.alt{background:#fff;border:2px solid #000}
.cr-grid2{display:grid;grid-template-columns:repeat(2,1fr);gap:1.2em}
.cr-card{border:1px solid #d4d4d8;border-radius:8px;padding:1em;background:#fff}
.cr-card.red{border-left:4px solid var(--cr-red);background:#fafafa}
.cr-card h4{margin-bottom:.3em}
.cr-card p{margin:0;font-size:.95em}
.cr-date{font-size:.8em;margin:0 0 .2em!important}
.cr-hero{display:grid;grid-template-columns:1fr 1.1fr;gap:2em;align-items:center}
.cr-tiles{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:6px;height:26em}
.cr-tile{position:relative;display:block;overflow:hidden;border-radius:8px;background:#18181b}
.cr-tile.tall{grid-row:span 2}
.cr-tile .fr{position:absolute;inset:0}
.cr-tile.tall .fr{height:165%;bottom:auto}
.cr-tile img,.cr-gal img,.cr-photo img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;max-width:none}
.cr-tile.tall img{object-position:57% top}
.cr-tile span{position:absolute;left:0;right:0;bottom:0;padding:2em .8em .5em;background:linear-gradient(to top,rgba(0,0,0,.8),transparent);color:#fff;font-weight:700;font-size:.9em}
.cr-gallery{display:grid;grid-template-columns:repeat(6,1fr);gap:6px}
.cr-gal{position:relative;overflow:hidden;border-radius:8px;background:#f4f4f5;height:14em;grid-column:span 2}
.cr-gal.w4{grid-column:span 4}
.cr-photos{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
.cr-photo{position:relative;overflow:hidden;border-radius:8px;background:#f4f4f5;height:18em}
.cr-svc{display:grid;grid-template-columns:1fr 240px;gap:1.2em;margin:0 0 1em}
.cr-svc img{width:100%;height:auto;border-radius:6px;margin:0 0 .5em;display:block}
.cr-video{position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:8px;background:#f4f4f5;margin:0 0 1em}
.cr-video iframe{position:absolute;top:0;left:0;width:100%;height:100%;border:0}
.cr-dl{display:grid;grid-template-columns:9em 1fr;gap:.5em 1.2em;border:1px solid #d4d4d8;border-radius:8px;padding:1em}
.cr-dl dt{font-weight:700}.cr-dl dd{margin:0}
.cr-year{border-bottom:2px solid var(--cr-red);padding-bottom:.2em}
.cr-foot{border-top:4px solid var(--cr-red);padding-top:1em;font-size:.9em;text-align:center}
@media(max-width:700px){
 .cr-hero,.cr-svc,.cr-photos,.cr-grid2,.cr-dl{grid-template-columns:1fr}
 .cr-tiles{height:22em}
 .cr-gallery{grid-template-columns:repeat(2,1fr)}
 .cr-gal,.cr-gal.w4{grid-column:span 1;height:11em}
 .cr-gal.w4,.cr-gal.last{grid-column:span 2}
 .cr h1{font-size:2em}
}
`.replace(/\n\s*/g, "");

const nav = () =>
  `<nav class="cr-nav"><a href="${LINKS.inicio}">Creactivos</a><a href="${LINKS.crea}">CreA Cine Infantil</a><a href="${LINKS.minas}">Minas de Salento</a><a href="${LINKS.ruta}">Ruta</a><a href="${LINKS.sazon}">Sazón y Fogón</a><a href="${LINKS.esal}">Permanencia ESAL</a><a href="${LINKS.contacto}">Contacto</a></nav>`;

const foot = () =>
  `<div class="cr-foot"><p>© Creactivos · Cine y formación ambiental</p><p><a ${ext(CONTACTO.facebook)}>Facebook</a> · <a ${ext(CONTACTO.youtube)}>YouTube</a> · <a href="mailto:${CONTACTO.email}">E-mail</a> · <a ${ext(APOYO.buymeacoffee)}>Buy Me a Coffee</a> · <a ${ext(APOYO.patreon)}>Patreon</a></p></div>`;

const wrap = (body) => `<style>${CSS}</style>\n<div class="cr">\n${nav()}\n${body}\n${foot()}\n</div>\n`;

// ---- Páginas ---------------------------------------------------------------
const GALERIA = [
  ["galeria-musicos.jpg", "Músicos con violín y guitarras bajo un árbol grande", "w4", "50% 30%"],
  ["galeria-bellotas.jpg", "Bellotas verdes sobre hojarasca", "", "center"],
  ["sazon-cocinera.jpg", "Cocinera con pañoleta rosada sostiene una bandeja de masa en bolitas", "", "50% 25%"],
  ["sazon-empanadas.jpg", "Empanadas fritas alrededor de un pocillo de barro con ají verde", "", "center"],
  ["galeria-paramo.jpg", "Laguna de páramo entre montañas y niebla", "", "center"],
  ["sazon-abuela.jpg", "Cocinera mayor con gafas sostiene una cuchara de palo en su cocina", "", "30% 30%"],
  ["galeria-flor.jpg", "Flor naranja de pétalos tubulares", "", "center"],
  ["galeria-rosa.jpg", "Rosa roja con gotas de lluvia entre la niebla", "last", "center"],
];

const tile = (href, src, alt, caption, cls = "", pos = "") =>
  `<a class="cr-tile ${cls}" href="${href}"><div class="fr"><img src="${src}" alt="${esc(alt)}" loading="lazy"${pos ? ` style="object-position:${pos}"` : ""}></div><span>${esc(caption)}</span></a>`;

const inicio = () => `
<section class="cr-hero">
<div>
<p style="font-size:.8em;letter-spacing:.12em;text-transform:uppercase;font-weight:700">Asociación CreActivos Audiovisual</p>
<h1>Cine y formación ambiental</h1>
<p>Profesionales de la comunicación que desarrollan productos culturales, educativos y socioambientales.</p>
<p><a class="cr-btn" href="${LINKS.minas}">Conoce Minas de Salento</a><a class="cr-btn alt" href="${LINKS.sazon}">Ver Sazón y Fogón</a></p>
</div>
<div class="cr-tiles">
${tile(LINKS.minas, MINAS.imagenes[0], "Cielo estrellado y palma de cera sobre las montañas de Salento", "Minas de Salento", "tall")}
${tile("#quienes-somos", img("proyector.jpg"), "Proyector de películas con dos carretes", "Memoria audiovisual")}
${tile(LINKS.sazon, img("sazon-logo.jpg"), "Logo de la serie Sazón y Fogón", "Sazón y Fogón")}
</div>
</section>

<section id="quienes-somos">
<h2>Quiénes somos</h2>
<ul class="cr-pills">${EJES.map((e) => `<li>${esc(e)}</li>`).join("")}</ul>
<div class="cr-grid2">
<div><h3>Nuestro propósito</h3><p>${esc(PROPOSITO)}</p></div>
<div><h3>Nuestra misión</h3><p>${esc(MISION)}</p></div>
</div>
<div class="cr-grid2" style="margin-top:1.2em">
${VALORES.map((v) => `<div class="cr-card red"><h4>${esc(v.titulo)}</h4><p>${esc(v.texto)}</p></div>`).join("\n")}
</div>
</section>

<section>
<h2>Portafolio</h2>
<p>${esc(PORTAFOLIO.proposito)}</p>
<div class="cr-grid2">
${PORTAFOLIO.areas.map((a) => `<div class="cr-card"><h4>${esc(a.titulo)}</h4><p>${esc(a.texto)}</p></div>`).join("\n")}
</div>
<p style="margin-top:1em"><a ${ext(PORTAFOLIO.certificado)}>Certificado de existencia y representación legal (abril de 2018)</a></p>
</section>

<section>
<h2>Qué hacemos</h2>
${SERVICIOS.map(
  (s, i) => `<div class="cr-card cr-svc"><div>
<h3>${i + 1}. ${esc(s.titulo)}</h3>
<p>${esc(s.descripcion)}</p>
${s.ejemplo ? `<p><b>Ejemplo emblemático:</b> ${esc(s.ejemplo)}</p>` : ""}
${s.diferencial ? `<p><b>Diferencial:</b> ${esc(s.diferencial)}</p>` : ""}
<p><b>Entregables:</b> ${esc(s.entregables)}</p>
</div><div>${s.imagen ? `<img src="${img(base(s.imagen))}" alt="${esc(s.titulo)}" loading="lazy">` : ""}${s.imagen2 ? `<img src="${img(base(s.imagen2))}" alt="Proyector de película" loading="lazy">` : ""}</div></div>`,
).join("\n")}
</section>

<section id="galeria">
<h2>Galería</h2>
<div class="cr-gallery">
${GALERIA.map(([f, alt, cls, pos]) => `<div class="cr-gal ${cls}"><img src="${img(f)}" alt="${esc(alt)}" loading="lazy" style="object-position:${pos}"></div>`).join("\n")}
</div>
</section>

<section id="noticias">
<h2>Noticias</h2>
<div class="cr-grid2">
${NOTICIAS.map((n) => `<div class="cr-card"><p class="cr-date">${esc(n.fecha)}</p><h4>${esc(n.titulo)}</h4><p>${esc(n.texto)}</p></div>`).join("\n")}
</div>
</section>

<section id="contacto">
<h2>Contacto</h2>
<ul style="list-style:none;padding:0">
<li><b>E-mail:</b> <a href="mailto:${CONTACTO.email}">${CONTACTO.email}</a></li>
<li><b>Cel:</b> <a href="tel:${CONTACTO.telefonoTel}">${CONTACTO.telefono}</a> · <a ${ext(CONTACTO.whatsapp)}>WhatsApp</a></li>
<li><b>Facebook:</b> <a ${ext(CONTACTO.facebook)}>CreActivosAudiovisual</a></li>
<li><b>YouTube:</b> <a ${ext(CONTACTO.youtube)}>@CreActivosAudiovisual</a></li>
</ul>
<h3 style="margin-top:1em">Si quieres apoyar nuestros proyectos</h3>
<p><a class="cr-btn" ${ext(APOYO.buymeacoffee)}>Buy Me a Coffee</a><a class="cr-btn" ${ext(APOYO.patreon)}>Patreon</a></p>
</section>`;

const sazon = () => `
<section>
<div class="cr-grid2" style="grid-template-columns:220px 1fr;align-items:center">
<img src="${img("sazon-logo.jpg")}" alt="Sazón y Fogón" style="width:100%;height:auto;border-radius:8px">
<div><h2>Sazón y Fogón</h2><p>${esc(SAZON.descripcion)}</p><p><b>Impacto:</b> ${esc(SAZON.impacto)}</p></div>
</div>
</section>
<section>
<div class="cr-video"><iframe src="https://www.youtube.com/embed/videoseries?list=${PLAYLIST_ID}" title="Sazón y Fogón" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>
<p><a class="cr-btn" ${ext(PLAYLIST_URL)}>Ver la lista completa en YouTube</a></p>
</section>
<section>
<h2>Cocina tradicional</h2>
<div class="cr-photos">
<div class="cr-photo"><img src="${img("sazon-cocinera.jpg")}" alt="Cocinera con pañoleta rosada sostiene una bandeja de masa en bolitas" loading="lazy" style="object-position:50% 25%"></div>
<div class="cr-photo"><img src="${img("sazon-empanadas.jpg")}" alt="Empanadas fritas alrededor de un pocillo de barro con ají verde" loading="lazy"></div>
<div class="cr-photo"><img src="${img("sazon-abuela.jpg")}" alt="Cocinera mayor con gafas sostiene una cuchara de palo en su cocina" loading="lazy" style="object-position:30% 30%"></div>
</div>
</section>`;

const crea = () => `
<section>
<h2>${esc(CREA_CINE.titulo)}</h2>
<p>${esc(CREA_CINE.intro)}</p>
<dl class="cr-dl">${CREA_CINE.datos.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("")}</dl>
</section>
<section><h3>Con el apoyo de</h3><ul>${CREA_CINE.apoyan.map((a) => `<li>${esc(a)}</li>`).join("")}</ul></section>`;

const minas = () => `
<section>
<h2>Minas de Salento</h2>
<h3>${esc(MINAS.lema)}</h3>
<p>${esc(MINAS.descripcion)}</p>
<div class="cr-video"><iframe src="${yt(MINAS.videoId)}" title="Minas de Salento" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>
<p><a class="cr-btn" ${ext(MINAS.teaserUrl)}>Ver el teaser</a></p>
</section>
<section><div class="cr-grid2">${MINAS.imagenes
  .map((u, i) => `<img src="${u}" alt="${i === 0 ? "Afiche de Minas de Salento" : `Fotografía ${i} de Minas de Salento`}" loading="lazy" style="width:100%;height:auto;border-radius:8px">`)
  .join("")}</div></section>`;

const ruta = () => `
<section>
<h2>${esc(RUTA.titulo)}</h2>
<p>${esc(RUTA.intro)}</p>
<h3>Festivales, muestras y talleres</h3>
<ul>${RUTA.festivales.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
</section>
<section>
<div class="cr-card red"><h4>Reconocimiento</h4><p>${esc(RUTA.reconocimiento)}</p><p style="margin-top:.6em">${esc(RUTA.nota)}</p></div>
</section>
<section>
<h3>Producciones documentales</h3>
<ul>${RUTA.documentales.map((d) => `<li><a ${ext(d.url)}><b>${esc(d.titulo)}</b></a> · dirección de ${esc(d.director)}</li>`).join("")}</ul>
<h3>Videos</h3>
<ul>${RUTA.videos.map((v) => `<li><a ${ext(v.url)}><b>${esc(v.titulo)}</b></a></li>`).join("")}</ul>
</section>`;

const esal = () => `
<section>
<h2>Permanencia ESAL</h2>
<p>Documentos de la Asociación CreActivos Audiovisual (NIT 900411102-1), organizados por año.</p>
${ESAL.map((y) => `<h3 class="cr-year">${esc(y.anio)}</h3><ul>${y.docs.map((d) => `<li><a ${ext(d.url)}>${esc(d.titulo)}</a></li>`).join("")}</ul>`).join("\n")}
</section>`;

const PAGES = {
  "inicio.html": inicio,
  "sazon-y-fogon.html": sazon,
  "crea-cine-infantil.html": crea,
  "minas-de-salento.html": minas,
  "ruta.html": ruta,
  "permanencia-esal.html": esal,
};

const out = process.env.OUT_DIR ?? join(root, "blogger");
mkdirSync(out, { recursive: true });
for (const [name, fn] of Object.entries(PAGES)) {
  const html = wrap(fn().trim());
  writeFileSync(join(out, name), html);
  console.log(`blogger/${name}  ${(html.length / 1024).toFixed(1)} KB`);
}
