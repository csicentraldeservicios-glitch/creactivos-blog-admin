export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <main className="mx-auto max-w-sm p-6 pt-24">
      <h1 className="mb-6 text-2xl font-bold">Creactivos · Admin del blog</h1>
      <form action="/api/auth/login" method="post" className="space-y-4">
        <input
          name="password"
          type="password"
          required
          autoFocus
          placeholder="Contraseña"
          className="w-full rounded border border-zinc-300 p-2"
        />
        {error && <p className="text-sm text-red-600">Contraseña incorrecta.</p>}
        <button className="w-full rounded bg-black p-2 text-white">Entrar</button>
      </form>
    </main>
  );
}
