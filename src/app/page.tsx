import Link from "next/link";
import { isConnected, listPosts, BLOG_URL } from "@/lib/blogger";

export const dynamic = "force-dynamic";

const STATUS: Record<string, string> = {
  LIVE: "Publicada",
  DRAFT: "Borrador",
  SCHEDULED: "Programada",
};

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; deleted?: string }>;
}) {
  const { page, deleted } = await searchParams;
  let posts: Awaited<ReturnType<typeof listPosts>> | null = null;
  let error: string | null = null;

  if (isConnected()) {
    try {
      posts = await listPosts(page);
    } catch (e) {
      error = e instanceof Error ? e.message : "Error desconocido";
    }
  }

  return (
    <main className="mx-auto max-w-4xl space-y-6 p-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Creactivos Audiovisual · Blog</h1>
        <div className="flex items-center gap-3 text-sm">
          <a href={BLOG_URL} target="_blank" rel="noreferrer" className="underline">Ver blog</a>
          <Link href="/connect" className="underline">Conexión</Link>
          <Link href="/posts/new" className="rounded bg-black px-3 py-1.5 text-white">Nueva entrada</Link>
          <form action="/api/auth/logout" method="post">
            <button className="underline">Salir</button>
          </form>
        </div>
      </header>

      {deleted && <p className="rounded bg-green-50 p-2 text-green-800">Entrada eliminada.</p>}

      {!isConnected() && (
        <p className="rounded bg-amber-50 p-3">
          Blogger aún no está conectado. <Link href="/connect" className="underline">Conectar ahora</Link>.
        </p>
      )}
      {error && <p className="rounded bg-red-50 p-3 text-red-800">{error}</p>}

      {posts && (
        <>
          <ul className="divide-y rounded border border-zinc-200">
            {posts.posts.length === 0 && <li className="p-4 text-zinc-500">No hay entradas.</li>}
            {posts.posts.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-3 p-3">
                <Link href={`/posts/${p.id}`} className="font-medium hover:underline">
                  {p.title || "(sin título)"}
                </Link>
                <span className="shrink-0 text-xs text-zinc-500">
                  {STATUS[p.status ?? "LIVE"]} · {p.updated?.slice(0, 10)}
                </span>
              </li>
            ))}
          </ul>
          {posts.nextPageToken && (
            <Link href={`/?page=${encodeURIComponent(posts.nextPageToken)}`} className="underline">
              Siguientes →
            </Link>
          )}
        </>
      )}
    </main>
  );
}
