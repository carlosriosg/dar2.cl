import sharp from 'sharp';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const publicDir = join(projectRoot, 'public');

const width = 1200;
const height = 630;

const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#1a1a1a"/>
  <text x="60" y="180" font-family="Inter, sans-serif" font-size="32" font-weight="700" fill="#FF4500" letter-spacing="4">DAR2</text>
  <text x="60" y="320" font-family="Inter, sans-serif" font-size="72" font-weight="900" fill="#ffffff">Productora</text>
  <text x="60" y="410" font-family="Inter, sans-serif" font-size="72" font-weight="900" fill="#ffffff">audiovisual</text>
  <text x="60" y="500" font-family="Inter, sans-serif" font-size="72" font-weight="900" fill="#FF4500">en Santiago.</text>
  <text x="60" y="570" font-family="Inter, sans-serif" font-size="24" font-weight="400" fill="#999999">15 anos - Streaming - Live Shopping - Videos corporativos</text>
</svg>
`;

await sharp(Buffer.from(svg))
  .png()
  .toFile(join(publicDir, 'og-image.png'));

console.log('OK og-image.png generada (1200x630)');
