// Genera versiones small (730px ancho) para imágenes que se usan en cards
// de servicios y portafolio. PageSpeed se queja porque las imágenes son
// 1200x896 pero el card las muestra a 365x272 (730x544 retina 2x).
//
// Genera archivo {basename}-card.{ext} de 730px ancho. El optimize-images
// luego genera versiones webp + avif de cada -card.

import sharp from 'sharp';
import { readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

// Dos tamaños generados por cada imagen:
//   -card.{ext}:    730px wide  (retina 2x del card 365x272)
//   -card-sm.{ext}: 365px wide  (1x DPI - PageSpeed sin retina)
// El navegador elige cuál usar via srcset+sizes.
const SIZES = [
  { suffix: '-card-sm', width: 365 },
  { suffix: '-card', width: 730 },
];
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
    // Solo procesa originales (jpg/png que NO tienen -card o -card-sm en el nombre)
    if (!/\.(png|jpe?g)$/i.test(entry)) continue;
    if (/-card(-sm)?\.(png|jpe?g)$/i.test(entry)) continue;
    try {
      await makeCards(fullPath);
    } catch (e) {
      console.warn(`  Skip ${fullPath}: ${e.message}`);
    }
  }
}

async function makeCards(srcPath) {
  const srcMtime = statSync(srcPath).mtimeMs;
  const meta = await sharp(srcPath).metadata();
  const isJpg = /\.jpe?g$/i.test(srcPath);

  for (const { suffix, width } of SIZES) {
    const outPath = srcPath.replace(/\.(png|jpe?g)$/i, `${suffix}.$1`);

    if (existsSync(outPath) && statSync(outPath).mtimeMs >= srcMtime) {
      skipped++;
      continue;
    }

    if (!meta.width || meta.width <= width) {
      skipped++;
      continue;
    }

    await sharp(srcPath)
      .resize({ width, withoutEnlargement: true })
      [isJpg ? 'jpeg' : 'png']({ quality: 85 })
      .toFile(outPath);

    const srcSize = statSync(srcPath).size;
    const outSize = statSync(outPath).size;
    created++;
    const pct = (100 * (1 - outSize / srcSize)).toFixed(0);
    console.log(
      `${outPath.padEnd(70)} ${(srcSize / 1024).toFixed(0).padStart(4)}KB -> ${(outSize / 1024).toFixed(0).padStart(4)}KB  (-${pct}%)`
    );
  }
}

const sizesDesc = SIZES.map(s => `${s.suffix} ${s.width}px`).join(', ');
console.log(`Generando ${sizesDesc} en:\n  ${FOLDERS.join('\n  ')}\n`);
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
