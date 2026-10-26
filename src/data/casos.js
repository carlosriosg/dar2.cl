// Fuente de verdad de los casos de éxito.
//
// Antes esta lista vivia duplicada dentro de src/pages/casos/index.astro y cada
// pagina de caso se enlazaba solo desde ahi (1-2 enlaces internos entrantes,
// el punto mas debil del sitio para rastreo y autoridad). Ahora la lista se
// centraliza aca y la consumen:
//   - /casos/ (listado)
//   - /servicios/<slug>/ (bloque "Casos de éxito" del servicio)
//   - /casos/<slug>/ (bloque "Otros casos" al final de cada caso)
//
// `servicios` son los slugs de src/data/servicios.js a los que aplica el caso.
// Un caso puede alimentar mas de un servicio (ej. cirugia robotica = video
// corporativo + transmision en vivo).

export const casos = [
  {
    slug: 'video-podcast-conpat-global-las-condes',
    title: 'Producción de Video Podcast Corporativo · Conpat Global',
    excerpt: 'Estudio móvil de video podcast C-Level en oficinas de Las Condes para Conpat Global: 3 cámaras PTZ, iluminación bicolor y microfonía broadcast con contenido modular para LinkedIn y YouTube.',
    year: 2025,
    sector: 'Finanzas / Consultoría',
    service: 'Video Podcast',
    servicios: ['podcast'],
    image: '/images/casos/video-podcast-conpat-global-las-condes/plano-general-2-ptz.jpg',
  },
  {
    slug: 'expo-family-2024-espacio-riesco',
    title: 'Cobertura Multicámara para Congresos · Expo Family 2024',
    excerpt: 'Circuito cerrado multicámara en Espacio Riesco para el congreso Expo Family 2024: 3 cámaras PTZ robóticas, switcher broadcast de baja latencia, audio desde consola y respaldo master del evento.',
    year: 2024,
    sector: 'Congresos / Eventos',
    service: 'Circuito Cerrado (CCTV)',
    servicios: ['circuito-cerrado'],
    image: '/images/casos/expo-family-2024-espacio-riesco/escenario.jpg',
  },
  {
    slug: 'hacklab-ia-google-streaming',
    title: 'Streaming e Integración Híbrida · HackLab-iA Google',
    excerpt: 'Streaming continuo de 2 días para HackLab-iA junto a Google y Ciudad Emergente: enlace de fibra inalámbrica al Cerro San Cristóbal, cámaras PTZ robóticas y señal a pantalla gigante sin latencia.',
    year: 2024,
    sector: 'Tecnología',
    service: 'Streaming',
    servicios: ['streaming'],
    image: '/images/casos/hacklab-ia-google-streaming/hero.jpg',
  },
  {
    slug: 'streaming-lanzamiento-libro-lastarria',
    title: 'Streaming Lanzamiento de Libro · El Espíritu de la Radio',
    excerpt: 'Streaming multicámara en vivo para el lanzamiento del libro "El Espíritu de la Radio" en Fuente Lastarria: cámaras PTZ robóticas, switcher vMix y módem 5G bonding.',
    year: 2024,
    sector: 'Cultural',
    service: 'Streaming',
    servicios: ['streaming'],
    image: '/images/casos/streaming-lanzamiento-libro-lastarria/evento-publico.jpg',
  },
  {
    slug: 'resultados-copec',
    title: 'Producción Audiovisual Ejecutiva · Empresas Copec',
    excerpt: 'Registro trimestral del CEO de Empresas Copec: multicámara 6K (Z CAM E2-S6), slider motorizado, motion graphics en After Effects y master 4K entregado en menos de 30 horas.',
    year: 2026,
    sector: 'Holding',
    service: 'Video corporativo',
    servicios: ['videos-corporativos'],
    image: '/images/blog/grabacion-ejecutiva-empresas-copec.jpg',
  },
  {
    slug: 'circuito-cerrado-la-mar',
    title: 'Circuito Cerrado Multicámara · La Mar Cebichería',
    excerpt: 'Circuito cerrado multicámara de baja latencia para eventos: despliegue SDI/NDI, cámara cenital y switcher digital proyectando el showcooking en pantallas LED en vivo.',
    year: 2026,
    sector: 'Gastronomía',
    service: 'Circuito Cerrado (CCTV)',
    servicios: ['circuito-cerrado'],
    image: '/images/casos/circuito-cerrado-la-mar/ambiente-salones.jpg',
  },
  {
    slug: 'podcast-transelec-innovacion-china',
    title: 'Videopodcast · Transelec',
    excerpt: 'Video podcast corporativo para Transelec: prospección de innovación en China convertida en serie de episodios multicámara 4K con audio broadcast para +500 colaboradores.',
    year: 2026,
    sector: 'Energía',
    service: 'Video Podcast',
    servicios: ['podcast'],
    image: '/images/podcast/set-general.jpg',
  },
  {
    slug: 'bomba-minera-vogt-pelambres',
    title: 'Sala de Bombas Tipo Contenedor · VOGT',
    excerpt: 'Producción audiovisual industrial: rodaje en faena minera para Vogt en Los Pelambres (+3.000 msnm) con acreditaciones HSEQ, cine compacto y entregables modulares para ferias B2B.',
    year: 2025,
    sector: 'Minería',
    service: 'Video corporativo',
    servicios: ['videos-corporativos'],
    image: '/images/portafolio/vogt-bomba-pelambres.png',
  },
  {
    slug: 'valores-corporativos-castano',
    title: 'Valores Corporativos · CASTAÑO',
    excerpt: 'Video de valores para Castaño (90 años, 2.000+ colaboradores): testimonios reales del equipo, dirección de arte en planta y estándar broadcast para fortalecer la cultura y optimizar la inducción.',
    year: 2023,
    sector: 'Retail Alimenticio',
    service: 'Video corporativo',
    servicios: ['videos-corporativos'],
    image: '/images/portafolio/valores-castano.png',
  },
  {
    slug: 'cirugia-robotica-clinica-santa-maria',
    title: 'Cirugía Robótica · Clínica Santa María',
    excerpt: 'Producción audiovisual en salud: rodaje en quirófano activo para Clínica Santa María (2.400+ intervenciones robóticas) con cine compacto, validación médica en sitio y entregables modulares.',
    year: 2022,
    sector: 'Salud',
    service: 'Video corporativo',
    // Tambien transmision en vivo de las cirugias: alimenta la pagina de streaming.
    servicios: ['videos-corporativos', 'streaming'],
    image: '/images/portafolio/Armado-Hugo-RAS2.png',
  },
];

/** Casos ordenados de mas nuevo a mas antiguo (listado de /casos/). */
export const casosPorAnio = [...casos].sort((a, b) => b.year - a.year);

/**
 * Casos para la pagina de un servicio: primero los propios, luego los mas
 * recientes para completar. Siempre devuelve `limite` items (hay 10 casos).
 */
export function casosDelServicio(slug, limite = 3) {
  const propios = casosPorAnio.filter((c) => c.servicios.includes(slug));
  const resto = casosPorAnio.filter((c) => !c.servicios.includes(slug));
  return [...propios, ...resto].slice(0, limite);
}

/**
 * Casos relacionados con el caso actual: primero los que comparten servicio,
 * luego los mas recientes. Se usa al final de cada /casos/<slug>/.
 */
export function casosRelacionados(slugActual, limite = 3) {
  const actual = casos.find((c) => c.slug === slugActual);
  const otros = casosPorAnio.filter((c) => c.slug !== slugActual);
  if (!actual) return otros.slice(0, limite);
  const mismos = otros.filter((c) => c.servicios.some((s) => actual.servicios.includes(s)));
  const resto = otros.filter((c) => !mismos.includes(c));
  return [...mismos, ...resto].slice(0, limite);
}
