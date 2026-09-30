// Estructura simplificada del blog y contenido reutilizable.
export const PLAYLIST_ID = "PLWhvPpqIWnf6tDrMQ6XnEHMGDPBfUd8nw";
export const PLAYLIST_URL = `https://www.youtube.com/playlist?list=${PLAYLIST_ID}`;

// HTML listo para pegar en una página/entrada de Blogger.
export const PLAYLIST_EMBED_HTML = `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden"><iframe src="https://www.youtube.com/embed/videoseries?list=${PLAYLIST_ID}" title="Sazón y Fogón" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`;

export const MENU = [
  {
    label: "Creactivos",
    href: "/preview",
    children: [
      { label: "Quiénes somos", href: "/preview#quienes-somos" },
      { label: "Noticias", href: "/preview#noticias" },
      { label: "Contacto", href: "/preview#contacto" },
    ],
  },
  { label: "Sazón y Fogón", href: "/preview/sazon-y-fogon" },
  { label: "Permanencia Esal", href: "/preview/permanencia-esal" },
] as const;
