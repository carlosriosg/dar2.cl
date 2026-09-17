// Genera src/data/image-hashes.json: mapa { urlPublica -> hash corto del
// contenido } para todas las imagenes de public/images.
//
// Picture.astro lo usa para agregar "?v=<hash>" a cada URL (src y srcset).
// Asi un cambio de bytes produce una URL nueva: cache miss en Cloudflare y en
// el navegador, sin necesidad de purgar cache manualmente. Las imagenes que no
// cambian conservan su cache de 1 ano.
//
// Se ejecuta automaticamente antes de "npm run build". Para desarrollo local,
// correr "npm run generate:hashes" tras agregar/cambiar imagenes.

import { createHash } from 'node:crypto';
import { readdirSync, statSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';

const ROOT = 'public/images';
const OUT = 'src/data/image-hashes.json';
const EXTS = /\.(png|jpe?g|webp|avif|gif|svg|ico)$/i;

const map = {};

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      walk(full);
    } else if (EXTS.test(entry)) {
      const hash = createHash('sha1').update(readFileSync(full)).digest('hex').slice(0, 8);
      const url = '/' + full.replace(/^public[\\/]/, '').replace(/\\/g, '/');
      map[url] = hash;
    }
  }
}

walk(ROOT);

// Orden estable para que el JSON no cambie si no cambiaron las imagenes.
const sorted = {};
for (const key of Object.keys(map).sort()) sorted[key] = map[key];

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(sorted) + '\n');

console.log(`${Object.keys(sorted).length} hashes escritos en ${OUT}`);
