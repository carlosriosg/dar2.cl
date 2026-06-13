// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Sitemap automatico: @astrojs/sitemap genera sitemap-index.xml +
// sitemap-0.xml en cada build, incluyendo TODAS las paginas. Reemplaza
// al sitemap manual, que se desincronizaba al agregar contenido nuevo.
// nginx redirige /sitemap.xml y /sitemap-manual.xml -> /sitemap-index.xml.

// https://astro.build/config
export default defineConfig({
  site: 'https://dar2.cl',
  integrations: [sitemap()],
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
