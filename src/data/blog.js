// Fuente de verdad de los articulos del blog.
//
// Antes esta lista vivia dentro de src/pages/blog/index.astro y cada post
// quedaba enlazado solo desde el indice (2-4 enlaces internos entrantes).
// Ahora la consumen el indice y el bloque "Sigue leyendo" del final de cada
// articulo (src/components/BlogRelacionados.astro).
export const articulos = [
  {
    slug: 'producir-podcast-profesional-santiago',
    title: 'Cómo producir un podcast profesional en Santiago: audio, video y estudio',
    excerpt: 'Qué se necesita para producir un podcast profesional en Santiago: audio vs video podcast, estudio o set móvil, qué pedirle a la productora, proceso y cuánto cuesta. Con casos reales DAR2.',
    date: '2026-09-03',
    readTime: '9 min',
    category: 'Podcast',
    image: '/images/podcast/plano-general-estudio.jpg',
  },
  {
    slug: 'cuanto-cuesta-video-corporativo-chile',
    title: '¿Cuánto cuesta un video corporativo en Chile? Factores que determinan el precio',
    excerpt: 'Rangos de precios de video corporativo en Chile 2026: institucional, de valores, de producto y capacitación. Qué determina el presupuesto y cómo cotizar.',
    date: '2026-08-26',
    readTime: '7 min',
    category: 'Video Corporativo',
    image: '/images/blog/produccion-video-corporativo-hero.png',
  },
  {
    slug: 'video-podcast-corporativo-que-es',
    title: 'Video podcast corporativo: qué es, para qué sirve y cómo se produce',
    excerpt: 'Qué es un video podcast corporativo, por qué las empresas lo adoptan, qué equipamiento requiere y cómo se produce en un estudio de podcast profesional.',
    date: '2026-08-19',
    readTime: '7 min',
    category: 'Video Podcast',
    image: '/images/podcast/plano-general-estudio.jpg',
  },
  {
    slug: 'como-elegir-productora-audiovisual-santiago',
    title: 'Cómo elegir una productora audiovisual en Santiago: guía práctica para empresas',
    excerpt: 'Tipos de productoras en Chile, qué equipo deben tener, presupuestos, 7 preguntas clave antes de contratar y errores que cuestan caro.',
    date: '2026-07-09',
    readTime: '10 min',
    category: 'Guía',
    image: '/images/servicios/streaming.jpg',
  },
  {
    slug: 'cuanto-cuesta-streaming-corporativo-chile',
    title: 'Streaming corporativo en Chile: factores que determinan la inversión',
    excerpt: 'Factores que determinan la inversión en un streaming corporativo en Chile: niveles de producción, qué incluye cada uno y cómo cotizar correctamente.',
    date: '2026-06-24',
    readTime: '7 min',
    category: 'Streaming Corporativo',
    image: '/images/blog/streaming-junta-anual-hero.png',
  },
  {
    slug: 'cuanto-cuesta-live-shopping-chile',
    title: 'Live Shopping en Chile: factores que determinan el presupuesto',
    excerpt: 'Factores que determinan el presupuesto de un live shopping en Chile: niveles de producción, qué incluye cada uno y cómo cotizar correctamente.',
    date: '2026-06-09',
    readTime: '7 min',
    category: 'Live Shopping',
    image: '/images/blog/live-shopping-presupuesto-hero2.png',
  },
  {
    slug: 'streaming-corporativo-santiago-guia-completa',
    title: 'Streaming corporativo en Santiago: guía completa para empresas',
    excerpt: 'Guía completa de streaming corporativo en Santiago de Chile: qué es, tipos de eventos, equipamiento, plataformas, checklist para contratar productora y preguntas frecuentes.',
    date: '2026-05-26',
    readTime: '9 min',
    category: 'Streaming Corporativo',
    image: '/images/blog/streaming-junta-anual-hero.png',
  },
  {
    slug: 'que-es-live-shopping-chile',
    title: 'Qué es Live Shopping y cómo lo implementan las empresas en Chile',
    excerpt: 'Guía completa de live shopping: qué es, cómo funciona, plataformas, métricas y casos de uso en retail, farma y supermercados.',
    date: '2026-05-19',
    readTime: '8 min',
    category: 'Live Shopping',
    image: '/images/blog/live-shopping-hero.png',
  },
  {
    slug: 'transmitir-junta-anual-sin-caidas',
    title: 'Cómo transmitir tu junta anual de accionistas sin caídas técnicas',
    excerpt: 'Guía técnica: causas de caídas, multicámara, enlaces redundantes, plataformas (Zoom/Teams/YouTube) y checklist del día del evento.',
    date: '2026-05-12',
    readTime: '7 min',
    category: 'Streaming Corporativo',
    image: '/images/blog/streaming-junta-anual-hero.png',
  },
  {
    slug: 'estudio-virtual-vs-set-fisico',
    title: 'Estudio virtual vs. set físico: cuándo conviene cada uno',
    excerpt: 'Comparativa práctica de costos, tiempos, flexibilidad y calidad. Cuándo elegir green screen y cuándo construir un set real.',
    date: '2026-05-05',
    readTime: '6 min',
    category: 'Estudio Virtual',
    image: '/images/blog/estudio-virtual-vs-fisico-hero.png',
  },
  {
    slug: 'medir-roi-video-corporativo',
    title: 'Cómo medir el ROI de tu video corporativo: 5 métricas clave',
    excerpt: 'Views, retention, conversión, engagement y brand lift. Herramientas, benchmarks y un ejemplo de cálculo real de ROI.',
    date: '2026-04-28',
    readTime: '7 min',
    category: 'Video Corporativo',
    image: '/images/blog/roi-video-corporativo-hero.png',
  },
  {
    slug: 'filtros-ar-marca-instagram-tiktok',
    title: 'Filtros AR para marca: cómo funcionan y por qué tu empresa debería tener uno',
    excerpt: 'Por qué Meta cerró los filtros de Instagram y cómo crear filtros AR de marca hoy en TikTok y Snapchat: tipos, proceso y métricas de alcance orgánico.',
    date: '2026-04-14',
    readTime: '6 min',
    category: 'Filtros AR',
    image: '/images/blog/filtros-ar-marca-hero.png',
  },
  {
    slug: 'circuito-cerrado-vs-streaming',
    title: 'Circuito cerrado vs. streaming: diferencias, cuándo usar cada uno y cómo combinarlos',
    excerpt: 'Comparativa técnica entre circuito cerrado CCTV y streaming en vivo. Cuándo conviene cada formato y cómo combinarlos en un mismo evento.',
    date: '2026-03-31',
    readTime: '5 min',
    category: 'Streaming Corporativo',
    image: '/images/blog/circuito-cerrado-vs-streaming-hero.png',
  },
  {
    slug: 'contenido-linkedin-ejecutivos',
    title: 'Cómo producir contenido para LinkedIn con tus ejecutivos como talento',
    excerpt: 'Guía práctica para grabar videos profesionales con ejecutivos sin experiencia frente a cámara: formato, duración, dirección y postproducción.',
    date: '2026-03-17',
    readTime: '6 min',
    category: 'Redes Sociales',
    image: '/images/blog/linkedin-ejecutivos-hero.png',
  },
  {
    slug: 'produccion-video-corporativo-paso-a-paso',
    title: 'Producción de video corporativo paso a paso: desde el brief hasta la entrega',
    excerpt: 'El proceso completo de producción de un video corporativo: preproducción, rodaje, postproducción y entregables. Con plazos referenciales.',
    date: '2026-03-03',
    readTime: '8 min',
    category: 'Video Corporativo',
    image: '/images/blog/produccion-video-corporativo-hero.png',
  },
];

const porFecha = [...articulos].sort((a, b) => b.date.localeCompare(a.date));

/**
 * Articulos relacionados: primero los de la misma categoria, luego los mas
 * recientes. Se usa al final de cada /blog/<slug>/.
 */
export function articulosRelacionados(slugActual, limite = 3) {
  const actual = articulos.find((a) => a.slug === slugActual);
  const otros = porFecha.filter((a) => a.slug !== slugActual);
  if (!actual) return otros.slice(0, limite);
  const mismaCategoria = otros.filter((a) => a.category === actual.category);
  const resto = otros.filter((a) => a.category !== actual.category);
  return [...mismaCategoria, ...resto].slice(0, limite);
}
