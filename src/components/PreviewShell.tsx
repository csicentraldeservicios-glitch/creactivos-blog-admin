import Image from "next/image";
import Link from "next/link";
import { APOYO, CONTACTO, MENU } from "@/lib/site";

export function PreviewShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="bg-amber-100 px-4 py-1.5 text-center text-xs text-black">
        Vista previa · «ejemplo» y «por definir» son provisionales
      </div>
      <header className="border-b-4 border-[#E4162B]">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-3">
          <Link href="/preview" aria-label="Creactivos, inicio">
            <Image src="/img/logo.jpg" alt="Creactivos" width={140} height={104} priority />
          </Link>
          <nav className="flex items-center gap-6 text-lg font-semibold">
            {MENU.map((item) => (
              <div key={item.label} className="group relative">
                <Link href={item.href} className="py-2 hover:underline">
                  {item.label}
                  {"children" in item && " ▾"}
                </Link>
                {"children" in item && (
                  <div className="invisible absolute left-0 top-full z-10 min-w-44 rounded border border-zinc-200 bg-white py-1 text-base font-normal shadow-lg group-focus-within:visible group-hover:visible">
                    {item.children.map((c) => (
                      <Link key={c.label} href={c.href} className="block px-4 py-2 hover:bg-zinc-100">
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </header>
      {children}
      <footer className="mt-16 border-t-4 border-[#E4162B] py-6 text-center text-sm text-black">
        <p>© Creactivos · Cine y formación ambiental</p>
        <p className="mt-2 space-x-4">
          <a href={CONTACTO.facebook} target="_blank" rel="noreferrer" className="underline">Facebook</a>
          <a href={CONTACTO.youtube} target="_blank" rel="noreferrer" className="underline">YouTube</a>
          <a href={`mailto:${CONTACTO.email}`} className="underline">E-mail</a>
          <a href={APOYO.buymeacoffee} target="_blank" rel="noreferrer" className="underline">Buy Me a Coffee</a>
          <a href={APOYO.patreon} target="_blank" rel="noreferrer" className="underline">Patreon</a>
        </p>
      </footer>
    </div>
  );
}
