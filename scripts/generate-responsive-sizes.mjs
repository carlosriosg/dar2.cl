// Genera variantes de ancho para las imagenes de hero (casos, blog, podcast,
// servicios, galeria) y asi poder servir un srcset real por dispositivo.
//
// Convencion: {basename}-{width}.{ext}  (ej. ambiente-salones-800.jpg)
// Picture.astro detecta estas variantes con fs.existsSync y arma el srcset
// (-480 / -800 / -1200). El src original queda como fallback del <img>.
//
// Correr ANTES de optimize:images (que genera webp/avif de cada variante).
// Requiere que resize:images ya haya corrido (originales <= 1200px).
//
// Solo se genera una variante si el original es >= a ese ancho: nunca se
// agranda una imagen.

import sharp from 'sharp';
import { readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const WIDTHS = [480, 800, 1200];
const FOLDERS = [
  'public/images/casos',
  'public/images/blog',
  'public/images/podcast',
  'public/images/servicios',
  'public/images/galeria',
];

let created = 0;
let skipped = 0;

// Descarta variantes ya generadas (-card, -card-sm, -480, -800, -1200...).
function isDerived(name) {
  return /-card(-sm)?\.(png|jpe?g)$/i.test(name) || /-\d+\.(png|jpe?g)$/i.test(name);
}

async function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    let stat;
    try { stat = statSync(fullPath); } catch { continue; }
    if (stat.isDirectory()) {
      await walk(fullPath);
    } else if (/\.(png|jpe?g)$/i.test(entry) && !isDerived(entry)) {
      try {
        await makeVariants(fullPath);
      } catch (e) {
        console.warn(`  Skip ${fullPath}: ${e.message}`);
      }
    }
  }
}

async function makeVariants(srcPath) {
  const srcMtime = statSync(srcPath).mtimeMs;
  const meta = await sharp(srcPath).metadata();
  if (!meta.width) return;

  const isJpg = /\.jpe?g$/i.test(srcPath);

  for (const width of WIDTHS) {
    // Nunca agrandar: la variante solo tiene sentido si el original la cubre.
    if (meta.width < width) continue;

    const outPath = srcPath.replace(/\.(png|jpe?g)$/i, `-${width}.$1`);
    if (existsSync(outPath) && statSync(outPath).mtimeMs >= srcMtime) {
      skipped++;
      continue;
    }

    await sharp(srcPath)
      .resize({ width, withoutEnlargement: true })
      [isJpg ? 'jpeg' : 'png'](isJpg ? { quality: 82 } : { compressionLevel: 9 })
      .toFile(outPath);

    created++;
    console.log(`${outPath.padEnd(72)} ${width}w`);
  }
}

console.log(`Generando variantes ${WIDTHS.join('/')}px en:\n  ${FOLDERS.join('\n  ')}\n`);
for (const folder of FOLDERS) {
  try {
    await walk(folder);
  } catch (e) {
    console.warn(`No se pudo procesar ${folder}: ${e.message}`);
  }
}

console.log(
  `\n${created} variantes creadas, ${skipped} ya existian.\n` +
  `Siguiente paso: correr "npm run optimize:images" para generar avif/webp.`
);
