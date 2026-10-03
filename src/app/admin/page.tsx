import Link from "next/link";
import { persistentStorageMissing } from "@/lib/content";
import { EDITORS } from "@/lib/content-schema";

export default function AdminHome() {
  return (
    <main>
      {persistentStorageMissing() && (
        <p role="alert" className="mb-6 rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          <b>Atención:</b> el servidor no tiene un volumen de almacenamiento. Los cambios y las fotos que subas se
          borrarán en el próximo despliegue. Agrega un volumen en Railway (ver RAILWAY.md).
        </p>
      )}
      <h1 className="text-3xl font-bold">¿Qué quieres cambiar?</h1>
      <p className="mt-2 text-zinc-700">
        Elige una sección, haz tus cambios y pulsa <b>Guardar cambios</b>. Se publican al instante en el sitio.
      </p>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {EDITORS.map((e) => (
          <li key={e.key}>
            <Link
              href={`/admin/${e.key}`}
              className="block h-full rounded-lg border border-zinc-300 p-4 transition hover:border-black hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E4162B]"
            >
              <span className="block text-lg font-bold">{e.title}</span>
              <span className="mt-1 block text-sm text-zinc-700">{e.description}</span>
              <span className="mt-3 inline-block text-sm font-semibold underline">Editar →</span>
            </Link>
          </li>
        ))}
      </ul>

      <section className="mt-10 rounded-lg bg-zinc-50 p-4 text-sm">
        <h2 className="font-bold">Otras herramientas</h2>
        <p className="mt-1">
          <Link href="/blogger" className="underline">
            Entradas del blog en Blogger
          </Link>{" "}
          · para quienes también publican en creactivosaudiovisual.blogspot.com.
        </p>
      </section>
    </main>
  );
}
