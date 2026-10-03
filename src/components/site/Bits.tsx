import Link from "next/link";
import { isExternal, paragraphs } from "@/lib/content-utils";

/** Enlace que abre en pestaña nueva si es externo y navega dentro del sitio si no. */
export function A({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  if (isExternal(href) || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} className={className} {...(isExternal(href) ? { target: "_blank", rel: "noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

/** Texto con saltos de línea: cada línea es un párrafo. */
export function Text({ text, className = "" }: { text: string; className?: string }) {
  const ps = paragraphs(text);
  if (!ps.length) return null;
  return (
    <>
      {ps.map((p, i) => (
        <p key={i} className={className}>
          {p}
        </p>
      ))}
    </>
  );
}

export const BTN = "inline-block rounded bg-[#E4162B] px-5 py-2 font-semibold text-black";
export const BTN_ALT = "inline-block rounded border-2 border-black px-5 py-2 font-semibold text-black";
