import sharp from 'sharp';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const publicDir = join(projectRoot, 'public');
const sourceLight = join(publicDir, 'images', 'galeria', 'icon.png');   // blanco (para modo oscuro)
const sourceDark  = join(publicDir, 'images', 'galeria', 'icon-dark.png'); // negro (para modo claro)

if (!existsSync(sourceLight)) { console.error(`ERROR: No existe ${sourceLight}`); process.exit(1); }
if (!existsSync(sourceDark))  { console.error(`ERROR: No existe ${sourceDark}`);  process.exit(1); }

const outputs = [
  // Modo claro (icono negro)
  { source: sourceDark,  size: 16,  name: 'favicon-16x16.png' },
  { source: sourceDark,  size: 32,  name: 'favicon-32x32.png' },
  { source: sourceDark,  size: 48,  name: 'favicon-48x48.png' },
  { source: sourceDark,  size: 180, name: 'apple-touch-icon.png' },
  { source: sourceDark,  size: 192, name: 'icon-192.png' },
  { source: sourceDark,  size: 512, name: 'icon-512.png' },
  // Modo oscuro (icono blanco)
  { source: sourceLight, size: 16,  name: 'favicon-16x16-dark.png' },
  { source: sourceLight, size: 32,  name: 'favicon-32x32-dark.png' },
  { source: sourceLight, size: 48,  name: 'favicon-48x48-dark.png' },
  { source: sourceLight, size: 192, name: 'icon-192-dark.png' },
  { source: sourceLight, size: 512, name: 'icon-512-dark.png' },
];

console.log('Generando favicons...\n');
for (const out of outputs) {
  const destPath = join(publicDir, out.name);
  await sharp(out.source)
    .resize(out.size, out.size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(destPath);
  console.log(`  OK ${out.name} (${out.size}x${out.size})`);
}
console.log('\nFavicons generados en public/');
