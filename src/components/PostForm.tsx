import type { BloggerPost } from "@/lib/blogger";

export function PostForm({ action, post }: { action: string; post?: BloggerPost }) {
  const isNew = !post;
  return (
    <form action={action} method="post" className="space-y-4">
      <input
        name="title"
        required
        defaultValue={post?.title}
        placeholder="Título"
        className="w-full rounded border border-zinc-300 p-2 text-lg"
      />
      <textarea
        name="content"
        rows={20}
        defaultValue={post?.content}
        placeholder="Contenido (HTML)"
        className="w-full rounded border border-zinc-300 p-2 font-mono text-sm"
      />
      <input
        name="labels"
        defaultValue={post?.labels?.join(", ")}
        placeholder="Etiquetas separadas por coma"
        className="w-full rounded border border-zinc-300 p-2"
      />
      <div className="flex gap-3">
        {isNew ? (
          <>
            <button name="intent" value="draft" className="rounded border border-black px-4 py-2">
              Guardar borrador
            </button>
            <button name="intent" value="publish" className="rounded bg-black px-4 py-2 text-white">
              Publicar
            </button>
          </>
        ) : (
          <button className="rounded bg-black px-4 py-2 text-white">Guardar cambios</button>
        )}
      </div>
    </form>
  );
}
