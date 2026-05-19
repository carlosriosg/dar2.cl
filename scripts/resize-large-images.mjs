// Redimensiona imagenes grandes (>1600px de ancho) a max 1600 manteniendo
// aspect ratio. Sobreescribe el archivo original (.jpg/.png). Despues hay
// que correr "npm run optimize:images" para regenerar webp + avif.
//
// PageSpeed Insights reportaba ~1656 KiB de ahorro porque las imagenes de
// servicios eran 2387x1792 pero se mostraban a 365x272 (cards) o 800x450
// (hero). Con max 1600 cubrimos hero @2x sin desperdicio.

import sharp from 'sharp';
import { readdirSync, statSync, renameSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';

// 1200px cubre hero @ 800x450 retina 2x con buffer. Imágenes mas
// grandes se reducen. Originales 2400px+ ya fueron redimensionados a
// 1600 antes; ahora un segundo pass a 1200 elimina los warnings
// "imagen mas grande de lo necesario" para los cards de servicios
// (580x433) y portafolio hero gallery (415x234).
const MAX_WIDTH = 1200;
const FOLDERS = [
  'public/images/servicios',
  'public/images/portafolio',
  'public/images/galeria',
  'public/images/nosotros',
  'public/images/blog',
];

let processed = 0;
let skipped = 0;
let bytesBefore = 0;
let bytesAfter = 0;

async function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    let stat;
    try { stat = statSync(fullPath); } catch { continue; }
    if (stat.isDirectory()) {
      await walk(fullPath);
    } else if (/\.(png|jpe?g)$/i.test(entry)) {
      try {
        await resize(fullPath);
      } catch (e) {
        console.warn(`  Skip ${fullPath}: ${e.message}`);
      }
    }
  }
}

async function resize(srcPath) {
  const sizeBefore = statSync(srcPath).size;
  const meta = await sharp(srcPath).metadata();

  if (!meta.width || meta.width <= MAX_WIDTH) {
    skipped++;
    return;
  }

  // Sharp no puede sobrescribir el archivo que lee. Escribimos a tmp y renombramos.
  const isJpg = /\.jpe?g$/i.test(srcPath);
  const tmpPath = srcPath + '.resized.tmp';

  await sharp(srcPath)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    [isJpg ? 'jpeg' : 'png']({ quality: 90 })
    .toFile(tmpPath);

  // Reemplaza el original (en Windows necesita borrar primero).
  try { unlinkSync(srcPath); } catch {}
  renameSync(tmpPath, srcPath);

  const sizeAfter = statSync(srcPath).size;
  bytesBefore += sizeBefore;
  bytesAfter += sizeAfter;
  processed++;

  const savedKB = ((sizeBefore - sizeAfter) / 1024).toFixed(0);
  const pct = (100 * (1 - sizeAfter / sizeBefore)).toFixed(0);
  console.log(
    `${srcPath.padEnd(60)} ${meta.width}x${meta.height} -> ${MAX_WIDTH}xauto  ` +
    `${(sizeBefore / 1024).toFixed(0).padStart(5)}KB -> ${(sizeAfter / 1024).toFixed(0).padStart(5)}KB  ` +
    `(-${pct}%, -${savedKB}KB)`
  );
}

console.log(`Redimensionando imagenes con width > ${MAX_WIDTH}px en:\n  ${FOLDERS.join('\n  ')}\n`);
for (const folder of FOLDERS) {
  try {
    await walk(folder);
  } catch (e) {
    console.warn(`No se pudo procesar ${folder}: ${e.message}`);
  }
}

const savedMB = ((bytesBefore - bytesAfter) / 1024 / 1024).toFixed(2);
const totalPct = bytesBefore > 0 ? (100 * (1 - bytesAfter / bytesBefore)).toFixed(0) : 0;
console.log(
  `\n${processed} redimensionadas, ${skipped} ya eran <= ${MAX_WIDTH}px.\n` +
  `Total: ${(bytesBefore / 1024 / 1024).toFixed(1)}MB -> ${(bytesAfter / 1024 / 1024).toFixed(1)}MB ` +
  `(ahorro ${savedMB}MB, -${totalPct}%)\n` +
  `Siguiente paso: correr "npm run optimize:images" para regenerar webp + avif.`
);
