// Genera versiones small (730px ancho) para imágenes que se usan en cards
// de servicios y portafolio. PageSpeed se queja porque las imágenes son
// 1200x896 pero el card las muestra a 365x272 (730x544 retina 2x).
//
// Genera archivo {basename}-card.{ext} de 730px ancho. El optimize-images
// luego genera versiones webp + avif de cada -card.

import sharp from 'sharp';
import { readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const CARD_WIDTH = 730;
const FOLDERS = [
  'public/images/servicios',
  'public/images/portafolio',
];

let created = 0;
let skipped = 0;

async function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    let stat;
    try { stat = statSync(fullPath); } catch { continue; }
    if (stat.isDirectory()) continue;
    // Solo procesa originales (jpg/png que NO tienen -card en el nombre)
    if (!/\.(png|jpe?g)$/i.test(entry)) continue;
    if (/-card\.(png|jpe?g)$/i.test(entry)) continue;
    try {
      await makeCard(fullPath);
    } catch (e) {
      console.warn(`  Skip ${fullPath}: ${e.message}`);
    }
  }
}

async function makeCard(srcPath) {
  const cardPath = srcPath.replace(/\.(png|jpe?g)$/i, '-card.$1');

  const srcMtime = statSync(srcPath).mtimeMs;
  if (existsSync(cardPath) && statSync(cardPath).mtimeMs >= srcMtime) {
    skipped++;
    return;
  }

  const meta = await sharp(srcPath).metadata();
  if (!meta.width || meta.width <= CARD_WIDTH) {
    // El original ya es <= 730px, no tiene sentido generar -card
    skipped++;
    return;
  }

  const isJpg = /\.jpe?g$/i.test(srcPath);
  await sharp(srcPath)
    .resize({ width: CARD_WIDTH, withoutEnlargement: true })
    [isJpg ? 'jpeg' : 'png']({ quality: 85 })
    .toFile(cardPath);

  const srcSize = statSync(srcPath).size;
  const cardSize = statSync(cardPath).size;
  created++;
  const pct = (100 * (1 - cardSize / srcSize)).toFixed(0);
  console.log(
    `${cardPath.padEnd(65)} ${(srcSize / 1024).toFixed(0).padStart(4)}KB -> ${(cardSize / 1024).toFixed(0).padStart(4)}KB  (-${pct}%)`
  );
}

console.log(`Generando -card.{jpg,png} de ${CARD_WIDTH}px ancho en:\n  ${FOLDERS.join('\n  ')}\n`);
for (const folder of FOLDERS) {
  try {
    await walk(folder);
  } catch (e) {
    console.warn(`No se pudo procesar ${folder}: ${e.message}`);
  }
}

console.log(
  `\n${created} -card creadas, ${skipped} skipped.\n` +
  `Siguiente paso: correr "npm run optimize:images" para generar avif/webp -card.`
);
