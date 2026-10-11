import { SiteShell } from "@/components/site/SiteShell";
import { getSection } from "@/lib/content";

// El contenido lo edita el administrador: nunca se congela en la compilación.
export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const contacto = await getSection("contacto");
  return <SiteShell contacto={contacto}>{children}</SiteShell>;
}
