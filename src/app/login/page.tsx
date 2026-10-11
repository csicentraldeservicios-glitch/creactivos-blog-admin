import Link from "next/link";

export const metadata = { title: "Entrar · Creactivos" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <main className="mx-auto w-full max-w-sm px-4 pt-24">
      <h1 className="mb-1 text-2xl font-bold">Administración del sitio</h1>
      <p className="mb-6 text-sm text-zinc-600">Creactivos Audiovisual</p>
      <form action="/api/auth/login" method="post" className="space-y-4">
        <label className="block text-sm font-semibold" htmlFor="password">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          className="w-full rounded border border-zinc-300 p-2.5"
        />
        {error === "config" && (
          <p role="alert" className="rounded bg-amber-50 p-2 text-sm text-amber-900">
            Al servidor le faltan las variables ADMIN_PASSWORD y ADMIN_SESSION_SECRET. Configúralas y vuelve a intentar.
          </p>
        )}
        {error === "wait" && (
          <p role="alert" className="rounded bg-amber-50 p-2 text-sm text-amber-900">
            Demasiados intentos fallidos. Espera unos minutos y vuelve a intentar.
          </p>
        )}
        {error === "1" && (
          <p role="alert" className="text-sm text-red-700">
            La contraseña no es correcta.
          </p>
        )}
        <button className="w-full rounded bg-[#E4162B] p-2.5 font-semibold text-black">Entrar</button>
      </form>
      <p className="mt-6 text-sm">
        <Link href="/" className="underline">
          ← Volver al sitio
        </Link>
      </p>
    </main>
  );
}
