import Image from "next/image";
import Link from "next/link";
import type { SiteContent } from "@/lib/content-types";
import { A } from "./Bits";

const MENU = [
  {
    label: "Creactivos",
    href: "/",
    children: [
      { label: "Quiénes somos", href: "/#quienes-somos" },
      { label: "Galería", href: "/#galeria" },
      { label: "Noticias", href: "/#noticias" },
      { label: "CreA Cine Infantil", href: "/crea-cine-infantil" },
      { label: "Minas de Salento", href: "/minas-de-salento" },
      { label: "Ruta", href: "/ruta" },
      { label: "Contacto", href: "/#contacto" },
    ],
  },
  { label: "Sazón y Fogón", href: "/sazon-y-fogon" },
  { label: "Permanencia Esal", href: "/permanencia-esal" },
];

export function SiteShell({ contacto, children }: { contacto: SiteContent["contacto"]; children: React.ReactNode }) {
  const links: [string, string][] = [
    ["Facebook", contacto.facebook],
    ["YouTube", contacto.youtube],
    ["E-mail", contacto.email ? `mailto:${contacto.email}` : ""],
    ["Buy Me a Coffee", contacto.buymeacoffee],
    ["Patreon", contacto.patreon],
  ];
  return (
    <div className="min-h-screen bg-white text-black">
      <header className="border-b-4 border-[#E4162B]">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-3">
          <Link href="/" aria-label="Creactivos, inicio">
            <Image src="/img/logo.jpg" alt="Creactivos" width={140} height={104} priority />
          </Link>
          <nav aria-label="Principal" className="flex flex-wrap items-center gap-x-6 text-lg font-semibold">
            {MENU.map((item) => (
              <div key={item.label} className="group relative">
                <Link href={item.href} className="block py-2 hover:underline">
                  {item.label}
                  {item.children && " ▾"}
                </Link>
                {item.children && (
                  <div className="invisible absolute left-0 top-full z-10 min-w-48 rounded border border-zinc-200 bg-white py-1 text-base font-normal shadow-lg group-focus-within:visible group-hover:visible">
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
      <footer className="mt-16 border-t-4 border-[#E4162B] py-6 text-center text-sm">
        <p>© Creactivos · Cine y formación ambiental</p>
        <p className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1">
          {links
            .filter(([, href]) => href)
            .map(([label, href]) => (
              <A key={label} href={href} className="underline">
                {label}
              </A>
            ))}
        </p>
        <p className="mt-3">
          <Link href="/login" className="text-xs text-zinc-500 underline">
            Administrar
          </Link>
        </p>
      </footer>
    </div>
  );
}
