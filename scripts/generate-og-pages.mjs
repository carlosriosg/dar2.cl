// Genera las imagenes Open Graph de cada servicio y cada caso de exito:
// 1200x630 (relacion 1.91:1, el estandar que Facebook/LinkedIn/WhatsApp no
// recortan) a partir del hero real de cada pagina.
//
// Antes solo los 16 posts del blog tenian og:image propia; servicios y casos
// compartian la tarjeta generica de la marca. Correr: npm run generate:og-pages
// (tambien corre dentro de npm run build, asi nunca queda desactualizado).
import sharp from 'sharp';
import { mkdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { servicios } from '../src/data/servicios.js';
import { casos } from '../src/data/casos.js';

const PUBLIC = join(process.cwd(), 'public');
// public/og (no public/images/og): los scripts de optimize/cards/hashes recorren
// public/images, y estas OG no necesitan WebP/AVIF ni cache busting.
const SALIDA = join(PUBLIC, 'og');
const ANCHO = 1200;
const ALTO = 630;

mkdirSync(SALIDA, { recursive: true });

const tareas = [
  ...servicios.map((s) => ({
    origen: join(PUBLIC, 'images', 'servicios', `${s.slug}.jpg`),
    destino: join(SALIDA, `service-${s.slug}.jpg`),
    etiqueta: `servicio/${s.slug}`,
  })),
  ...casos.map((c) => ({
    origen: join(PUBLIC, c.image.replace(/^\//, '')),
    destino: join(SALIDA, `caso-${c.slug}.jpg`),
    etiqueta: `caso/${c.slug}`,
  })),
];

let generadas = 0;
let omitidas = 0;

for (const tarea of tareas) {
  if (!existsSync(tarea.origen)) {
    console.warn(`  ! sin origen: ${tarea.etiqueta}`);
    continue;
  }
  const origenInfo = statSync(tarea.origen);
  if (existsSync(tarea.destino) && statSync(tarea.destino).mtimeMs >= origenInfo.mtimeMs) {
    omitidas++;
    continue;
  }
  try {
    const info = await sharp(tarea.origen)
      .resize(ANCHO, ALTO, { fit: 'cover', position: 'attention' })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(tarea.destino);
    generadas++;
    console.log(`  + ${tarea.etiqueta.padEnd(34)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
  } catch (error) {
    console.warn(`  ! error en ${tarea.etiqueta}: ${error.message}`);
  }
}

console.log(`OG pages: ${generadas} generadas, ${omitidas} al dia (${tareas.length} total)`);
