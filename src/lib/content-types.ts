// Forma del contenido editable del sitio. Los valores iniciales están en content-defaults.ts
// y el formulario del panel (campos, etiquetas, validación) en content-schema.ts.

export interface Foto {
  imagen: string;
  texto: string;
}

export interface SiteContent {
  portada: {
    eyebrow: string;
    titulo: string;
    texto: string;
    boton1Texto: string;
    boton1Enlace: string;
    boton2Texto: string;
    boton2Enlace: string;
    tiles: { imagen: string; texto: string; enlace: string }[];
  };
  quienes: {
    ejes: string[];
    proposito: string;
    mision: string;
    valores: { titulo: string; texto: string }[];
    portafolio: {
      proposito: string;
      certificado: string;
      areas: { titulo: string; texto: string }[];
    };
    servicios: {
      titulo: string;
      descripcion: string;
      ejemplo: string;
      diferencial: string;
      entregables: string;
      imagen: string;
      imagen2: string;
    }[];
  };
  galeria: { items: Foto[] };
  noticias: { items: { fecha: string; titulo: string; texto: string }[] };
  contacto: {
    email: string;
    telefono: string;
    facebook: string;
    youtube: string;
    ciudad: string;
    buymeacoffee: string;
    patreon: string;
  };
  sazon: {
    titulo: string;
    descripcion: string;
    impacto: string;
    logo: string;
    lista: string;
    fotosTitulo: string;
    fotos: Foto[];
  };
  crea: {
    titulo: string;
    intro: string;
    datos: { etiqueta: string; valor: string }[];
    apoyanTitulo: string;
    apoyan: string[];
  };
  minas: {
    titulo: string;
    lema: string;
    descripcion: string;
    video: string;
    teaser: string;
    imagenes: Foto[];
  };
  ruta: {
    titulo: string;
    intro: string;
    festivalesTitulo: string;
    festivales: string[];
    reconocimiento: string;
    nota: string;
    documentales: { titulo: string; director: string; url: string }[];
    videos: { titulo: string; url: string }[];
  };
  esal: {
    titulo: string;
    intro: string;
    anios: { anio: string; documentos: { titulo: string; url: string }[] }[];
  };
}

export type SectionKey = keyof SiteContent;
