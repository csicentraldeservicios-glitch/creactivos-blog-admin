// Almacenamiento del contenido editable: un archivo JSON dentro de DATA_DIR.
// En Railway, DATA_DIR debe apuntar al volumen persistente (por ejemplo /data).
import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { mergeWithDefaults } from "./content-merge";
import type { SectionKey, SiteContent } from "./content-types";

export function dataDir(): string {
  // La carpeta se decide al arrancar; no hay que empaquetarla con el código.
  // DATA_DIR manda; si no existe, se usa el volumen que Railway monta (RAILWAY_VOLUME_MOUNT_PATH).
  const dir = process.env.DATA_DIR ?? process.env.RAILWAY_VOLUME_MOUNT_PATH ?? "./data";
  return path.resolve(/*turbopackIgnore: true*/ dir);
}

/** true si el sitio corre en Railway sin un volumen: los cambios se perderían en el siguiente despliegue. */
export function persistentStorageMissing(): boolean {
  return !!process.env.RAILWAY_ENVIRONMENT && !process.env.DATA_DIR && !process.env.RAILWAY_VOLUME_MOUNT_PATH;
}
const contentFile = () => path.join(dataDir(), "content.json");
const backupsDir = () => path.join(dataDir(), "backups");
const MAX_BYTES = 2 * 1024 * 1024;
const KEEP_BACKUPS = 30;

type Stored = Partial<Record<SectionKey, unknown>>;

async function readStored(): Promise<Stored> {
  try {
    const parsed = JSON.parse(await fs.readFile(contentFile(), "utf8"));
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? (parsed as Stored) : {};
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return {};
    // Archivo dañado: se conserva una copia para recuperarlo y se parte de los textos originales.
    console.error("content.json no se pudo leer; se usan los textos originales.", e);
    return {};
  }
}

export async function getContent(): Promise<SiteContent> {
  return mergeWithDefaults(await readStored());
}

export async function getSection<K extends SectionKey>(key: K): Promise<SiteContent[K]> {
  return (await getContent())[key];
}

// Las escrituras se hacen de una en una para no pisarse.
let queue: Promise<unknown> = Promise.resolve();

function writeStored(mutate: (s: Stored) => void): Promise<void> {
  const run = async () => {
    await fs.mkdir(dataDir(), { recursive: true });
    const stored = await readStored();
    mutate(stored);
    const json = JSON.stringify(stored, null, 2);
    if (Buffer.byteLength(json) > MAX_BYTES) throw new Error("El contenido es demasiado grande (máximo 2 MB).");

    // Respaldo del estado anterior.
    try {
      const prev = await fs.readFile(contentFile(), "utf8");
      await fs.mkdir(backupsDir(), { recursive: true });
      await fs.writeFile(path.join(backupsDir(), `content-${new Date().toISOString().replace(/[:.]/g, "-")}.json`), prev);
      const files = (await fs.readdir(backupsDir())).filter((f) => f.startsWith("content-")).sort();
      for (const old of files.slice(0, Math.max(0, files.length - KEEP_BACKUPS))) {
        await fs.rm(path.join(backupsDir(), old), { force: true });
      }
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code !== "ENOENT") console.error("No se pudo crear el respaldo.", e);
    }

    // Escritura atómica: archivo temporal y renombrado.
    const tmp = `${contentFile()}.${process.pid}.tmp`;
    await fs.writeFile(tmp, json);
    await fs.rename(tmp, contentFile());
  };
  const next = queue.then(run, run);
  queue = next.catch(() => undefined);
  return next;
}

export function saveSection(key: SectionKey, value: unknown): Promise<void> {
  return writeStored((s) => {
    s[key] = value;
  });
}

/** Vuelve una sección a los textos originales. */
export function resetSection(key: SectionKey): Promise<void> {
  return writeStored((s) => {
    delete s[key];
  });
}
