import sharp from 'sharp';
import { readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = 'public/images';
const WEBP_QUALITY = 80;
const AVIF_QUALITY = 60;
const AVIF_EFFORT = 4;

let totalSrc = 0;
let totalWebp = 0;
let totalAvif = 0;
let webpCreated = 0;
let webpSkipped = 0;
let avifCreated = 0;
let avifSkipped = 0;

async function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      await walk(fullPath);
    } else if (/\.(png|jpe?g)$/i.test(entry)) {
      await optimize(fullPath);
    }
  }
}

async function optimize(srcPath) {
  const srcSize = statSync(srcPath).size;
  const srcMtime = statSync(srcPath).mtimeMs;
  totalSrc += srcSize;

  // WebP
  const webpPath = srcPath.replace(/\.(png|jpe?g)$/i, '.webp');
  let webpSize;
  if (existsSync(webpPath) && statSync(webpPath).mtimeMs >= srcMtime) {
    webpSize = statSync(webpPath).size;
    webpSkipped++;
  } else {
    await sharp(srcPath).webp({ quality: WEBP_QUALITY, effort: 5 }).toFile(webpPath);
    webpSize = statSync(webpPath).size;
    webpCreated++;
    const savedPct = (100 * (1 - webpSize / srcSize)).toFixed(0);
    console.log(`[webp] ${srcPath.padEnd(55)} ${(srcSize / 1024).toFixed(0).padStart(5)}KB → ${(webpSize / 1024).toFixed(0).padStart(5)}KB  (-${savedPct}%)`);
  }
  totalWebp += webpSize;

  // AVIF
  const avifPath = srcPath.replace(/\.(png|jpe?g)$/i, '.avif');
  let avifSize;
  if (existsSync(avifPath) && statSync(avifPath).mtimeMs >= srcMtime) {
    avifSize = statSync(avifPath).size;
    avifSkipped++;
  } else {
    await sharp(srcPath).avif({ quality: AVIF_QUALITY, effort: AVIF_EFFORT }).toFile(avifPath);
    avifSize = statSync(avifPath).size;
    avifCreated++;
    const savedPct = (100 * (1 - avifSize / srcSize)).toFixed(0);
    console.log(`[avif] ${srcPath.padEnd(55)} ${(srcSize / 1024).toFixed(0).padStart(5)}KB → ${(avifSize / 1024).toFixed(0).padStart(5)}KB  (-${savedPct}%)`);
  }
  totalAvif += avifSize;
}

console.log(`Optimizando imágenes en ${ROOT}/ → WebP (q=${WEBP_QUALITY}) + AVIF (q=${AVIF_QUALITY})\n`);
await walk(ROOT);
const savedWebpMB = ((totalSrc - totalWebp) / 1024 / 1024).toFixed(1);
const savedAvifMB = ((totalSrc - totalAvif) / 1024 / 1024).toFixed(1);
const webpPct = (100 * (1 - totalWebp / totalSrc)).toFixed(0);
const avifPct = (100 * (1 - totalAvif / totalSrc)).toFixed(0);
console.log(
  `\nWebP: ${webpCreated} creadas, ${webpSkipped} ya existían. ` +
  `${(totalSrc / 1024 / 1024).toFixed(1)}MB → ${(totalWebp / 1024 / 1024).toFixed(1)}MB ` +
  `(ahorro ${savedWebpMB}MB, -${webpPct}%)\n` +
  `AVIF: ${avifCreated} creadas, ${avifSkipped} ya existían. ` +
  `${(totalSrc / 1024 / 1024).toFixed(1)}MB → ${(totalAvif / 1024 / 1024).toFixed(1)}MB ` +
  `(ahorro ${savedAvifMB}MB, -${avifPct}%)`
);
