// scripts/indexnow-post.mjs
// -------------------------------------------------------------
// Envia un lote de URLs a la API de IndexNow (POST / batch).
// IndexNow es el protocolo de indexacion inmediata que usan
// Bing, Yandex, Seznam y Naver. Google NO participa en IndexNow.
//
// Uso:
//   node scripts/indexnow-post.mjs https://dar2.cl/blog/x/ https://dar2.cl/servicios/y/
//   node scripts/indexnow-post.mjs          # sin args: toma las URLs del sitemap
//
// Requisitos previos (ya cumplidos en este repo):
//   1. public/<KEY>.txt existe y es servido en https://dar2.cl/<KEY>.txt
//   2. La key coincide con la de arriba (unica fuente de verdad).
// -------------------------------------------------------------
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const HOST = 'dar2.cl';
const KEY = 'd93f5df9-2ee2-4d32-ad65-163416aed0c5'; // clave publica, esta en public/<KEY>.txt
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const SITEMAP_LOCAL = join(root, 'dist', 'sitemap-0.xml');   // sitemap del ultimo npm run build
const SITEMAP_REMOTE = `https://${HOST}/sitemap-0.xml`;        // sitemap en produccion

// Extrae las URLs <loc> de un sitemap XML.
function parseSitemap(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
}

// 1. Resolver la lista de URLs: args de CLI > sitemap local (dist/) > sitemap en produccion.
async function resolveUrls(argv) {
  const explicit = argv.slice(2).filter(a => a.startsWith('http'));
  if (explicit.length) return explicit;

  if (existsSync(SITEMAP_LOCAL)) {
    const urls = parseSitemap(readFileSync(SITEMAP_LOCAL, 'utf-8'));
    if (urls.length) return urls;
  }

  try {
    const res = await fetch(SITEMAP_REMOTE);
    if (res.ok) {
      const urls = parseSitemap(await res.text());
      if (urls.length) return urls;
    }
  } catch {
    // silencioso: caemos al error informativo de abajo
  }

  console.error('No se pudieron obtener URLs. Pasalas como argumentos o ejecuta primero npm run build.');
  process.exit(1);
}

// 2. POST a la API de IndexNow (hasta 10.000 URLs por request, limite 10 MB).
async function post(urls) {
  const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: urls };

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });

  if (res.status === 200 || res.status === 202) {
    console.log(`OK (${res.status}) — ${urls.length} URLs enviadas a IndexNow.`);
    return true;
  }
  console.error(`ERROR (${res.status}) — IndexNow rechazo el lote:`);
  console.error(await res.text());
  return false;
}

const urls = await resolveUrls(process.argv);
console.log(`Enviando ${urls.length} URLs a ${ENDPOINT} ...`);
process.exit((await post(urls)) ? 0 : 1);
