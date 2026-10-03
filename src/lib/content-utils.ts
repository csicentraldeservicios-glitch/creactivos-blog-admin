// Utilidades puras (sirven en servidor y en el navegador).

/** Id de un video de YouTube a partir de un enlace (watch, youtu.be, embed, shorts) o del id suelto. */
export function youtubeVideoId(input: string): string | null {
  const s = input.trim();
  if (/^[\w-]{11}$/.test(s)) return s;
  try {
    const u = new URL(s);
    const host = u.hostname.replace(/^www\.|^m\./, "");
    if (host === "youtu.be") return /^[\w-]{11}$/.test(u.pathname.slice(1)) ? u.pathname.slice(1) : null;
    if (host === "youtube.com" || host === "youtube-nocookie.com") {
      const v = u.searchParams.get("v");
      if (v && /^[\w-]{11}$/.test(v)) return v;
      const m = u.pathname.match(/^\/(?:embed|shorts|live)\/([\w-]{11})/);
      if (m) return m[1];
    }
  } catch {
    /* no es una URL */
  }
  return null;
}

/** Id de una lista de reproducción de YouTube a partir de un enlace con ?list=… */
export function youtubePlaylistId(input: string): string | null {
  const s = input.trim();
  if (/^(PL|UU|OL|FL|RD)[\w-]{10,}$/.test(s)) return s;
  try {
    const u = new URL(s);
    const list = u.searchParams.get("list");
    if (list && /^[\w-]{10,}$/.test(list)) return list;
  } catch {
    /* no es una URL */
  }
  return null;
}

export function youtubeEmbedUrl(input: string): string | null {
  const list = youtubePlaylistId(input);
  const video = youtubeVideoId(input);
  if (video) return `https://www.youtube-nocookie.com/embed/${video}${list ? `?list=${list}` : ""}`;
  if (list) return `https://www.youtube-nocookie.com/embed/videoseries?list=${list}`;
  return null;
}

const digits = (s: string) => s.replace(/\D/g, "");

/** Enlace tel: a partir de un número escrito como "+57 316 258 2914". */
export function telHref(tel: string): string {
  const d = digits(tel);
  return d ? `tel:${tel.trim().startsWith("+") ? "+" : ""}${d}` : "";
}

/** Enlace de WhatsApp (solo si el número trae el indicativo de país con +). */
export function whatsappHref(tel: string): string {
  const d = digits(tel);
  return tel.trim().startsWith("+") && d.length >= 10 ? `https://wa.me/${d}` : "";
}

export const isExternal = (href: string) => /^https?:\/\//i.test(href);

/** Texto con saltos de línea → párrafos. */
export function paragraphs(text: string): string[] {
  return text
    .split(/\n{2,}|\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

/**
 * Ancho (en columnas de una rejilla de 6) de cada foto de la galería en pantallas grandes:
 * la primera grande, el resto de a tres, y la última fila se reparte para no dejar huecos.
 */
export function gallerySpan(i: number, n: number): 2 | 3 | 4 | 6 {
  if (n === 1) return 6;
  if (i === 0) return 4;
  if (i === 1) return 2;
  const m = n - 2; // fotos después de la primera fila
  const lastRowStart = 2 + Math.floor((m - 1) / 3) * 3;
  if (i >= lastRowStart) return (6 / (n - lastRowStart)) as 2 | 3 | 6;
  return 2;
}

/** En móvil (2 columnas): la primera foto a todo el ancho y, si sobra una suelta al final, también. */
export function galleryFullOnMobile(i: number, n: number): boolean {
  return i === 0 || (i === n - 1 && (n - 1) % 2 === 1);
}
