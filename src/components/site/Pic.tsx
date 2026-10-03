/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

/**
 * Foto que llena su contenedor (el contenedor debe ser `relative` y tener alto).
 * Las fotos del sitio y las subidas desde el panel usan el optimizador de Next;
 * un enlace externo (https://…) se muestra tal cual para no depender de dominios autorizados.
 */
export function Pic({
  src,
  alt,
  sizes = "100vw",
  priority,
  className = "",
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  if (!src) return null;
  if (/^https?:\/\//i.test(src)) {
    return (
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        referrerPolicy="no-referrer"
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
      />
    );
  }
  return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${className}`} />;
}
