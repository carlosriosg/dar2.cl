// scripts/check-redirects.mjs
// -------------------------------------------------------------
// Verifica que TODAS las variantes de URL (http/https, con/sin www)
// lleguen a https://dar2.cl/ en UN solo salto 301 permanente.
//
// Uso: npm run check:redirects
// Salida: matriz PASS/FAIL por variante + la cadena exacta de saltos.
// -------------------------------------------------------------

const SITE = 'https://dar2.cl';
const variants = [
  { label: 'http://  apex',       url: 'http://dar2.cl/' },
  { label: 'http://  www',        url: 'http://www.dar2.cl/' },
  { label: 'https:// www',        url: 'https://www.dar2.cl/' },
  { label: 'https:// apex (base)', url: 'https://dar2.cl/' },
];

// Sigue la cadena de redirects manualmente (fetch con redirect:manual).
async function trace(url, maxHops = 6) {
  const hops = [];
  let current = url;
  for (let i = 0; i < maxHops; i++) {
    const res = await fetch(current, { redirect: 'manual', signal: AbortSignal.timeout(15000) });
    const to = res.headers.get('location');
    hops.push({ status: res.status, from: current, to });
    if (res.status >= 200 && res.status < 300) break;
    if (!to) break;
    current = new URL(to, current).href;
  }
  return hops;
}

// PASS si: 0 redirects (canonica) o exactamente 1 redirect 301 hacia https apex.
function evaluate(hops) {
  const redirects = hops.filter(h => h.status >= 300 && h.status < 400);
  if (redirects.length === 0) {
    return { ok: true, reason: 'respuesta directa (canonica)' };
  }
  const first = redirects[0];
  const toApex = first.to && first.to.startsWith(SITE);
  const single = redirects.length === 1;
  const permanent = first.status === 301;
  if (single && permanent && toApex) {
    return { ok: true, reason: '1 salto 301 -> https://dar2.cl/' };
  }
  const problems = [];
  if (!permanent) problems.push(`primer salto ${first.status} (debe ser 301)`);
  if (!single) problems.push(`${redirects.length} saltos (debe ser 1)`);
  if (!toApex) problems.push(`destino '${first.to}' no es ${SITE}`);
  return { ok: false, reason: problems.join('; ') };
}

let failures = 0;
for (const v of variants) {
  try {
    const hops = await trace(v.url);
    const chain = hops.map(h => `${h.status}${h.to ? ' -> ' + h.to : ''}`).join('  |  ');
    const verdict = evaluate(hops);
    console.log(`${verdict.ok ? 'PASS' : 'FAIL'}  ${v.label.padEnd(20)} ${chain}`);
    if (!verdict.ok) {
      console.log(`       motivo: ${verdict.reason}`);
      failures++;
    }
  } catch (e) {
    console.log(`FAIL  ${v.label.padEnd(20)} error de red: ${e.message}`);
    failures++;
  }
}

console.log(failures ? `\n${failures} variante(s) fallando.` : '\nTodo en regla: 1 solo salto 301 hacia https://dar2.cl/');
process.exit(failures ? 1 : 0);
