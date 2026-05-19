// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://dar2.cl',
  integrations: [sitemap()],
  build: {
    // Inline CSS pequenos (<= 4KB) directamente en el <head> para eliminar
    // render-blocking stylesheet requests. PageSpeed reportaba 270ms de ahorro.
    inlineStylesheets: 'auto',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});