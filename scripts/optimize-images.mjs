import sharp from 'sharp';
import { readdirSync, statSync, existsSync, writeFileSync, utimesSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = 'public/images';
const WEBP_QUALITY = 80;
const AVIF_QUALITY = 60;
const AVIF_EFFORT = 4;
// Fallback PNG: solo se cuantiza a paleta si pesa mas que esto. Evita tocar
// logos/iconos pequenos donde no vale la pena.
const FALLBACK_MIN_BYTES = 80 * 1024;

let totalSrc = 0;
let totalWebp = 0;
let totalAvif = 0;
let webpCreated = 0;
let webpSkipped = 0;
let avifCreated = 0;
let avifSkipped = 0;
let fallbackOptimized = 0;
let fallbackBefore = 0;
let fallbackAfter = 0;

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

  // ── Fallback PNG ──────────────────────────────────────────────────────
  // Se cuantiza a paleta DESPUES de generar webp/avif, para que los formatos
  // modernos conserven la calidad completa del original. Cuantizar antes
  // hacia que el AVIF pesara el doble (el dither no comprime bien).
  // El fallback PNG solo lo ven navegadores sin AVIF/WebP y algunos scrapers.
  if (/\.png$/i.test(srcPath) && srcSize > FALLBACK_MIN_BYTES) {
    const quantized = await sharp(srcPath)
      .png({ palette: true, colours: 128, dither: 1, effort: 10, compressionLevel: 9 })
      .toBuffer();
    if (quantized.length < srcSize * 0.75) {
      writeFileSync(srcPath, quantized);
      // Restaurar mtime: si cambia, la proxima corrida regeneraria webp/avif
      // desde el PNG ya cuantizado y perderia calidad.
      utimesSync(srcPath, new Date(srcMtime), new Date(srcMtime));
      fallbackOptimized++;
      fallbackBefore += srcSize;
      fallbackAfter += quantized.length;
      const savedPct = (100 * (1 - quantized.length / srcSize)).toFixed(0);
      console.log(`[png ] ${srcPath.padEnd(55)} ${(srcSize / 1024).toFixed(0).padStart(5)}KB → ${(quantized.length / 1024).toFixed(0).padStart(5)}KB  (-${savedPct}%)`);
    }
  }
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
  `(ahorro ${savedAvifMB}MB, -${avifPct}%)\n` +
  `Fallback PNG (paleta): ${fallbackOptimized} cuantizados. ` +
  `${(fallbackBefore / 1024 / 1024).toFixed(1)}MB → ${(fallbackAfter / 1024 / 1024).toFixed(1)}MB`
);
