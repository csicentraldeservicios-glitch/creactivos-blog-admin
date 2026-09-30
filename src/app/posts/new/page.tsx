import Link from "next/link";
import { PostForm } from "@/components/PostForm";

export default async function NewPost({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <main className="mx-auto max-w-4xl space-y-4 p-6">
      <Link href="/" className="text-sm underline">← Volver</Link>
      <h1 className="text-2xl font-bold">Nueva entrada</h1>
      {error && <p className="text-red-600">No se pudo guardar la entrada.</p>}
      <PostForm action="/api/posts" />
    </main>
  );
}
