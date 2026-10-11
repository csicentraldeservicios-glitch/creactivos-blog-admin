import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { default: "Administración", template: "%s · Administración" },
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-black">
      <header className="border-b-4 border-[#E4162B]">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <Link href="/admin" className="text-lg font-bold">
            Administración · Creactivos
          </Link>
          <nav className="flex flex-wrap items-center gap-4 text-sm">
            <a href="/" target="_blank" rel="noreferrer" className="underline">
              Ver el sitio ↗
            </a>
            <form action="/api/auth/logout" method="post">
              <button className="underline">Salir</button>
            </form>
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-6">{children}</div>
    </div>
  );
}
