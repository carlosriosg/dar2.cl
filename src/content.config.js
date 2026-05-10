import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const portafolio = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/portafolio' }),
  schema: z.object({
    titulo: z.string(),
    cliente: z.string(),
    sector: z.string(),
    descripcion: z.string(),
    anio: z.number(),
    tipo: z.enum([
      'corporativo',
      'streaming',
      'live-shopping',
      'circuito-cerrado',
      'estudio-virtual',
      'estrategias-digitales',
      'redes-sociales',
      'filtros-ar',
    ]),
    youtube_url: z.string().optional(),
    thumbnail_url: z.string().optional(),
    thumbnail: z.string().optional(),
    imagen: z.string().optional(),
    destacado: z.boolean().default(false),
  }),
});

export const collections = { portafolio };
