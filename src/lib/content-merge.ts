// Fusión del contenido guardado con los valores originales. Pura: la usan la app y el script de exportación.
import { DEFAULT_CONTENT } from "./content-defaults";
import type { SectionKey, SiteContent } from "./content-types";

/** Completa con los valores originales lo que falte en lo guardado (campos nuevos de futuras versiones). */
function fill<T>(def: T, stored: unknown): T {
  if (Array.isArray(def)) return (Array.isArray(stored) ? stored : def) as T;
  if (def && typeof def === "object") {
    const s = stored && typeof stored === "object" && !Array.isArray(stored) ? (stored as Record<string, unknown>) : {};
    const out: Record<string, unknown> = {};
    for (const k of Object.keys(def)) out[k] = fill((def as Record<string, unknown>)[k], s[k]);
    return out as T;
  }
  return (typeof stored === typeof def ? stored : def) as T;
}

export function mergeWithDefaults(stored: unknown): SiteContent {
  const s = (stored && typeof stored === "object" && !Array.isArray(stored) ? stored : {}) as Record<string, unknown>;
  const out = {} as Record<string, unknown>;
  for (const k of Object.keys(DEFAULT_CONTENT) as SectionKey[]) out[k] = fill(DEFAULT_CONTENT[k], s[k]);
  return out as unknown as SiteContent;
}
