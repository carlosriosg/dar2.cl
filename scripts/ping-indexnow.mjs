import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const SITE = 'https://dar2.cl';
const SITEMAP = `${SITE}/sitemap-index.xml`;
const KEY_FILE = join(root, 'public', 'd93f5df9-2ee2-4d32-ad65-163416aed0c5.txt');

async function pingIndexNow(key) {
  const params = new URLSearchParams({ url: SITEMAP, key });
  const url = `https://www.bing.com/indexnow?${params}`;

  const r = await fetch(url, { method: 'GET', redirect: 'manual' });
  const status = r.status;

  if (status === 200 || status === 202) {
    console.log(`OK (${status}) — IndexNow notified for ${SITEMAP}`);
    return true;
  }
  console.error(`ERROR (${status}) — IndexNow rejected the ping`);
  if (r.headers.get('location')) {
    console.error(`Redirected to: ${r.headers.get('location')}`);
  }
  return false;
}

async function main() {
  if (!existsSync(KEY_FILE)) {
    console.error(`Key file not found: ${KEY_FILE}`);
    console.error('Create it first: echo "<uuid>" > public/<uuid>.txt');
    process.exit(1);
  }

  const key = readFileSync(KEY_FILE, 'utf-8').trim();
  console.log(`IndexNow key: ${key}`);
  console.log(`Sitemap URL: ${SITEMAP}`);

  const ok = await pingIndexNow(key);
  process.exit(ok ? 0 : 1);
}

main();
