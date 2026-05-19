// Genera favicons estilo "app icon" desde SVG inline:
// Fondo naranja DAR2 (#FF4500) redondeado + camara blanca centrada.
// Visible en modo claro y oscuro sin depender de prefers-color-scheme.
// Uso: node scripts/generate-favicons.mjs
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

// SVG: cuadrado redondeado naranja + icono camara blanco (estilo lucide "video")
// El icono se centra y ocupa ~60% del canvas.
function svgFor(size) {
  const radius = Math.round(size * 0.22); // 22% radio (look App Store)
  // Camera viewbox original es 24x24. Lo centramos y escalamos a 60% del canvas.
  const scale = (size * 0.60) / 24;
  const offset = (size - 24 * scale) / 2;
  const stroke = Math.max(1.6, size * 0.075);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="#FF4500"/>
  <g transform="translate(${offset}, ${offset}) scale(${scale})"
     fill="none" stroke="#ffffff" stroke-width="${stroke / scale}" stroke-linecap="round" stroke-linejoin="round">
    <path d="m22 8-6 4 6 4V8Z"/>
    <rect width="14" height="12" x="2" y="6" rx="2" ry="2"/>
  </g>
</svg>`;
}

async function renderPng(size, name) {
  const dest = join(publicDir, name);
  const svg = Buffer.from(svgFor(size));
  await sharp(svg).png().toFile(dest);
  console.log(`  OK ${name} (${size}x${size})`);
}

console.log('Generando favicons estilo app icon (naranja + camara blanca)...\n');

// Tamanos estandar
await renderPng(16,  'favicon-16x16.png');
await renderPng(32,  'favicon-32x32.png');
await renderPng(48,  'favicon-48x48.png');
await renderPng(180, 'apple-touch-icon.png');
await renderPng(192, 'icon-192.png');
await renderPng(512, 'icon-512.png');

// favicon.ico (PNG 32x32 dentro, aceptado por todos los navegadores modernos)
const icoBuf = await sharp(Buffer.from(svgFor(32))).png().toBuffer();
writeFileSync(join(publicDir, 'favicon.ico'), icoBuf);
console.log('  OK favicon.ico (32x32 PNG)');

console.log('\nDone.');
