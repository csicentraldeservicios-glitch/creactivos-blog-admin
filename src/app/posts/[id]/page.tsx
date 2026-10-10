import Link from "next/link";
import { getPost } from "@/lib/blogger";
import { PostForm } from "@/components/PostForm";

export const dynamic = "force-dynamic";

export default async function EditPost({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { id } = await params;
  const { saved, error } = await searchParams;
  const post = await getPost(id);
  const isLive = post.status === "LIVE";

  return (
    <main className="mx-auto max-w-4xl space-y-4 p-6">
      <Link href="/blogger" className="text-sm underline">← Volver</Link>
      <h1 className="text-2xl font-bold">Editar entrada</h1>
      <p className="text-sm text-zinc-600">
        Estado: {post.status}
        {post.url && isLive && (
          <> · <a href={post.url} target="_blank" rel="noreferrer" className="underline">ver</a></>
        )}
      </p>
      {saved && <p className="rounded bg-green-50 p-2 text-green-800">Guardado.</p>}
      {error && <p className="rounded bg-red-50 p-2 text-red-800">La operación falló.</p>}

      <PostForm action={`/api/posts/${id}`} post={post} />

      <div className="flex gap-3 border-t pt-4">
        <form action={`/api/posts/${id}/status`} method="post">
          <input type="hidden" name="action" value={isLive ? "revert" : "publish"} />
          <button className="rounded border border-black px-4 py-2">
            {isLive ? "Pasar a borrador" : "Publicar"}
          </button>
        </form>
        <form action={`/api/posts/${id}/delete`} method="post">
          <button className="rounded border border-red-600 px-4 py-2 text-red-600">Eliminar</button>
        </form>
      </div>
    </main>
  );
}
