// Convierte las fotos HEIC del caso "Circuito Cerrado La Mar" (iPhone, MotionPhoto)
// a JPG base + WebP + AVIF optimizados, con rotación EXIF y redimensionado a 1600px.
// Origen: public/images/circuito cerrado evento La Mar/
// Destino: public/images/casos/circuito-cerrado-la-mar/
//
// sharp no decodifica HEIC en este build (libvips sin HEVC), por eso el paso
// HEIC->JPG usa ImageMagick y sharp genera WebP/AVIF sobre el JPG base.
//
// Se corre manualmente: node scripts/convert-heic-la-mar.mjs

import sharp from 'sharp';
import { readdirSync, statSync, existsSync, mkdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';

const SRC = 'raw-images-la-mar';
const DEST = 'public/images/casos/circuito-cerrado-la-mar';
const MAX_WIDTH = 1600;
const JPEG_QUALITY = 88;
const WEBP_QUALITY = 80;
const AVIF_QUALITY = 60;
const MAGICK = 'C:\\Program Files\\ImageMagick-7.1.2-Q16-HDRI\\magick.exe';

// Nombre de salida limpio (kebab-case) por archivo HEIC.
const NAME_MAP = {
  '20260820_180926.heic': 'ambiente-salones',
  '20260820_193314.heic': 'camara-ptz-estacion-1',
  '20260820_193332.heic': 'camarografos-inalambricos',
  '20260820_193350.heic': 'camara-ptz-cenital',
  '20260820_202541.heic': 'pantalla-vertical-chef',
  '20260820_220725.heic': 'estacion-brasas',
  '20260820_220846.heic': 'estacion-postres',
};

mkdirSync(DEST, { recursive: true });

function heicToJpg(srcPath, jpgPath, width, quality) {
  const res = spawnSync(MAGICK, [srcPath, '-auto-orient', `-resize`, `${width}x`, `-quality`, String(quality), jpgPath], { encoding: 'utf8' });
  if (res.status !== 0) throw new Error(`ImageMagick: ${(res.stderr || res.stdout || '').trim()}`);
}

async function convert(file) {
  const srcPath = join(SRC, file);
  const base = NAME_MAP[file];
  if (!base) return;
  const meta = await sharp(srcPath).metadata();
  const height = Math.round((meta.height / meta.width) * MAX_WIDTH);
  const srcSize = statSync(srcPath).size;

  // Base JPG (fuente del <picture>, sirve de fallback).
  const jpgPath = join(DEST, base + '.jpg');
  heicToJpg(srcPath, jpgPath, MAX_WIDTH, JPEG_QUALITY);
  const jpgSize = statSync(jpgPath).size;

  // WebP
  const webpPath = join(DEST, base + '.webp');
  await sharp(jpgPath).webp({ quality: WEBP_QUALITY, effort: 5 }).toFile(webpPath);
  const webpSize = statSync(webpPath).size;

  // AVIF
  const avifPath = join(DEST, base + '.avif');
  await sharp(jpgPath).avif({ quality: AVIF_QUALITY, effort: 4 }).toFile(avifPath);
  const avifSize = statSync(avifPath).size;

  console.log(
    `${base.padEnd(26)} ${MAX_WIDTH}x${height} | JPG ${(jpgSize / 1024).toFixed(0).padStart(4)}KB | ` +
    `WEBP ${(webpSize / 1024).toFixed(0).padStart(4)}KB | AVIF ${(avifSize / 1024).toFixed(0).padStart(4)}KB | ` +
    `src ${(srcSize / 1024).toFixed(0)}KB`
  );
}

console.log(`Convirtiendo HEIC de "${SRC}" -> ${DEST}\n`);
for (const f of readdirSync(SRC)) {
  if (/\.heic$/i.test(f)) {
    try { await convert(f); } catch (e) { console.warn(`  Error ${f}: ${e.message}`); }
  }
}

// Gastón Acurio.avif (640x640) — ya es AVIF. Generamos fallback JPG/WebP si no existen.
const gacuriAvif = join(SRC, 'Gastón Acurio.avif');
if (existsSync(gacuriAvif)) {
  const base = 'gaston-acurio';
  const jpgPath = join(DEST, base + '.jpg');
  const webpPath = join(DEST, base + '.webp');
  if (!existsSync(jpgPath) || !existsSync(webpPath)) {
    await sharp(gacuriAvif).rotate().resize({ width: 640, withoutEnlargement: true }).jpeg({ quality: 88 }).toFile(jpgPath);
    await sharp(jpgPath).webp({ quality: 80, effort: 5 }).toFile(webpPath);
    console.log(`gaston-acurio                640x640 | AVIF original 34KB + JPG/WEBP generados`);
  }
}

console.log('\nListo.');
