// Fotos subidas desde el panel: se guardan en DATA_DIR/uploads y se sirven desde /uploads/<nombre>.
import "server-only";
import crypto from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { dataDir } from "./content";

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
const NAME = /^[a-f0-9]{24}\.(jpg|png|webp|gif)$/;

export const uploadsDir = () => path.join(dataDir(), "uploads");

export const CONTENT_TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
};

/** Detecta el tipo real mirando los primeros bytes (no se confía en lo que diga el navegador). */
export function detectImageType(buf: Buffer): "jpg" | "png" | "webp" | "gif" | null {
  if (buf.length > 12 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpg";
  if (buf.length > 8 && buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "png";
  if (buf.length > 12 && buf.subarray(0, 4).toString("ascii") === "RIFF" && buf.subarray(8, 12).toString("ascii") === "WEBP") return "webp";
  if (buf.length > 6 && /^GIF8[79]a$/.test(buf.subarray(0, 6).toString("ascii"))) return "gif";
  return null;
}

export async function saveUpload(buf: Buffer): Promise<string> {
  const type = detectImageType(buf);
  if (!type) throw new Error("El archivo no es una foto válida (usa JPG, PNG, WEBP o GIF).");
  if (buf.length > MAX_UPLOAD_BYTES) throw new Error("La foto pesa más de 8 MB.");
  await fs.mkdir(uploadsDir(), { recursive: true });
  const name = `${crypto.randomBytes(12).toString("hex")}.${type}`;
  await fs.writeFile(path.join(uploadsDir(), name), buf, { flag: "wx" });
  return `/uploads/${name}`;
}

export function isValidUploadName(name: string): boolean {
  return NAME.test(name);
}

export async function readUpload(name: string): Promise<Buffer | null> {
  if (!isValidUploadName(name)) return null;
  try {
    return await fs.readFile(path.join(uploadsDir(), name));
  } catch {
    return null;
  }
}

/** Fotos que vienen con el sitio (public/img) y las subidas, para la biblioteca del panel. */
export async function listImages(): Promise<{ url: string; subida: boolean }[]> {
  const out: { url: string; subida: boolean }[] = [];
  try {
    const files = await fs.readdir(uploadsDir());
    const withTime = await Promise.all(
      files.filter((f) => NAME.test(f)).map(async (f) => ({ f, t: (await fs.stat(path.join(uploadsDir(), f))).mtimeMs })),
    );
    withTime.sort((a, b) => b.t - a.t).forEach(({ f }) => out.push({ url: `/uploads/${f}`, subida: true }));
  } catch {
    /* aún no hay subidas */
  }
  try {
    const files = await fs.readdir(path.join(process.cwd(), "public", "img"));
    files
      .filter((f) => /\.(jpe?g|png|webp|gif)$/i.test(f))
      .sort()
      .forEach((f) => out.push({ url: `/img/${f}`, subida: false }));
  } catch {
    /* sin fotos incluidas */
  }
  return out;
}
