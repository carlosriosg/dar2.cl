// scripts/validate-schema.mjs
// -------------------------------------------------------------
// Valida TODO el JSON-LD del build (dist/**/*.html).
// Uso: npm run build && npm run validate:schema
//
// 1. Extrae cada <script type="application/ld+json"> de cada HTML.
// 2. JSON.parse (detecta errores de sintaxis).
// 3. Chequea campos obligatorios de los tipos que usa DAR2
//    (Article, FAQPage, BreadcrumbList, Review, VideoObject,
//    Service, LocalBusiness/ProfessionalService).
//
// Exit code 1 si hay errores; 0 si todo OK (los avisos no fallan).
// -------------------------------------------------------------
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');

// Recorre dist/ y devuelve todos los .html.
function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (p.endsWith('.html')) out.push(p);
  }
  return out;
}

// Campos minimos por tipo (schema.org + rich results de Google).
const REQUIRED = {
  Article: ['headline', 'datePublished', 'author', 'publisher', 'image'],
  FAQPage: ['mainEntity'],
  BreadcrumbList: ['itemListElement'],
  Review: ['itemReviewed', 'reviewRating', 'author'],
  VideoObject: ['name', 'description', 'thumbnailUrl', 'uploadDate'],
  Service: ['name', 'provider', 'url'],
  LocalBusiness: ['name', 'url', 'address'],
};

const missing = (obj, fields) => fields.filter(f => obj[f] === undefined || obj[f] === null || obj[f] === '');

let errors = 0;
let warnings = 0;
let totalBlocks = 0;

for (const file of walk(dist)) {
  const html = readFileSync(file, 'utf-8');
  const rel = file.replace(dist, '');

  // Regex defensiva: captura los bloques ld+json hasta su cierre </script>.
  const blocks = [...html.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];

  for (const m of blocks) {
    totalBlocks++;
    let json;
    try {
      json = JSON.parse(m[1].trim());
    } catch (e) {
      errors++;
      console.error(`✗ ${rel} — JSON-LD invalido (sintaxis): ${e.message}`);
      continue;
    }

    // El bloque puede ser un objeto unico o un @graph con varios nodos.
    const nodes = Array.isArray(json) ? json : json['@graph'] ? json['@graph'] : [json];

    for (const node of nodes) {
      const types = Array.isArray(node['@type']) ? node['@type'] : [node['@type']];

      for (const t of types) {
        const req = REQUIRED[t];
        if (!req) continue;

        for (const field of missing(node, req)) {
          warnings++;
          console.warn(`⚠ ${rel} — ${t} sin campo requerido: ${field}`);
        }

        if (t === 'FAQPage') {
          const qs = Array.isArray(node.mainEntity) ? node.mainEntity : [];
          if (!qs.length) {
            errors++;
            console.error(`✗ ${rel} — FAQPage.mainEntity vacio o ausente`);
          }
          qs.forEach((q, i) => {
            if (!q.name || !q.acceptedAnswer?.text) {
              errors++;
              console.error(`✗ ${rel} — FAQ ${i} sin name o acceptedAnswer.text`);
            }
          });
        }

        if (t === 'BreadcrumbList') {
          (node.itemListElement ?? []).forEach((li, i) => {
            if (li.position === undefined || !li.item) {
              warnings++;
              console.warn(`⚠ ${rel} — Breadcrumb ${i} sin position o item`);
            }
          });
        }

        if (t === 'Review') {
          // @id references son JSON-LD valido, pero Google pide que
          // itemReviewed tenga nombre para el snippet de resena.
          if (!node.itemReviewed?.name) {
            warnings++;
            console.warn(`⚠ ${rel} — Review.itemReviewed sin name (agregar nombre + @type)`);
          }
          if (!node.author?.name) {
            errors++;
            console.error(`✗ ${rel} — Review.author sin name`);
          }
          if (!node.reviewRating?.ratingValue) {
            errors++;
            console.error(`✗ ${rel} — Review.reviewRating sin ratingValue`);
          }
        }
      }
    }
  }
}

const pages = walk(dist).length;
console.log(`\nResumen: ${totalBlocks} bloques JSON-LD en ${pages} paginas — ${errors} errores, ${warnings} avisos.`);
process.exit(errors ? 1 : 0);
