// Definición de los formularios del panel y validación de lo que se guarda.
// El mismo esquema dibuja el formulario (navegador) y limpia/valida los datos (servidor).
import type { SectionKey } from "./content-types";
import { youtubePlaylistId, youtubeVideoId } from "./content-utils";

interface Base {
  key: string;
  label: string;
  help?: string;
}

export type Field =
  | (Base & { type: "text"; multiline?: boolean; max?: number; placeholder?: string })
  | (Base & { type: "url"; placeholder?: string })
  | (Base & { type: "email"; placeholder?: string })
  | (Base & { type: "youtube"; placeholder?: string; kind: "video" | "lista" })
  | (Base & { type: "image" })
  | (Base & { type: "strings"; itemLabel: string; addLabel: string; multiline?: boolean })
  | (Base & {
      type: "list";
      itemLabel: string;
      addLabel: string;
      titleKey: string;
      fields: Field[];
      fixed?: boolean;
      max?: number;
    })
  | (Base & { type: "group"; fields: Field[] });

export interface EditorDef {
  key: SectionKey;
  title: string;
  description: string;
  /** Dirección pública donde se ve esta sección. */
  viewPath: string;
  fields: Field[];
}

const foto: Field[] = [
  { type: "image", key: "imagen", label: "Foto" },
  { type: "text", key: "texto", label: "Descripción de la foto", help: "Se lee en voz alta para personas con discapacidad visual y aparece si la foto no carga." },
];

export const EDITORS: EditorDef[] = [
  {
    key: "portada",
    title: "Portada",
    description: "Título, texto, botones y las tres fotos grandes de la página de inicio.",
    viewPath: "/",
    fields: [
      { type: "text", key: "eyebrow", label: "Línea pequeña sobre el título", max: 120 },
      { type: "text", key: "titulo", label: "Título principal", max: 120 },
      { type: "text", key: "texto", label: "Texto de presentación", multiline: true, max: 400 },
      { type: "text", key: "boton1Texto", label: "Botón rojo: texto", max: 60 },
      { type: "url", key: "boton1Enlace", label: "Botón rojo: a dónde lleva", help: "Una página del sitio (por ejemplo /minas-de-salento) o un enlace que empiece con https://", placeholder: "/minas-de-salento" },
      { type: "text", key: "boton2Texto", label: "Botón con borde: texto", max: 60 },
      { type: "url", key: "boton2Enlace", label: "Botón con borde: a dónde lleva", placeholder: "/sazon-y-fogon" },
      {
        type: "list", key: "tiles", label: "Fotos de la portada", help: "La primera es la alta de la izquierda; las otras dos van a la derecha.",
        itemLabel: "Foto", addLabel: "Añadir foto", titleKey: "texto", fixed: true, max: 3,
        fields: [
          { type: "image", key: "imagen", label: "Foto" },
          { type: "text", key: "texto", label: "Título sobre la foto", max: 60 },
          { type: "url", key: "enlace", label: "A dónde lleva al pulsarla", placeholder: "/sazon-y-fogon" },
        ],
      },
    ],
  },
  {
    key: "quienes",
    title: "Quiénes somos",
    description: "Propósito, misión, valores, portafolio y servicios.",
    viewPath: "/#quienes-somos",
    fields: [
      { type: "strings", key: "ejes", label: "Ejes de trabajo", help: "Aparecen como etiquetas, por ejemplo Patrimonio, Formación, Ambiental.", itemLabel: "Eje", addLabel: "Añadir eje" },
      { type: "text", key: "proposito", label: "Nuestro propósito", multiline: true, max: 1200 },
      { type: "text", key: "mision", label: "Nuestra misión", multiline: true, max: 1800 },
      {
        type: "list", key: "valores", label: "Valores", itemLabel: "Valor", addLabel: "Añadir valor", titleKey: "titulo",
        fields: [
          { type: "text", key: "titulo", label: "Nombre del valor", max: 100 },
          { type: "text", key: "texto", label: "Explicación", multiline: true, max: 600 },
        ],
      },
      {
        type: "group", key: "portafolio", label: "Portafolio",
        fields: [
          { type: "text", key: "proposito", label: "Texto de presentación", multiline: true, max: 1500 },
          { type: "url", key: "certificado", label: "Enlace al certificado de existencia", help: "Enlace de Google Drive u otro sitio. Déjalo vacío si no quieres mostrarlo.", placeholder: "https://drive.google.com/…" },
          {
            type: "list", key: "areas", label: "Áreas", itemLabel: "Área", addLabel: "Añadir área", titleKey: "titulo",
            fields: [
              { type: "text", key: "titulo", label: "Nombre del área", max: 100 },
              { type: "text", key: "texto", label: "Descripción", multiline: true, max: 800 },
            ],
          },
        ],
      },
      {
        type: "list", key: "servicios", label: "Qué hacemos (servicios)", itemLabel: "Servicio", addLabel: "Añadir servicio", titleKey: "titulo", max: 12,
        fields: [
          { type: "text", key: "titulo", label: "Nombre del servicio", max: 160 },
          { type: "text", key: "descripcion", label: "Descripción", multiline: true, max: 1500 },
          { type: "text", key: "ejemplo", label: "Ejemplo emblemático", help: "Opcional.", multiline: true, max: 600 },
          { type: "text", key: "diferencial", label: "Diferencial", help: "Opcional.", multiline: true, max: 600 },
          { type: "text", key: "entregables", label: "Entregables", multiline: true, max: 800 },
          { type: "image", key: "imagen", label: "Foto (opcional)" },
          { type: "image", key: "imagen2", label: "Segunda foto (opcional)" },
        ],
      },
    ],
  },
  {
    key: "galeria",
    title: "Galería",
    description: "Las fotos de la portada. Se acomodan solas; la primera sale más grande.",
    viewPath: "/#galeria",
    fields: [
      { type: "list", key: "items", label: "Fotos", itemLabel: "Foto", addLabel: "Añadir foto", titleKey: "texto", max: 24, fields: foto },
    ],
  },
  {
    key: "noticias",
    title: "Noticias",
    description: "Anuncios y novedades. Aparecen en el orden que las pongas: arriba, la más reciente.",
    viewPath: "/#noticias",
    fields: [
      {
        type: "list", key: "items", label: "Noticias", itemLabel: "Noticia", addLabel: "Añadir noticia", titleKey: "titulo", max: 100,
        fields: [
          { type: "text", key: "fecha", label: "Fecha", help: "Escríbela como quieras verla, por ejemplo 12 de marzo de 2026.", max: 60 },
          { type: "text", key: "titulo", label: "Título", max: 200 },
          { type: "text", key: "texto", label: "Texto", multiline: true, max: 2500 },
        ],
      },
    ],
  },
  {
    key: "contacto",
    title: "Contacto y apoyo",
    description: "Correo, celular, redes sociales y enlaces para apoyar los proyectos.",
    viewPath: "/#contacto",
    fields: [
      { type: "email", key: "email", label: "Correo electrónico" },
      { type: "text", key: "telefono", label: "Celular", help: "Con el indicativo del país para que funcione el botón de WhatsApp, por ejemplo +57 316 258 2914.", max: 40, placeholder: "+57 316 258 2914" },
      { type: "url", key: "facebook", label: "Facebook", placeholder: "https://www.facebook.com/…" },
      { type: "url", key: "youtube", label: "YouTube", placeholder: "https://www.youtube.com/@…" },
      { type: "text", key: "ciudad", label: "Ciudad", help: "Opcional.", max: 80 },
      { type: "url", key: "buymeacoffee", label: "Enlace de Buy Me a Coffee", help: "Déjalo vacío si no quieres mostrar el botón.", placeholder: "https://buymeacoffee.com/…" },
      { type: "url", key: "patreon", label: "Enlace de Patreon", help: "Déjalo vacío si no quieres mostrar el botón.", placeholder: "https://www.patreon.com/…" },
    ],
  },
  {
    key: "sazon",
    title: "Sazón y Fogón",
    description: "La serie de patrimonio gastronómico: texto, lista de YouTube y fotos.",
    viewPath: "/sazon-y-fogon",
    fields: [
      { type: "text", key: "titulo", label: "Título", max: 120 },
      { type: "image", key: "logo", label: "Logo o imagen principal" },
      { type: "text", key: "descripcion", label: "Descripción", multiline: true, max: 800 },
      { type: "text", key: "impacto", label: "Impacto", multiline: true, max: 800 },
      { type: "youtube", key: "lista", kind: "lista", label: "Lista de reproducción de YouTube", help: "Pega el enlace de la lista (el que contiene list=…). Déjalo vacío para ocultar el video.", placeholder: "https://www.youtube.com/playlist?list=…" },
      { type: "text", key: "fotosTitulo", label: "Título de las fotos", max: 100 },
      { type: "list", key: "fotos", label: "Fotos", itemLabel: "Foto", addLabel: "Añadir foto", titleKey: "texto", max: 24, fields: foto },
    ],
  },
  {
    key: "crea",
    title: "CreA Cine Infantil",
    description: "El taller de stop motion para niños y su información práctica.",
    viewPath: "/crea-cine-infantil",
    fields: [
      { type: "text", key: "titulo", label: "Título", max: 200 },
      { type: "text", key: "intro", label: "Presentación", multiline: true, max: 1500 },
      {
        type: "list", key: "datos", label: "Datos prácticos", itemLabel: "Dato", addLabel: "Añadir dato", titleKey: "etiqueta", max: 20,
        fields: [
          { type: "text", key: "etiqueta", label: "Nombre del dato", help: "Por ejemplo Fechas, Lugar, Costo.", max: 60 },
          { type: "text", key: "valor", label: "Valor", multiline: true, max: 400 },
        ],
      },
      { type: "text", key: "apoyanTitulo", label: "Título de los apoyos", max: 80 },
      { type: "strings", key: "apoyan", label: "Entidades que apoyan", itemLabel: "Entidad", addLabel: "Añadir entidad" },
    ],
  },
  {
    key: "minas",
    title: "Minas de Salento",
    description: "El documental: descripción, video, teaser y fotos.",
    viewPath: "/minas-de-salento",
    fields: [
      { type: "text", key: "titulo", label: "Título", max: 120 },
      { type: "text", key: "lema", label: "Frase destacada", max: 200 },
      { type: "text", key: "descripcion", label: "Descripción", multiline: true, max: 2500 },
      { type: "youtube", key: "video", kind: "video", label: "Video principal de YouTube", help: "Pega el enlace del video. Déjalo vacío para ocultarlo.", placeholder: "https://youtu.be/…" },
      { type: "url", key: "teaser", label: "Enlace del teaser", help: "Opcional.", placeholder: "https://youtu.be/…" },
      { type: "list", key: "imagenes", label: "Fotos", itemLabel: "Foto", addLabel: "Añadir foto", titleKey: "texto", max: 24, fields: foto },
    ],
  },
  {
    key: "ruta",
    title: "Ruta",
    description: "Festivales, reconocimientos y producciones documentales.",
    viewPath: "/ruta",
    fields: [
      { type: "text", key: "titulo", label: "Título", max: 120 },
      { type: "text", key: "intro", label: "Presentación", multiline: true, max: 800 },
      { type: "text", key: "festivalesTitulo", label: "Título de la lista de festivales", max: 100 },
      { type: "strings", key: "festivales", label: "Festivales, muestras y talleres", itemLabel: "Festival", addLabel: "Añadir festival", multiline: true },
      { type: "text", key: "reconocimiento", label: "Reconocimiento destacado", multiline: true, max: 1000 },
      { type: "text", key: "nota", label: "Nota adicional", help: "Opcional.", multiline: true, max: 800 },
      {
        type: "list", key: "documentales", label: "Producciones documentales", itemLabel: "Documental", addLabel: "Añadir documental", titleKey: "titulo", max: 40,
        fields: [
          { type: "text", key: "titulo", label: "Título", max: 200 },
          { type: "text", key: "director", label: "Dirección", max: 120 },
          { type: "url", key: "url", label: "Enlace al video", placeholder: "https://youtu.be/…" },
        ],
      },
      {
        type: "list", key: "videos", label: "Otros videos", itemLabel: "Video", addLabel: "Añadir video", titleKey: "titulo", max: 40,
        fields: [
          { type: "text", key: "titulo", label: "Título", max: 200 },
          { type: "url", key: "url", label: "Enlace al video", placeholder: "https://youtu.be/…" },
        ],
      },
    ],
  },
  {
    key: "esal",
    title: "Permanencia ESAL",
    description: "Documentos de la entidad organizados por año.",
    viewPath: "/permanencia-esal",
    fields: [
      { type: "text", key: "titulo", label: "Título", max: 120 },
      { type: "text", key: "intro", label: "Presentación", multiline: true, max: 600 },
      {
        type: "list", key: "anios", label: "Años", help: "Pon el más reciente arriba.", itemLabel: "Año", addLabel: "Añadir año", titleKey: "anio", max: 40,
        fields: [
          { type: "text", key: "anio", label: "Año", max: 20, placeholder: "2026" },
          {
            type: "list", key: "documentos", label: "Documentos", itemLabel: "Documento", addLabel: "Añadir documento", titleKey: "titulo", max: 60,
            fields: [
              { type: "text", key: "titulo", label: "Nombre del documento", max: 200 },
              { type: "url", key: "url", label: "Enlace de Google Drive u otro sitio", placeholder: "https://drive.google.com/…" },
            ],
          },
        ],
      },
    ],
  },
];

export function getEditor(key: string): EditorDef | undefined {
  return EDITORS.find((e) => e.key === key);
}

// ---------------------------------------------------------------------------
// Validación y limpieza (servidor). Reconstruye los datos solo con los campos del esquema.
// ---------------------------------------------------------------------------

const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const clean = (v: unknown, max: number, multiline: boolean) => {
  let s = typeof v === "string" ? v : "";
  s = s.replace(/\r\n?/g, "\n").replace(CONTROL, "");
  if (!multiline) s = s.replace(/\n+/g, " ");
  return s.trim().slice(0, max);
};

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);

function isEmpty(v: unknown): boolean {
  if (typeof v === "string") return v === "";
  if (Array.isArray(v)) return v.every(isEmpty);
  if (isObj(v)) return Object.values(v).every(isEmpty);
  return true;
}

function sanitizeFields(fields: Field[], input: unknown, where: string, errors: string[]): Record<string, unknown> {
  const src = isObj(input) ? input : {};
  const out: Record<string, unknown> = {};
  for (const f of fields) {
    const raw = src[f.key];
    const at = `${where} › ${f.label}`;
    switch (f.type) {
      case "text":
        out[f.key] = clean(raw, f.max ?? (f.multiline ? 4000 : 300), !!f.multiline);
        break;
      case "url": {
        const s = clean(raw, 2000, false);
        if (s && (!/^(https?:\/\/|mailto:|\/(?!\/)|#)/i.test(s) || /\s/.test(s))) {
          errors.push(`${at}: el enlace debe empezar con https:// (o con / para una página del sitio).`);
        }
        out[f.key] = s;
        break;
      }
      case "email": {
        const s = clean(raw, 200, false);
        if (s && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) errors.push(`${at}: escribe un correo válido, como nombre@ejemplo.com.`);
        out[f.key] = s;
        break;
      }
      case "youtube": {
        const s = clean(raw, 500, false);
        const ok = f.kind === "lista" ? !!youtubePlaylistId(s) : !!youtubeVideoId(s);
        if (s && !ok) {
          errors.push(
            `${at}: no reconozco ese enlace de YouTube${f.kind === "lista" ? " (debe contener list=…)" : ""}.`,
          );
        }
        out[f.key] = s;
        break;
      }
      case "image": {
        const s = clean(raw, 2000, false);
        const ok = s === "" || /^\/(img|uploads)\/[\w.\-]+$/.test(s) || /^https:\/\/[^\s]+$/i.test(s);
        if (!ok) errors.push(`${at}: la foto no es válida; súbela de nuevo.`);
        out[f.key] = ok ? s : "";
        break;
      }
      case "strings": {
        const arr = Array.isArray(raw) ? raw : [];
        out[f.key] = arr
          .slice(0, 100)
          .map((x) => clean(x, f.multiline ? 1200 : 400, !!f.multiline))
          .filter(Boolean);
        break;
      }
      case "list": {
        const arr = Array.isArray(raw) ? raw : [];
        const max = f.max ?? 80;
        if (arr.length > max) errors.push(`${at}: máximo ${max} elementos.`);
        const items = arr.slice(0, max).map((it, i) => sanitizeFields(f.fields, it, `${at} (${f.itemLabel} ${i + 1})`, errors));
        out[f.key] = f.fixed ? items : items.filter((it) => !isEmpty(it));
        break;
      }
      case "group":
        out[f.key] = sanitizeFields(f.fields, raw, at, errors);
        break;
    }
  }
  return out;
}

export function sanitizeSection(key: SectionKey, input: unknown): { value?: unknown; errors: string[] } {
  const def = getEditor(key);
  if (!def) return { errors: ["Sección desconocida."] };
  const errors: string[] = [];
  const value = sanitizeFields(def.fields, input, def.title, errors);
  return errors.length ? { errors } : { value, errors };
}
