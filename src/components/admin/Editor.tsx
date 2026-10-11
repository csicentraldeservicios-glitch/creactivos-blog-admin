"use client";
/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import type { EditorDef, Field } from "@/lib/content-schema";
import { youtubePlaylistId, youtubeVideoId } from "@/lib/content-utils";

type Rec = Record<string, unknown>;

const uid = () => Math.random().toString(36).slice(2, 10);

function emptyItem(fields: Field[]): Rec {
  const o: Rec = {};
  for (const f of fields) {
    if (f.type === "strings" || f.type === "list") o[f.key] = [];
    else if (f.type === "group") o[f.key] = emptyItem(f.fields);
    else o[f.key] = "";
  }
  return o;
}

/** Da un identificador estable a cada elemento de lista (para que reordenar no mezcle los formularios). */
function withIds(fields: Field[], data: unknown): Rec {
  const src = (data && typeof data === "object" ? data : {}) as Rec;
  const out: Rec = { ...src };
  for (const f of fields) {
    if (f.type === "list") {
      const arr = Array.isArray(src[f.key]) ? (src[f.key] as unknown[]) : [];
      // Identificadores fijos (no aleatorios) para que servidor y navegador dibujen lo mismo al cargar.
      out[f.key] = arr.map((it, i) => ({ ...withIds(f.fields, it), __id: `i${i}` }));
    } else if (f.type === "group") {
      out[f.key] = withIds(f.fields, src[f.key]);
    }
  }
  return out;
}

/** Como withIds, pero conserva los identificadores que ya tenía el formulario (así no se pliegan los elementos al guardar). */
function carryIds(fields: Field[], fresh: unknown, old: Rec): Rec {
  const src = (fresh && typeof fresh === "object" ? fresh : {}) as Rec;
  const out: Rec = { ...src };
  for (const f of fields) {
    if (f.type === "list") {
      const arr = Array.isArray(src[f.key]) ? (src[f.key] as unknown[]) : [];
      const prev = Array.isArray(old[f.key]) ? (old[f.key] as Rec[]) : [];
      out[f.key] = arr.map((it, i) => ({ ...carryIds(f.fields, it, prev[i] ?? {}), __id: prev[i]?.__id ?? uid() }));
    } else if (f.type === "group") {
      out[f.key] = carryIds(f.fields, src[f.key], (old[f.key] ?? {}) as Rec);
    }
  }
  return out;
}

const INPUT =
  "w-full rounded border border-zinc-300 bg-white p-2.5 text-base focus:border-black focus:outline-none focus:ring-2 focus:ring-[#E4162B]/40";
const SMALL_BTN =
  "rounded border border-zinc-300 bg-white px-2.5 py-1 text-sm font-medium hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40";

function Label({ id, field }: { id: string; field: Field }) {
  return (
    <div className="mb-1">
      <label htmlFor={id} className="block text-sm font-semibold">
        {field.label}
      </label>
      {field.help && <p className="text-sm text-zinc-600">{field.help}</p>}
    </div>
  );
}

// --------------------------------------------------------------------------- fotos

function ImageField({ id, field, value, onChange }: { id: string; field: Field; value: string; onChange: (v: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [library, setLibrary] = useState<{ url: string; subida: boolean }[] | null>(null);
  const [open, setOpen] = useState(false);

  async function upload(file: File) {
    setBusy(true);
    setError("");
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "No se pudo subir la foto.");
      onChange(json.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo subir la foto.");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function openLibrary() {
    setOpen(true);
    if (library) return;
    try {
      const res = await fetch("/api/admin/images");
      const json = await res.json();
      setLibrary(json.images ?? []);
    } catch {
      setLibrary([]);
    }
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div>
      <Label id={id} field={field} />
      <div className="flex flex-wrap items-center gap-3">
        <div className="grid h-24 w-32 shrink-0 place-items-center overflow-hidden rounded border border-dashed border-zinc-300 bg-zinc-50 text-xs text-zinc-500">
          {value ? <img src={value} alt="" className="h-full w-full object-cover" /> : "Sin foto"}
        </div>
        <div className="flex flex-wrap gap-2">
          <input
            id={id}
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="sr-only"
            onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
          />
          <button type="button" className={SMALL_BTN} disabled={busy} onClick={() => fileRef.current?.click()}>
            {busy ? "Subiendo…" : value ? "Cambiar foto" : "Subir foto"}
          </button>
          <button type="button" className={SMALL_BTN} onClick={openLibrary}>
            Elegir de la biblioteca
          </button>
          {value && (
            <button type="button" className={SMALL_BTN} onClick={() => onChange("")}>
              Quitar
            </button>
          )}
        </div>
      </div>
      {error && (
        <p role="alert" className="mt-1 text-sm text-red-700">
          {error}
        </p>
      )}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Biblioteca de fotos"
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="max-h-[85vh] w-full max-w-3xl overflow-auto rounded-lg bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-bold">Biblioteca de fotos</h3>
              <button type="button" className={SMALL_BTN} onClick={() => setOpen(false)}>
                Cerrar
              </button>
            </div>
            {!library ? (
              <p>Cargando…</p>
            ) : library.length === 0 ? (
              <p>Aún no hay fotos. Sube una con «Subir foto».</p>
            ) : (
              <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {library.map((im) => (
                  <li key={im.url}>
                    <button
                      type="button"
                      onClick={() => {
                        onChange(im.url);
                        setOpen(false);
                      }}
                      className={`block aspect-[4/3] w-full overflow-hidden rounded border-2 ${im.url === value ? "border-[#E4162B]" : "border-transparent hover:border-zinc-400"}`}
                      title={im.subida ? "Subida desde el panel" : "Incluida con el sitio"}
                    >
                      <img src={im.url} alt="" loading="lazy" className="h-full w-full object-cover" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// --------------------------------------------------------------------------- campos

function FieldView({ field, value, onChange, id }: { field: Field; value: unknown; onChange: (v: unknown) => void; id: string }) {
  switch (field.type) {
    case "text":
      return (
        <div>
          <Label id={id} field={field} />
          {field.multiline ? (
            <textarea
              id={id}
              rows={4}
              maxLength={field.max}
              value={String(value ?? "")}
              placeholder={field.placeholder}
              onChange={(e) => onChange(e.target.value)}
              className={`${INPUT} resize-y leading-relaxed`}
            />
          ) : (
            <input
              id={id}
              type="text"
              maxLength={field.max}
              value={String(value ?? "")}
              placeholder={field.placeholder}
              onChange={(e) => onChange(e.target.value)}
              className={INPUT}
            />
          )}
        </div>
      );
    case "url":
    case "email":
      return (
        <div>
          <Label id={id} field={field} />
          <input
            id={id}
            type={field.type === "email" ? "email" : "text"}
            inputMode={field.type === "email" ? "email" : "url"}
            value={String(value ?? "")}
            placeholder={field.placeholder}
            onChange={(e) => onChange(e.target.value)}
            className={INPUT}
          />
        </div>
      );
    case "youtube": {
      const v = String(value ?? "").trim();
      const ok = field.kind === "lista" ? !!youtubePlaylistId(v) : !!youtubeVideoId(v);
      return (
        <div>
          <Label id={id} field={field} />
          <input
            id={id}
            type="text"
            inputMode="url"
            value={String(value ?? "")}
            placeholder={field.placeholder}
            onChange={(e) => onChange(e.target.value)}
            className={INPUT}
          />
          {v && (
            <p className={`mt-1 text-sm ${ok ? "text-green-700" : "text-red-700"}`}>
              {ok ? "✓ Enlace de YouTube reconocido" : "No reconozco este enlace de YouTube"}
            </p>
          )}
        </div>
      );
    }
    case "image":
      return <ImageField id={id} field={field} value={String(value ?? "")} onChange={onChange} />;
    case "strings":
      return <StringsField id={id} field={field} value={(Array.isArray(value) ? value : []) as string[]} onChange={onChange} />;
    case "list":
      return <ListField id={id} field={field} value={(Array.isArray(value) ? value : []) as Rec[]} onChange={onChange} />;
    case "group":
      return (
        <fieldset className="min-w-0 space-y-5 rounded-lg border border-zinc-200 p-4">
          <legend className="px-2 text-lg font-bold">{field.label}</legend>
          {field.help && <p className="-mt-2 text-sm text-zinc-600">{field.help}</p>}
          <Fields fields={field.fields} data={(value ?? {}) as Rec} onChange={(d) => onChange(d)} idPrefix={id} />
        </fieldset>
      );
  }
}

function Fields({ fields, data, onChange, idPrefix }: { fields: Field[]; data: Rec; onChange: (d: Rec) => void; idPrefix: string }) {
  return (
    <div className="space-y-5">
      {fields.map((f) => (
        <FieldView key={f.key} field={f} id={`${idPrefix}-${f.key}`} value={data[f.key]} onChange={(v) => onChange({ ...data, [f.key]: v })} />
      ))}
    </div>
  );
}

function StringsField({ id, field, value, onChange }: { id: string; field: Extract<Field, { type: "strings" }>; value: string[]; onChange: (v: string[]) => void }) {
  const set = (i: number, v: string) => onChange(value.map((x, j) => (j === i ? v : x)));
  const move = (i: number, d: number) => {
    const next = [...value];
    [next[i], next[i + d]] = [next[i + d], next[i]];
    onChange(next);
  };
  return (
    <div>
      <div className="mb-1">
        <p className="text-sm font-semibold">{field.label}</p>
        {field.help && <p className="text-sm text-zinc-600">{field.help}</p>}
      </div>
      <ul className="space-y-2">
        {value.map((s, i) => (
          <li key={i} className="flex items-start gap-2">
            {field.multiline ? (
              <textarea aria-label={`${field.itemLabel} ${i + 1}`} rows={2} value={s} onChange={(e) => set(i, e.target.value)} className={`${INPUT} resize-y`} />
            ) : (
              <input aria-label={`${field.itemLabel} ${i + 1}`} type="text" value={s} onChange={(e) => set(i, e.target.value)} className={INPUT} />
            )}
            <div className="flex shrink-0 gap-1">
              <button type="button" className={SMALL_BTN} aria-label="Subir" disabled={i === 0} onClick={() => move(i, -1)}>
                ↑
              </button>
              <button type="button" className={SMALL_BTN} aria-label="Bajar" disabled={i === value.length - 1} onClick={() => move(i, 1)}>
                ↓
              </button>
              <button type="button" className={SMALL_BTN} aria-label="Quitar" onClick={() => onChange(value.filter((_, j) => j !== i))}>
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button id={id} type="button" className={`${SMALL_BTN} mt-2`} onClick={() => onChange([...value, ""])}>
        + {field.addLabel}
      </button>
    </div>
  );
}

function ListField({ id, field, value, onChange }: { id: string; field: Extract<Field, { type: "list" }>; value: Rec[]; onChange: (v: Rec[]) => void }) {
  const [confirm, setConfirm] = useState<string | null>(null);
  // Qué elementos están abiertos. Por omisión, abiertos si la lista es corta; el elemento recién añadido se abre solo.
  const [opened, setOpened] = useState<Record<string, boolean>>({});
  const justAdded = useRef<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const max = field.max ?? 80;

  useEffect(() => {
    const id = justAdded.current;
    if (!id) return;
    justAdded.current = null;
    const li = listRef.current?.querySelector<HTMLElement>(`[data-item="${id}"]`);
    li?.scrollIntoView({ block: "center", behavior: "smooth" });
    li?.querySelector<HTMLElement>("input:not([type=file]), textarea")?.focus({ preventScroll: true });
  }, [value.length]);
  const move = (i: number, d: number) => {
    const next = [...value];
    [next[i], next[i + d]] = [next[i + d], next[i]];
    onChange(next);
  };
  return (
    <div>
      <div className="mb-2">
        <p className="text-base font-bold">{field.label}</p>
        {field.help && <p className="text-sm text-zinc-600">{field.help}</p>}
      </div>
      <ul ref={listRef} className="space-y-3">
        {value.map((item, i) => {
          const key = String(item.__id ?? i);
          const title = String(item[field.titleKey] ?? "").trim() || "(sin título)";
          return (
            <li key={key} data-item={key} className="rounded-lg border border-zinc-300 bg-zinc-50">
              <details
                open={opened[key] ?? value.length <= 3}
                onToggle={(e) => {
                  const isOpen = e.currentTarget.open;
                  setOpened((o) => (o[key] === isOpen ? o : { ...o, [key]: isOpen }));
                }}
              >
                <summary className="flex cursor-pointer flex-wrap items-center gap-2 p-3">
                  <span className="min-w-0 flex-1 truncate font-semibold">
                    {field.itemLabel} {i + 1}: <span className="font-normal">{title.length > 70 ? `${title.slice(0, 70)}…` : title}</span>
                  </span>
                  {!field.fixed && (
                    <span className="flex shrink-0 gap-1" onClick={(e) => e.preventDefault()}>
                      <button type="button" className={SMALL_BTN} aria-label="Subir" disabled={i === 0} onClick={() => move(i, -1)}>
                        ↑
                      </button>
                      <button type="button" className={SMALL_BTN} aria-label="Bajar" disabled={i === value.length - 1} onClick={() => move(i, 1)}>
                        ↓
                      </button>
                      {confirm === key ? (
                        <>
                          <button type="button" className="rounded bg-[#E4162B] px-2.5 py-1 text-sm font-semibold" onClick={() => { onChange(value.filter((_, j) => j !== i)); setConfirm(null); }}>
                            Sí, quitar
                          </button>
                          <button type="button" className={SMALL_BTN} onClick={() => setConfirm(null)}>
                            No
                          </button>
                        </>
                      ) : (
                        <button type="button" className={SMALL_BTN} onClick={() => setConfirm(key)}>
                          Quitar
                        </button>
                      )}
                    </span>
                  )}
                </summary>
                <div className="space-y-5 border-t border-zinc-200 bg-white p-4">
                  <Fields fields={field.fields} data={item} onChange={(d) => onChange(value.map((x, j) => (j === i ? { ...d, __id: item.__id } : x)))} idPrefix={`${id}-${key}`} />
                </div>
              </details>
            </li>
          );
        })}
        {value.length === 0 && <li className="rounded border border-dashed border-zinc-300 p-4 text-sm text-zinc-600">Todavía no hay elementos.</li>}
      </ul>
      {!field.fixed && (
        <button
          id={id}
          type="button"
          className={`${SMALL_BTN} mt-3 !border-black !font-semibold`}
          disabled={value.length >= max}
          onClick={() => {
            const __id = uid();
            justAdded.current = __id;
            setOpened((o) => ({ ...o, [__id]: true }));
            onChange([...value, { ...emptyItem(field.fields), __id }]);
          }}
        >
          + {field.addLabel}
        </button>
      )}
    </div>
  );
}

// --------------------------------------------------------------------------- editor

export function Editor({ def, initial }: { def: EditorDef; initial: unknown }) {
  const base = useId();
  const startData = useMemo(() => withIds(def.fields, initial), [def.fields, initial]);
  const [data, setData] = useState<Rec>(startData);
  const [savedSnapshot, setSavedSnapshot] = useState(() => JSON.stringify(stripIds(startData)));
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  const dirty = JSON.stringify(stripIds(data)) !== savedSnapshot;

  const save = useCallback(async () => {
    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch(`/api/admin/content/${def.key}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stripIds(data)),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "No se pudo guardar. Inténtalo de nuevo.");
      const fresh = carryIds(def.fields, json.value, data);
      setData(fresh);
      setSavedSnapshot(JSON.stringify(stripIds(fresh)));
      setStatus({ kind: "ok", text: "Cambios guardados. Ya se ven en el sitio." });
    } catch (e) {
      setStatus({ kind: "error", text: e instanceof Error ? e.message : "No se pudo guardar." });
    } finally {
      setSaving(false);
    }
  }, [data, def.fields, def.key]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        if (dirty && !saving) save();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dirty, saving, save]);

  useEffect(() => {
    if (!dirty) return;
    const onBefore = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", onBefore);
    return () => window.removeEventListener("beforeunload", onBefore);
  }, [dirty]);

  async function reset() {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/content/${def.key}`, { method: "DELETE" });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error ?? "No se pudo restaurar.");
      window.location.reload();
    } catch (e) {
      setStatus({ kind: "error", text: e instanceof Error ? e.message : "No se pudo restaurar." });
      setSaving(false);
      setConfirmReset(false);
    }
  }

  return (
    <div>
      <div className="sticky top-0 z-30 -mx-4 flex flex-wrap items-center gap-3 border-b border-zinc-200 bg-white/95 px-4 py-3 backdrop-blur">
        <button
          type="button"
          onClick={save}
          disabled={!dirty || saving}
          className="rounded bg-[#E4162B] px-5 py-2 font-semibold text-black disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-500"
        >
          {saving ? "Guardando…" : "Guardar cambios"}
        </button>
        <a href={def.viewPath} target="_blank" rel="noreferrer" className="text-sm underline">
          Ver en el sitio ↗
        </a>
        <span aria-live="polite" className="text-sm">
          {dirty ? <span className="text-amber-800">Hay cambios sin guardar</span> : status?.kind === "ok" ? <span className="text-green-700">✓ {status.text}</span> : null}
        </span>
      </div>
      {status?.kind === "error" && (
        <p role="alert" className="mt-4 rounded border border-red-200 bg-red-50 p-3 text-red-800">
          {status.text}
        </p>
      )}

      <div className="mt-6">
        <Fields fields={def.fields} data={data} onChange={setData} idPrefix={`f${base.replace(/:/g, "")}`} />
      </div>

      <div className="mt-10 border-t border-zinc-200 pt-6 text-sm">
        {confirmReset ? (
          <p className="flex flex-wrap items-center gap-2">
            Se perderán los cambios hechos en esta sección y volverá el contenido original.
            <button type="button" onClick={reset} disabled={saving} className="rounded bg-[#E4162B] px-3 py-1.5 font-semibold text-black">
              Sí, restaurar
            </button>
            <button type="button" className={SMALL_BTN} onClick={() => setConfirmReset(false)}>
              Cancelar
            </button>
          </p>
        ) : (
          <button type="button" className="underline" onClick={() => setConfirmReset(true)}>
            Volver al contenido original de esta sección
          </button>
        )}
      </div>
    </div>
  );
}

function stripIds(v: unknown): unknown {
  if (Array.isArray(v)) return v.map(stripIds);
  if (v && typeof v === "object") {
    const o: Rec = {};
    for (const [k, x] of Object.entries(v as Rec)) if (k !== "__id") o[k] = stripIds(x);
    return o;
  }
  return v;
}
