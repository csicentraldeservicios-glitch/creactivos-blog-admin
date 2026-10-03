// Contenido inicial del sitio. Se usa la primera vez y para cualquier sección que aún no se haya editado.
import { APOYO, CONTACTO, EJES, MISION, PROPOSITO, SAZON, SERVICIOS, VALORES } from "./site";
import { CREA_CINE, ESAL, MINAS, NOTICIAS, PORTAFOLIO, RUTA } from "./blog-content";
import type { SiteContent } from "./content-types";

export const DEFAULT_CONTENT: SiteContent = {
  portada: {
    eyebrow: "Asociación CreActivos Audiovisual",
    titulo: "Cine y formación ambiental",
    texto:
      "Profesionales de la comunicación que desarrollan productos culturales, educativos y socioambientales.",
    boton1Texto: "Conoce Minas de Salento",
    boton1Enlace: "/minas-de-salento",
    boton2Texto: "Ver Sazón y Fogón",
    boton2Enlace: "/sazon-y-fogon",
    tiles: [
      { imagen: "/img/portada-palma.jpg", texto: "Minas de Salento", enlace: "/minas-de-salento" },
      { imagen: "/img/proyector.jpg", texto: "Memoria audiovisual", enlace: "/#quienes-somos" },
      { imagen: "/img/sazon-logo.jpg", texto: "Sazón y Fogón", enlace: "/sazon-y-fogon" },
    ],
  },
  quienes: {
    ejes: [...EJES],
    proposito: PROPOSITO,
    mision: MISION,
    valores: VALORES.map((v) => ({ titulo: v.titulo, texto: v.texto })),
    portafolio: {
      proposito: PORTAFOLIO.proposito,
      certificado: PORTAFOLIO.certificado,
      areas: PORTAFOLIO.areas.map((a) => ({ titulo: a.titulo, texto: a.texto })),
    },
    servicios: SERVICIOS.map((s) => ({
      titulo: s.titulo,
      descripcion: s.descripcion,
      ejemplo: s.ejemplo ?? "",
      diferencial: s.diferencial ?? "",
      entregables: s.entregables,
      imagen: s.imagen ?? "",
      imagen2: s.imagen2 ?? "",
    })),
  },
  galeria: {
    items: [
      { imagen: "/img/galeria-musicos.jpg", texto: "Músicos con violín y guitarras bajo un árbol grande" },
      { imagen: "/img/galeria-bellotas.jpg", texto: "Bellotas verdes sobre hojarasca" },
      { imagen: "/img/sazon-cocinera.jpg", texto: "Cocinera con pañoleta rosada sostiene una bandeja de masa en bolitas" },
      { imagen: "/img/sazon-empanadas.jpg", texto: "Empanadas fritas alrededor de un pocillo de barro con ají verde" },
      { imagen: "/img/galeria-paramo.jpg", texto: "Laguna de páramo entre montañas y niebla" },
      { imagen: "/img/sazon-abuela.jpg", texto: "Cocinera mayor con gafas sostiene una cuchara de palo en su cocina" },
      { imagen: "/img/galeria-flor.jpg", texto: "Flor naranja de pétalos tubulares" },
      { imagen: "/img/galeria-rosa.jpg", texto: "Rosa roja con gotas de lluvia entre la niebla" },
    ],
  },
  noticias: {
    items: NOTICIAS.map((n) => ({ fecha: n.fecha, titulo: n.titulo, texto: n.texto })),
  },
  contacto: {
    email: CONTACTO.email,
    telefono: "+57 316 258 2914",
    facebook: CONTACTO.facebook,
    youtube: CONTACTO.youtube,
    ciudad: "",
    buymeacoffee: APOYO.buymeacoffee,
    patreon: APOYO.patreon,
  },
  sazon: {
    titulo: "Sazón y Fogón",
    descripcion: SAZON.descripcion,
    impacto: SAZON.impacto,
    logo: "/img/sazon-logo.jpg",
    lista: "https://www.youtube.com/playlist?list=PLWhvPpqIWnf6tDrMQ6XnEHMGDPBfUd8nw",
    fotosTitulo: "Cocina tradicional",
    fotos: [
      { imagen: "/img/sazon-cocinera.jpg", texto: "Cocinera con pañoleta rosada sostiene una bandeja de masa en bolitas" },
      { imagen: "/img/sazon-empanadas.jpg", texto: "Empanadas fritas alrededor de un pocillo de barro con ají verde" },
      { imagen: "/img/sazon-abuela.jpg", texto: "Cocinera mayor con gafas sostiene una cuchara de palo en su cocina" },
    ],
  },
  crea: {
    titulo: CREA_CINE.titulo,
    intro: CREA_CINE.intro,
    datos: CREA_CINE.datos.map(([etiqueta, valor]) => ({ etiqueta, valor })),
    apoyanTitulo: "Con el apoyo de",
    apoyan: [...CREA_CINE.apoyan],
  },
  minas: {
    titulo: "Minas de Salento",
    lema: MINAS.lema,
    descripcion: MINAS.descripcion,
    video: `https://youtu.be/${MINAS.videoId}`,
    teaser: MINAS.teaserUrl,
    imagenes: [
      { imagen: "/img/minas-afiche.jpg", texto: "Afiche de Minas de Salento" },
      { imagen: "/img/minas-foto-1.jpg", texto: "Fotografía 1 de Minas de Salento" },
      { imagen: "/img/minas-foto-2.jpg", texto: "Fotografía 2 de Minas de Salento" },
      { imagen: "/img/minas-foto-3.jpg", texto: "Fotografía 3 de Minas de Salento" },
    ],
  },
  ruta: {
    titulo: RUTA.titulo,
    intro: RUTA.intro,
    festivalesTitulo: "Festivales, muestras y talleres",
    festivales: [...RUTA.festivales],
    reconocimiento: RUTA.reconocimiento,
    nota: RUTA.nota,
    documentales: RUTA.documentales.map((d) => ({ titulo: d.titulo, director: d.director, url: d.url })),
    videos: RUTA.videos.map((v) => ({ titulo: v.titulo, url: v.url })),
  },
  esal: {
    titulo: "Permanencia ESAL",
    intro: "Documentos de la Asociación CreActivos Audiovisual (NIT 900411102-1), organizados por año.",
    anios: ESAL.map((y) => ({
      anio: y.anio,
      documentos: y.docs.map((d) => ({ titulo: d.titulo, url: d.url })),
    })),
  },
};
