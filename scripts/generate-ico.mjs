import pngToIco from 'png-to-ico';
import { writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const publicDir = join(projectRoot, 'public');

// Usamos el favicon en modo claro (negro sobre transparente) como base
// para el .ico, ya que es el que se muestra por defecto en búsquedas de Google.
const sourcePngs = [
  join(publicDir, 'favicon-16x16.png'),
  join(publicDir, 'favicon-32x32.png'),
  join(publicDir, 'favicon-48x48.png'),
];

const icoBuffer = await pngToIco(sourcePngs);
await writeFile(join(publicDir, 'favicon.ico'), icoBuffer);

console.log('✓ favicon.ico regenerado (16, 32, 48 px incluidos)');
