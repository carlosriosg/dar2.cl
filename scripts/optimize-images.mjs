import sharp from 'sharp';
import { readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = 'public/images';
const QUALITY = 80;

let totalSrc = 0;
let totalWebp = 0;
let created = 0;
let skipped = 0;

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
  const webpPath = srcPath.replace(/\.(png|jpe?g)$/i, '.webp');
  const srcSize = statSync(srcPath).size;

  if (existsSync(webpPath)) {
    const srcMtime = statSync(srcPath).mtimeMs;
    const webpMtime = statSync(webpPath).mtimeMs;
    if (webpMtime >= srcMtime) {
      skipped++;
      totalSrc += srcSize;
      totalWebp += statSync(webpPath).size;
      return;
    }
  }

  await sharp(srcPath).webp({ quality: QUALITY, effort: 5 }).toFile(webpPath);
  const webpSize = statSync(webpPath).size;
  const savedPct = (100 * (1 - webpSize / srcSize)).toFixed(0);
  created++;
  totalSrc += srcSize;
  totalWebp += webpSize;
  console.log(
    `${srcPath.padEnd(55)} ${(srcSize / 1024).toFixed(0).padStart(5)}KB → ${(webpSize / 1024).toFixed(0).padStart(5)}KB  (-${savedPct}%)`
  );
}

console.log(`Optimizando imágenes en ${ROOT}/ → WebP (q=${QUALITY})\n`);
await walk(ROOT);
const savedMB = ((totalSrc - totalWebp) / 1024 / 1024).toFixed(1);
const totalPct = (100 * (1 - totalWebp / totalSrc)).toFixed(0);
console.log(
  `\n${created} creadas, ${skipped} ya existían. ` +
  `Total: ${(totalSrc / 1024 / 1024).toFixed(1)}MB → ${(totalWebp / 1024 / 1024).toFixed(1)}MB ` +
  `(ahorro ${savedMB}MB, -${totalPct}%)`
);
