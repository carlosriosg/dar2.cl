// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { articulos } from './src/data/blog.js';

// lastmod por URL: Google lo usa para priorizar recrawls. Se toma la fecha real
// del contenido (no "ahora", que seria una senal falsa): `date` de los posts del
// blog y el `dateModified` que cada pagina de caso ya declara en su schema.
const lastmodBlog = new Map(articulos.map((a) => [`/blog/${a.slug}/`, a.date]));
const lastmodCaso = new Map();
for (const archivo of readdirSync(join('src', 'pages', 'casos'))) {
  if (!archivo.endsWith('.astro') || archivo === 'index.astro') continue;
  const texto = readFileSync(join('src', 'pages', 'casos', archivo), 'utf8');
  const fecha = texto.match(/"dateModified":\s*"(\d{4}-\d{2}-\d{2})"/)?.[1];
  if (fecha) lastmodCaso.set(`/casos/${archivo.replace(/\.astro$/, '')}/`, fecha);
}

// Sitemap automatico: @astrojs/sitemap genera sitemap-index.xml +
// sitemap-0.xml en cada build, incluyendo TODAS las paginas. Reemplaza
// al sitemap manual, que se desincronizaba al agregar contenido nuevo.
// nginx redirige /sitemap.xml y /sitemap-manual.xml -> /sitemap-index.xml.

// https://astro.build/config
export default defineConfig({
  site: 'https://dar2.cl',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      // Blindaje defensivo: el sitemap solo indexa rutas de paginas HTML,
      // pero este filter garantiza que nunca se cuelen URLs con query
      // params (ej. /contacto?servicio=...), archivos estaticos ni
      // extensiones de assets.
      filter: (page) => {
        try {
          const url = new URL(page);
          return url.search === '' && !/\.[a-z0-9]{2,5}$/i.test(url.pathname);
        } catch {
          return false;
        }
      },
      // lastmod real solo donde hay fecha de contenido (blog y casos). El resto
      // de las paginas se emite sin lastmod, que es mejor que inventarla.
      serialize: (item) => {
        const path = new URL(item.url).pathname;
        const fecha = lastmodBlog.get(path) ?? lastmodCaso.get(path);
        return fecha ? { ...item, lastmod: `${fecha}T00:00:00.000Z` } : item;
      },
    }),
  ],
  build: {
    // Inline TODO el CSS en el <head> para eliminar render-blocking
    // stylesheet requests. PageSpeed reportaba 460ms de ahorro con 2 CSS
    // externos (7.9KB Base + 2.2KB index). HTML crece ~10KB pero gana
    // ~460ms de FCP/LCP, lo cual es mejor trade-off para sitio estatico
    // que va por CDN (Cloudflare comprime el HTML con Brotli/gzip).
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
