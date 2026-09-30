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

// Contenido tomado de «CreActivos Audiovisual · resumen y productos».
export const EJES = ["Patrimonio", "Formación", "Ambiental"];

export const PROPOSITO =
  "Recuperar la memoria histórica y fortalecer la identidad de las comunidades, empoderándolas para que sean las protagonistas de su propia narrativa, desarrollo social y recuperación cultural.";

export const MISION =
  "Somos un equipo de profesionales de la comunicación que crea productos culturales, educativos y socioambientales. Integramos la enseñanza pedagógica en cada etapa del proceso audiovisual (investigación, preproducción, producción, posproducción, exhibición y distribución), generando herramientas que motivan el reconocimiento y la interconexión comunitaria.";

export const VALORES = [
  {
    titulo: "Protagonismo de las voces",
    texto:
      "Las personas y sus relatos son el centro de cada proyecto. No hablamos por ellos, amplificamos su propia voz.",
  },
  {
    titulo: "Rigor con sensibilidad",
    texto:
      "Toda producción nace de una investigación previa sólida y de un manejo ético y respetuoso del patrimonio (material e inmaterial).",
  },
  {
    titulo: "Conexión en red",
    texto:
      "Creemos en el poder de las alianzas. Visibilizamos y conectamos el esfuerzo de las comunidades con redes más amplias para garantizar impacto y continuidad.",
  },
  {
    titulo: "Innovación con propósito",
    texto:
      "Adoptamos la tecnología y la innovación no como un fin en sí mismo, sino como herramientas al servicio de la preservación, la formación y la difusión de la memoria.",
  },
];

export interface Servicio {
  titulo: string;
  descripcion: string;
  entregables: string;
  ejemplo?: string;
  diferencial?: string;
  imagen?: string;
  imagen2?: string;
}

export const SERVICIOS: Servicio[] = [
  {
    titulo: "Producción de series y documentales patrimoniales",
    imagen: "/img/sazon-afiche.png",
    descripcion:
      "Creación de contenido audiovisual de alta calidad que rescata y visibiliza el patrimonio material e inmaterial, con un enfoque narrativo que conecta la identidad local con nuevas audiencias.",
    ejemplo:
      "Serie «Sazón y Fogón» (rescate del patrimonio gastronómico local para promover la identidad y el turismo).",
    entregables:
      "Serie o documental, versiones adaptadas para redes sociales y material de apoyo (making of, fotografías).",
  },
  {
    titulo: "Talleres pedagógicos de expresión audiovisual",
    descripcion:
      "Programas de formación práctica diseñados para empoderar a niños, jóvenes y adultos (en contextos rurales y urbanos), utilizando el lenguaje audiovisual como una herramienta de expresión, reconocimiento identitario y transformación social.",
    diferencial:
      "No solo enseñamos técnica; facilitamos que la comunidad cuente su propia historia con sus propios medios.",
    entregables:
      "Ejecución del taller (presencial o híbrido), piezas audiovisuales creadas por los participantes e informe de impacto pedagógico o certificados de participación.",
  },
  {
    titulo: "Investigación, digitalización y rescate de memoria audiovisual",
    imagen: "/img/archivo-filmico.png",
    imagen2: "/img/proyector.jpg",
    descripcion:
      "Servicio especializado de recuperación de memoria histórica con enfoque ambiental y científico. Incluye restauración y limpieza de dispositivos, digitalización profesional, catalogación y análisis de material en formatos obsoletos (fotografías, filmes, cintas de video) para preservar su contenido y hacerlo accesible para la investigación futura.",
    diferencial:
      "Combinamos la preservación técnica con el análisis de contenido, convirtiendo archivos inertes en fuentes activas de conocimiento.",
    entregables:
      "Archivo digital organizado y respaldado, informe técnico de digitalización y/o un producto audiovisual curado (ej. un minidocumental o exposición virtual) a partir del material rescatado.",
  },
];

export const SAZON = {
  descripcion:
    "Serie audiovisual documental con enfoque al patrimonio gastronómico local e inmaterial.",
  impacto:
    "Promoción de la identidad cultural y activación del turismo local, dando voz a los guardianes de la tradición culinaria.",
};

export const CONTACTO = {
  email: "creactivosaudiovisual@gmail.com",
  telefono: "(057) 3162582914",
  telefonoTel: "+573162582914",
  whatsapp: "https://wa.me/573162582914",
  facebook: "https://www.facebook.com/CreActivosAudiovisual",
  youtube: "https://www.youtube.com/@CreActivosAudiovisual",
};
