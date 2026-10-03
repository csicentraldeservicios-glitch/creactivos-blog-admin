import Link from "next/link";
import { isConnected } from "@/lib/blogger";

const ERRORS: Record<string, string> = {
  "1": "La autorización no es válida. Inténtalo de nuevo.",
  norefresh: "Google no devolvió refresh token. Revoca el acceso en tu cuenta de Google y reconecta.",
  exchange: "No se pudo canjear el código de Google. Revisa Client ID/Secret y la redirect URI.",
};

export default async function ConnectPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <main className="mx-auto max-w-xl space-y-4 p-6">
      <h1 className="text-2xl font-bold">Conectar Blogger</h1>
      <p>
        Estado:{" "}
        {isConnected() ? "conectado (hay refresh token configurado)" : "sin conectar"}
      </p>
      {error && <p className="text-red-600">{ERRORS[error] ?? "Error al conectar."}</p>}
      <p className="text-sm text-zinc-600">
        Inicia sesión con la cuenta de Google dueña del blog. Al terminar verás un
        <code> BLOGGER_REFRESH_TOKEN </code> para pegar en tu <code>.env</code>.
      </p>
      <a href="/api/blogger/connect" className="inline-block rounded bg-black px-4 py-2 text-white">
        Conectar con Google
      </a>
      <p><Link href="/blogger" className="text-sm underline">Volver</Link></p>
    </main>
  );
}
