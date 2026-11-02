// Fuente de verdad del bloque de enlazado interno al final de cada servicio.
//
// Antes cada página de servicio tenía un bloque "Artículos relacionados" con
// el título del post como anchor y un CTA genérico ("Leer artículo →"), así
// que los anchors no aportaban contexto semántico. Acá cada enlace trae un
// anchor descriptivo con variaciones de la keyword del servicio, más el origen
// del destino (guía, caso de éxito, portafolio) para darle contexto al usuario.
//
// Consumido por src/components/EnlacesInternos.astro (vía [slug].astro).
// Los `href` deben existir: si se agrega un post o un caso, se actualiza acá.

export const enlacesInternos = {
  streaming: {
    titulo: 'Streaming en vivo: guías, casos reales y portafolio',
    intro:
      'Si estás planificando una transmisión en vivo, estos artículos y casos te ayudan a definir alcance, presupuesto y estándar técnico antes de cotizar.',
    grupos: [
      {
        titulo: 'Guías de streaming corporativo',
        items: [
          {
            href: '/blog/streaming-corporativo-santiago-guia-completa/',
            anchor: 'Guía completa de streaming corporativo en Santiago para empresas',
            meta: 'Artículo · 9 min',
          },
          {
            href: '/blog/transmitir-junta-anual-sin-caidas/',
            anchor: 'Cómo transmitir una junta anual de accionistas sin caídas técnicas',
            meta: 'Artículo · 7 min',
          },
          {
            href: '/blog/cuanto-cuesta-streaming-corporativo-chile/',
            anchor: 'Cuánto cuesta un streaming corporativo en Chile y qué define el presupuesto',
            meta: 'Artículo · 7 min',
          },
        ],
      },
      {
        titulo: 'Casos de streaming y transmisión en vivo',
        items: [
          {
            href: '/casos/hacklab-ia-google-streaming/',
            anchor: 'Streaming continuo de 48 horas para HackLab-iA junto a Google',
            meta: 'Caso de éxito · 2024',
          },
          {
            href: '/casos/streaming-lanzamiento-libro-lastarria/',
            anchor: 'Transmisión multicámara del lanzamiento de un libro en Lastarria',
            meta: 'Caso de éxito · 2024',
          },
          {
            href: '/casos/cirugia-robotica-clinica-santa-maria/',
            anchor: 'Transmisión en vivo de cirugía robótica en Clínica Santa María',
            meta: 'Caso de éxito · 2022',
          },
          {
            href: '/portafolio/',
            anchor: 'Portafolio de streaming y producción audiovisual para empresas',
            meta: 'Portafolio',
          },
        ],
      },
    ],
  },

  'live-shopping': {
    titulo: 'Live shopping en Chile: guías y producción en vivo',
    intro:
      'Antes de montar tu primera venta en vivo, revisa cómo se planifica, cuánto cuesta y qué producción necesita un live shopping que convierte.',
    grupos: [
      {
        titulo: 'Guías de live shopping',
        items: [
          {
            href: '/blog/que-es-live-shopping-chile/',
            anchor: 'Qué es el live shopping en Chile y cómo implementarlo en tu e-commerce',
            meta: 'Artículo · 8 min',
          },
          {
            href: '/blog/cuanto-cuesta-live-shopping-chile/',
            anchor: 'Cuánto cuesta producir un live shopping en Chile: factores del presupuesto',
            meta: 'Artículo · 7 min',
          },
          {
            href: '/blog/como-elegir-productora-audiovisual-santiago/',
            anchor: 'Cómo elegir una productora audiovisual en Santiago para vender en vivo',
            meta: 'Artículo · 10 min',
          },
        ],
      },
      {
        titulo: 'Producción en vivo y portafolio',
        items: [
          {
            href: '/casos/circuito-cerrado-la-mar/',
            anchor: 'La Mar: producción multicámara en vivo con pantallas LED en tiempo real',
            meta: 'Caso de éxito · 2026',
          },
          {
            href: '/casos/',
            anchor: 'Casos de éxito de producción audiovisual y venta en vivo',
            meta: 'Casos',
          },
          {
            href: '/portafolio/',
            anchor: 'Portafolio de producción audiovisual para retail y consumo masivo',
            meta: 'Portafolio',
          },
        ],
      },
    ],
  },

  'circuito-cerrado': {
    titulo: 'Multicámara para eventos: guías y cobertura real',
    intro:
      'Cómo se planifica una cobertura multicámara con pantallas IMAG y en qué se diferencia de un streaming tradicional.',
    grupos: [
      {
        titulo: 'Guías de cobertura multicámara',
        items: [
          {
            href: '/blog/circuito-cerrado-vs-streaming/',
            anchor: 'Circuito cerrado vs streaming: cuándo conviene cada formato en un evento',
            meta: 'Artículo · 5 min',
          },
          {
            href: '/blog/como-elegir-productora-audiovisual-santiago/',
            anchor: 'Cómo elegir una productora audiovisual para eventos corporativos en Santiago',
            meta: 'Artículo · 10 min',
          },
        ],
      },
      {
        titulo: 'Casos de cobertura multicámara',
        items: [
          {
            href: '/casos/expo-family-2024-espacio-riesco/',
            anchor: 'Cobertura multicámara con cámaras PTZ para congresos en Espacio Riesco',
            meta: 'Caso de éxito · 2024',
          },
          {
            href: '/casos/circuito-cerrado-la-mar/',
            anchor: 'Multicámara en vivo para La Mar con pantallas LED y baja latencia',
            meta: 'Caso de éxito · 2026',
          },
          {
            href: '/portafolio/',
            anchor: 'Portafolio de cobertura multicámara para eventos corporativos',
            meta: 'Portafolio',
          },
        ],
      },
    ],
  },

  'estudio-virtual': {
    titulo: 'Estudio virtual y croma: comparativas y casos',
    intro:
      'Cuándo conviene un estudio virtual con green screen y cuándo un set físico, con ejemplos reales de producción.',
    grupos: [
      {
        titulo: 'Guías de estudio virtual',
        items: [
          {
            href: '/blog/estudio-virtual-vs-set-fisico/',
            anchor: 'Estudio virtual vs set físico: costos, tiempos y cuándo conviene cada uno',
            meta: 'Artículo · 6 min',
          },
          {
            href: '/blog/como-elegir-productora-audiovisual-santiago/',
            anchor: 'Cómo elegir una productora audiovisual con estudio virtual en Santiago',
            meta: 'Artículo · 10 min',
          },
        ],
      },
      {
        titulo: 'Casos y portafolio',
        items: [
          {
            href: '/casos/resultados-copec/',
            anchor: 'Resultados Copec: producción ejecutiva con motion graphics y escenografía',
            meta: 'Caso de éxito · 2026',
          },
          {
            href: '/portafolio/',
            anchor: 'Portafolio de estudio virtual y producción audiovisual corporativa',
            meta: 'Portafolio',
          },
        ],
      },
    ],
  },

  'videos-corporativos': {
    titulo: 'Video corporativo: guías, casos y portafolio',
    intro:
      'Qué define el precio de un video corporativo, cómo se mide su retorno y ejemplos de producción para empresas chilenas.',
    grupos: [
      {
        titulo: 'Guías de video corporativo',
        items: [
          {
            href: '/blog/cuanto-cuesta-video-corporativo-chile/',
            anchor: 'Cuánto cuesta un video corporativo en Chile: factores que definen el precio',
            meta: 'Artículo · 7 min',
          },
          {
            href: '/blog/medir-roi-video-corporativo/',
            anchor: 'Cómo medir el ROI de un video corporativo: 5 métricas clave',
            meta: 'Artículo · 7 min',
          },
          {
            href: '/blog/produccion-video-corporativo-paso-a-paso/',
            anchor: 'Producción de video corporativo paso a paso: del brief a la entrega',
            meta: 'Artículo · 8 min',
          },
        ],
      },
      {
        titulo: 'Casos y portafolio',
        items: [
          {
            href: '/casos/valores-corporativos-castano/',
            anchor: 'Video de valores corporativos para Castaño: 90 años de cultura en pantalla',
            meta: 'Caso de éxito · 2023',
          },
          {
            href: '/casos/bomba-minera-vogt-pelambres/',
            anchor: 'Video industrial en faena minera: caso Vogt en Los Pelambres',
            meta: 'Caso de éxito · 2025',
          },
          {
            href: '/portafolio/',
            anchor: 'Portafolio de videos corporativos para empresas chilenas',
            meta: 'Portafolio',
          },
        ],
      },
    ],
  },

  podcast: {
    titulo: 'Video podcast corporativo: guías y casos',
    intro:
      'Cómo se produce un video podcast corporativo con estándar broadcast y qué formato conviene según el objetivo.',
    grupos: [
      {
        titulo: 'Guías de video podcast',
        items: [
          {
            href: '/blog/video-podcast-corporativo-que-es/',
            anchor: 'Video podcast corporativo: qué es, para qué sirve y cómo se produce',
            meta: 'Artículo · 7 min',
          },
          {
            href: '/blog/producir-podcast-profesional-santiago/',
            anchor: 'Cómo producir un podcast profesional en Santiago: audio, video y estudio',
            meta: 'Artículo · 9 min',
          },
        ],
      },
      {
        titulo: 'Casos de video podcast',
        items: [
          {
            href: '/casos/video-podcast-conpat-global-las-condes/',
            anchor: 'Video podcast C-Level para Conpat Global en Las Condes',
            meta: 'Caso de éxito · 2025',
          },
          {
            href: '/casos/podcast-transelec-innovacion-china/',
            anchor: 'Videopodcast de innovación para Transelec: serie multicámara 4K',
            meta: 'Caso de éxito · 2026',
          },
          {
            href: '/portafolio/',
            anchor: 'Portafolio de podcast y video podcast corporativo',
            meta: 'Portafolio',
          },
        ],
      },
    ],
  },

  'estrategias-digitales': {
    titulo: 'Estrategia de contenido: guías y casos',
    intro:
      'Cómo se arma un plan de contenido audiovisual sostenible y qué preguntar antes de contratar a una productora.',
    grupos: [
      {
        titulo: 'Guías de estrategia de contenido',
        items: [
          {
            href: '/blog/como-elegir-productora-audiovisual-santiago/',
            anchor: 'Cómo elegir una productora audiovisual en Santiago: 7 preguntas clave',
            meta: 'Artículo · 10 min',
          },
          {
            href: '/blog/contenido-linkedin-ejecutivos/',
            anchor: 'Contenido para LinkedIn con ejecutivos como talento de marca',
            meta: 'Artículo · 6 min',
          },
        ],
      },
      {
        titulo: 'Casos y portafolio',
        items: [
          {
            href: '/casos/',
            anchor: 'Casos de éxito de producción audiovisual para empresas chilenas',
            meta: 'Casos',
          },
          {
            href: '/portafolio/',
            anchor: 'Portafolio de contenido audiovisual para marcas y empresas',
            meta: 'Portafolio',
          },
        ],
      },
    ],
  },

  'redes-sociales': {
    titulo: 'Contenido para redes sociales: guías y portafolio',
    intro:
      'Formatos, duración y producción de contenido vertical para Instagram, TikTok y LinkedIn.',
    grupos: [
      {
        titulo: 'Guías de contenido para redes',
        items: [
          {
            href: '/blog/contenido-linkedin-ejecutivos/',
            anchor: 'Cómo producir contenido para LinkedIn con tus ejecutivos como talento',
            meta: 'Artículo · 6 min',
          },
          {
            href: '/blog/filtros-ar-marca-instagram-tiktok/',
            anchor: 'Filtros AR de marca para Instagram y TikTok: cómo funcionan',
            meta: 'Artículo · 6 min',
          },
        ],
      },
      {
        titulo: 'Casos y portafolio',
        items: [
          {
            href: '/portafolio/',
            anchor: 'Portafolio de contenido audiovisual para redes sociales',
            meta: 'Portafolio',
          },
          {
            href: '/casos/',
            anchor: 'Casos de producción audiovisual para redes y campañas de marca',
            meta: 'Casos',
          },
        ],
      },
    ],
  },
};
