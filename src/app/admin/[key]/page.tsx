import Link from "next/link";
import { notFound } from "next/navigation";
import { Editor } from "@/components/admin/Editor";
import { getSection } from "@/lib/content";
import { getEditor } from "@/lib/content-schema";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  return { title: getEditor(key)?.title ?? "Sección" };
}

export default async function EditPage({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const def = getEditor(key);
  if (!def) notFound();
  const data = await getSection(def.key);
  return (
    <main>
      <Link href="/admin" className="text-sm underline">
        ← Todas las secciones
      </Link>
      <h1 className="mt-2 text-3xl font-bold">{def.title}</h1>
      <p className="mb-4 mt-1 text-zinc-700">{def.description}</p>
      <Editor def={def} initial={data} />
    </main>
  );
}
