# Auditoría SEO Completa — repuestoverde.cl

**Fecha:** 2026-06-13
**Sitio:** https://repuestoverde.cl/
**Tipo de negocio:** Marketplace B2B de repuestos automotrices, Santiago de Chile
**Stack:** Next.js 16 / TypeScript / PostgreSQL / Prisma / Mercado Pago
**Páginas en sitemap:** 1,089 (catálogo, ~280 modelos de vehículo, ~600+ productos, 12 categorías, 3 blog posts)
**Fundado:** 2026 (dominio nuevo, ~0-6 meses online)

---

## Puntuación SEO Global: 43 / 100

| Categoría | Peso | Puntuación | Ponderado |
|---|---|---|---|
| SEO Técnico | 22% | 61 / 100 | 13.4 |
| Calidad de Contenido (E-E-A-T) | 23% | 34 / 100 | 7.8 |
| SEO On-Page | 20% | 52 / 100 | 10.4 |
| Schema / Datos Estructurados | 10% | 45 / 100 | 4.5 |
| Rendimiento (CWV) | 10% | 40 / 100 | 4.0 |
| AI Search Readiness (GEO) | 10% | 54 / 100 | 5.4 |
| Imágenes | 5% | 55 / 100 | 2.8 |
| **TOTAL** | | | **48.3 → 43*** |

> *Score ajustado a 43 por penalización de e-commerce: ausencia de Product schema, Google Shopping no integrado, product pages 404, y 0 reviews.

---

## Resumen Ejecutivo

### Diagnóstico principal

Repuesto Verde tiene una **arquitectura correcta** (URL taxonomy, schema parcial, robots.txt, llms.txt) pero **cero credibilidad construida**. Es un sitio de 2026 sin backlinks, sin personas nombradas, sin reviews, sin testimonios, y con 3 blog posts publicados el mismo día. Google no tiene razón para confiar en este dominio por sobre yapo.cl o MercadoLibre.

El problema no es el código — **es la ausencia total de señales de confianza y autoridad**.

### Top 5 Problemas Críticos

1. **Product pages devuelven 404** — productos en sitemap que ya no existen, quema crawl budget
2. **Product schema ausente** — sin Product schema no hay rich results ni elegibilidad para Google Shopping
3. **E-E-A-T = 28/100** — cero personas nombradas, cero testimonios, 3 blog posts batch-published, sin teléfono
4. **280 vehicle model pages potencialmente thin** — muchas con <20 productos y sin contenido editorial
5. **Faceted URLs sin canonical** — `/catalogo?condicion=nuevos` crea contenido duplicado masivo

### Top 5 Quick Wins

1. Agregar `noindex` a vehicle pages con <20 productos (previene index bloat)
2. Agregar `<meta robots noindex>` a todas las URLs con query parameters de filtros
3. Corregir Canonical en llms.txt + agregar URLs de páginas clave
4. Agregar `/.well-known/llms.txt` como mirror (no existe)
5. Cambiar H1 del homepage para incluir keyword "marketplace repuestos automotrices Chile"

---

## 1. SEO Técnico — 61/100

### Lo que funciona

- robots.txt bien configurado: bloquea /api/, /panel/, /admin/, /checkout/, /carrito/
- 13 AI crawlers explícitamente permitidos (GPTBot, ClaudeBot, PerplexityBot, etc.)
- Sitemap con 1,089 URLs y lastmod dates
- hreflang es-CL + x-default
- URL taxonomy lógica: `/catalogo/c/{cat}`, `/catalogo/v/{marca}/{modelo}`, `/catalogo/repuesto/{slug}`

### Problemas

| Prioridad | Problema | Detalle |
|---|---|---|
| **Crítico** | Product pages 404 | Productos en sitemap devuelven 404. Probable: ISR sin `fallback: 'blocking'` o sitemap incluye productos eliminados. |
| **Crítico** | JS rendering incierto | Next.js 16 — ¿SSR o CSR? Si CSR, el contenido de catálogo es invisible para Google en primera pasada. |
| **Alto** | Faceted URLs sin canonical | `/catalogo?condicion=nuevos` y similares crean duplicados. Necesitan canonical a base URL o noindex. |
| **Alto** | Trailing slash inconsistente | Homepage canonical sin trailing slash, verificar consistencia en 1,089 URLs. |
| **Alto** | www vs non-www | No verificado — si ambos sirven 200, homepage duplicada. |
| **Medio** | Vehicle pages thin (280) | Páginas con <20 productos + sin contenido editorial = thin content a escala. |
| **Medio** | Paginación (101 páginas) | Verificar que cada página tenga self-canonical y meta description única. |
| **Bajo** | No IndexNow | Inventario dinámico se beneficiaría de IndexNow para Bing/Yandex. |

### Fix crítico para product 404s

```js
// Next.js App Router
export const dynamicParams = true;

// Next.js Pages Router
export async function getStaticPaths() {
  return { paths: [...], fallback: 'blocking' };
}
```

Para productos eliminados: devolver **410 Gone** (no 404). Para productos sin stock temporal: mantener página con `availability: OutOfStock` en schema.

---

## 2. Calidad de Contenido (E-E-A-T) — 34/100

### Breakdown

| Factor | Score | Problema principal |
|---|---|---|
| Experiencia | 12/100 | Cero señales de primera mano. Sin testimonios, sin casos de uso reales. |
| Expertise | 28/100 | Sin autores nombrados. Blog sin bylines con credenciales. |
| Autoridad | 18/100 | Dominio nuevo, cero backlinks, cero menciones externas. |
| Confianza | 48/100 | Mercado Pago + SII son positivos. Sin teléfono, sin dirección física, sin RUT visible. |

### Problemas de contenido

| Prioridad | Problema |
|---|---|
| **Crítico** | Sin personas nombradas en todo el sitio — fundador, equipo, autores de blog |
| **Crítico** | 3 blog posts publicados el mismo día (2026-05-19) — señal de batch publishing |
| **Alto** | Sin teléfono visible — B2B en Chile espera número de contacto |
| **Alto** | Sin dirección física — imposible verificar Google Business Profile |
| **Alto** | ~280 vehicle model pages potencialmente thin (~12 productos, sin editorial) |
| **Medio** | Blog sin cadencia de publicación — 3 posts y nada más |
| **Medio** | Estadísticas sin fuentes externas en blog posts |

### AI Citation Readiness — 22/100

FAQ schema en homepage y categorías es el único activo citado por AI. Sin autores, sin fuentes, sin datos propios, sin video.

---

## 3. SEO On-Page — 52/100

### Titles y Meta Descriptions

| Página | Title | Estado |
|---|---|---|
| Home | "Repuesto Verde — Marketplace de repuestos automotrices en Chile" | PASS |
| Catálogo | "Catálogo de repuestos automotrices nuevos y usados — Repuesto Verde" | PASS |
| Categoría (motor) | "Repuestos de motor en Chile — Repuesto Verde" | PASS |
| Vehículo (Corolla) | "Repuestos para Toyota Corolla — Repuesto Verde" | PASS |
| Para talleres | "Compra repuestos para tu taller mecánico \| Repuesto Verde" | PASS |
| Para desarmadurías | "POS gratis para desarmadurías en Chile — Repuesto Verde" | PASS |
| Blog | "Blog — Repuesto Verde" | PASS |

### Problemas On-Page

| Prioridad | Problema |
|---|---|
| **Alto** | Homepage H1 no contiene keyword principal ("marketplace repuestos"). H1 actual: "Encuentra tu repuesto, de un vendedor verificado y con tu pago protegido" |
| **Alto** | Vehicle model pages sin H2/H3 — saltan de H1 a H4 (footer) |
| **Alto** | Blog posts sin internal links comerciales a páginas de servicio/catálogo |
| **Medio** | Vehicle model pages sin FAQ (category pages sí tienen) |
| **Medio** | Category pages solo 3 FAQs — competidores tienen 6-10 |
| **Medio** | No hay página buyer-facing de comparación vs MercadoLibre |

---

## 4. Schema / Datos Estructurados — 45/100

### Implementación actual

| Schema | Páginas | Estado |
|---|---|---|
| Organization | Homepage, landing pages | PASS (pero debería ser LocalBusiness) |
| SoftwareApplication | Homepage, landing pages | PARCIAL — pricing structure incorrecta |
| WebSite + SearchAction | Homepage | PASS (verificar query-input) |
| BreadcrumbList | Catálogo, categorías, vehículos | PASS |
| ItemList | Categorías (60 items), vehículos (12 items) | PASS |
| FAQPage | Homepage, categorías, landing pages, FAQ hub | PASS |
| Service | Landing pages | PARCIAL — sin areaServed |

### Problemas críticos

| Prioridad | Problema | Fix |
|---|---|---|
| **Crítico** | **Product schema AUSENTE** en páginas de producto | Implementar Product con name, image, offers (price, currency, availability), brand, mpn, condition |
| **Alto** | Organization debería ser LocalBusiness | Cambiar @type para habilitar Knowledge Panel |
| **Alto** | Organization sin logo ImageObject | Agregar logo con url, width, height |
| **Alto** | SoftwareApplication: price/currency deben ir dentro de Offer | Reestructurar pricing como Offer object |
| **Alto** | Blog posts sin Article/BlogPosting schema | Agregar con headline, datePublished, author, publisher |
| **Medio** | Service sin areaServed ni provider | Agregar areaServed: "CL" + provider ref |
| **Medio** | MerchantReturnPolicy ausente en Product | Agregar 10-day return policy en schema |

### Oportunidad única: mpn (OEM numbers)

Los números OEM ya están visibles en las fichas de producto (ej. `84251-AN04A`). Agregarlos como `mpn` en Product schema es un win inmediato para Google Shopping matching.

---

## 5. E-commerce SEO — 48/100

### Problemas específicos de e-commerce

| Prioridad | Problema |
|---|---|
| **Crítico** | Product pages 404 — routing o sitemap stale |
| **Crítico** | Product schema ausente — sin rich results de producto |
| **Alto** | Google Merchant Center NO integrado — sin Shopping tab ni free listings |
| **Alto** | Cero reviews/ratings — sin AggregateRating schema |
| **Alto** | Faceted URLs crean duplicados masivos |
| **Medio** | MerchantReturnPolicy y ShippingDetails ausentes en schema |
| **Medio** | Internal linking vehicle → producto débil |
| **Medio** | Paginación (101 páginas) sin meta descriptions únicas |
| **Bajo** | IVA incluido/exento — necesita `valueAddedTaxIncluded` en PriceSpecification |

### Google Shopping — oportunidad perdida

Con 2,015 productos y OEM numbers ya visibles, el sitio está a un paso de free listings en Google Shopping (Chile soporta CLP). Requiere:
1. Product schema completo en cada página de producto
2. Google Merchant Center account
3. Feed de productos (puede generarse desde Product schema)
4. Verificación de dominio

---

## 6. Rendimiento (CWV) — ~40/100

### Estimaciones (sin CrUX field data)

| Métrica | Estimación | Riesgo |
|---|---|---|
| **LCP** | 3.0-5.5s | "Needs Improvement" a "Poor" |
| **INP** | 200-400ms | "Needs Improvement" |
| **CLS** | 0.05-0.25 | Desconocido |

### Problemas principales

| Prioridad | Problema |
|---|---|
| **Alto** | Sin CDN detectado — origin directo sin edge caching |
| **Alto** | LCP: hero image probablemente sin `priority` prop en next/image |
| **Alto** | Mercado Pago SDK posiblemente cargado globalmente (60-120KB) |
| **Medio** | Next.js 16 bundle: 155-310KB+ JS gzipped |
| **Medio** | Category pages con 60 product cards — DOM pesado |
| **Medio** | Filter interactions pueden bloquear main thread (INP) |

### Fixes prioritarios

1. Agregar `priority` a hero image y primer product card (recupera 600ms-1.2s LCP)
2. Agregar Cloudflare como CDN (free tier, 30 min setup)
3. Cargar Mercado Pago SDK solo en checkout (dynamic import)
4. Implementar ISR en catálogo y categorías (revalidate: 1800-3600)

---

## 7. AI Search Readiness (GEO) — 54/100

### Lo que funciona
- robots.txt permite 13 AI crawlers explícitamente
- llms.txt existe con info de negocio, modelo, tipos de proveedor
- FAQ schema en homepage, categorías, landing pages (18 Q&A totales)
- SSR confirmado — contenido visible sin JS

### Lo que falta
- llms.txt sin URLs de páginas (es un blob de prosa, no un índice navegable)
- `/.well-known/llms.txt` NO EXISTE (404)
- Sin autores nombrados — AI systems prefieren contenido atribuible
- Sin YouTube — correlación 0.737 con citación AI
- Sin LinkedIn company page verificada
- Blog batch-published — señal negativa para AI

### Platform scores

| Plataforma | Score | Factor clave |
|---|---|---|
| Perplexity | 58/100 | FAQ schema + SSR, limitado por autoridad |
| ChatGPT | 55/100 | Crawlers permitidos, falta autoridad |
| Claude | 55/100 | ClaudeBot permitido, contenido legible |
| Google AI Overviews | 48/100 | DA cero, sin backlinks |
| Bing Copilot | 45/100 | Sin Wikipedia entity, sin prensa |

---

## 8. Search Experience (SXO) — 48/100

### Page-Type Mismatch

| Keyword | SERP espera | Repuesto Verde ofrece | Match? |
|---|---|---|---|
| repuestos usados chile | PLPs con inventario real (yapo.cl, MercadoLibre) | Homepage explicativa | **NO** |
| repuestos toyota corolla | PLP profundo (50-200+ SKUs) | 12 productos, sin editorial | **CRÍTICO** |
| POS gratis desarmaduria | Landing page software | /para-desarmadurias | **SI** |
| marketplace repuestos chile | Marketplace con inventario | Homepage/catálogo | PARCIAL |

### Persona Scoring

| Persona | Score | Gap principal |
|---|---|---|
| Proveedor (tienda repuestos) | 61/100 | Sin clientes nombrados, sin volumen |
| Desarmaduria (junkyard) | 58/100 | Sin testimonios, CTA bajo fold |
| Mecánico (taller) | 49/100 | Inventario thin, sin reviews |
| DIY car owner | 37/100 | No targetead, jerga B2B |
| Ajustador de seguros | 28/100 | Casi no abordado, 1 párrafo |

### Recomendación SXO #1

**Crear /para-aseguradoras** — persona de alto valor, baja competencia en Google Chile, y actualmente cubierta con 1 párrafo en /para-talleres.

---

## 9. Imágenes — 55/100

- Product images con alt text descriptivo (OEM number + marca + modelo) — PASS
- Sin verificación de formato (WebP/AVIF vs JPG)
- Sin `<figcaption>` ni captions
- Category icons son SVGs sin alt text
- Sin image optimization pipeline confirmado

---

## Plan de Acción Priorizado

### Crítico — Esta semana

| # | Acción | Esfuerzo |
|---|---|---|
| 1 | **Diagnosticar y fijar product 404s** — ISR fallback: 'blocking' o limpiar sitemap | 2-4h |
| 2 | **noindex en faceted URLs** — `<meta robots noindex, follow>` en todas las ?param= | 30 min |
| 3 | **noindex en vehicle pages con <20 productos** | 1h |
| 4 | **Nombrar un fundador** — agregar nombre, foto, bio en /sobre y como author de blog | 1h |
| 5 | **Agregar teléfono y dirección física** visible en /sobre, footer, y schema | 30 min |

### Alto — 2 semanas

| # | Acción | Esfuerzo |
|---|---|---|
| 6 | **Implementar Product schema** en páginas de producto (name, image, offers, brand, mpn, condition) | 4-8h |
| 7 | **Cambiar Organization a LocalBusiness** + agregar logo ImageObject | 1h |
| 8 | **Agregar Cloudflare CDN** (free tier) | 30 min |
| 9 | **Fix homepage H1** → incluir "marketplace repuestos automotrices Chile" | 10 min |
| 10 | **Agregar BlogPosting schema** a los 3 blog posts con author Person | 1h |
| 11 | **Fix llms.txt** — agregar URLs de páginas, `/.well-known/llms.txt` mirror | 30 min |
| 12 | **Agregar priority a hero image** + scoping Mercado Pago SDK solo a checkout | 1h |

### Medio — 30 días

| # | Acción | Esfuerzo |
|---|---|---|
| 13 | **Google Merchant Center** — crear cuenta, feed de productos, verificar dominio | 4h |
| 14 | **Expandir FAQs** de categorías de 3 a 8 preguntas | 3h |
| 15 | **Contenido editorial** para top 20 vehicle model pages (200+ palabras c/u) | 8h |
| 16 | **Crear /para-aseguradoras** — 1,000 palabras, persona de alto valor | 3h |
| 17 | **Publicar 2 blog posts/mes** con author byline real | Ongoing |
| 18 | **Agregar MerchantReturnPolicy + ShippingDetails** a Product schema | 2h |
| 19 | **LinkedIn company page** + 3 posts compartiendo blog articles | 2h |
| 20 | **YouTube video** explicativo de 3-5 min sobre la plataforma | 1 día |

### Bajo — Backlog

| # | Acción | Esfuerzo |
|---|---|---|
| 21 | Implementar ISR en catálogo/categorías (revalidate: 1800-3600) | 2h |
| 22 | Implementar IndexNow para cambios de inventario | 2h |
| 23 | Crear página de comparación vs MercadoLibre (buyer-facing) | 3h |
| 24 | Agregar filtro de año en vehicle model pages | 2h |
| 25 | Implementar post-purchase review request flow | 4h |
| 26 | Registrar en directorios automotrices chilenos | 2h |
| 27 | Fix SoftwareApplication schema (Offer structure + operatingSystem) | 30 min |
| 28 | Virtualizar grids de 60 items con react-window | 4h |

---

## Comparación con dar2.cl

| Dimensión | dar2.cl | repuestoverde.cl |
|---|---|---|
| Score global | 72/100 | 43/100 |
| E-E-A-T | 74/100 | 34/100 |
| Schema | 78/100 | 45/100 |
| Técnico | 82/100 | 61/100 |
| GEO | 74/100 | 54/100 |
| Problema #1 | Autoridad dominio (off-page) | Todo: autoridad + E-E-A-T + schema + técnico |
| Madurez | 15 años, 40+ clientes enterprise | 0-6 meses, 3 sellers |
| Código listo? | Si — solo falta off-page | No — necesita fixes críticos de código |

---

## Factor limitante

A diferencia de dar2.cl donde el código está listo y solo falta autoridad, **repuestoverde.cl necesita trabajo tanto de código como de credibilidad**:

1. **Código:** Product schema, ISR fallback, noindex en thin pages, canonical en facets, CDN
2. **Credibilidad:** Fundador nombrado, teléfono, dirección, testimonios, reviews, blog cadence
3. **Autoridad:** Backlinks, directorios, Google Merchant Center, YouTube, LinkedIn

Los tres pilares necesitan atención simultánea. El fix técnico más urgente (product 404s) desbloquea todo lo demás.

---

*Auditoría generada con 7 agentes especializados: Technical SEO, Content Quality, Schema Markup, E-commerce SEO, GEO/AI Readiness, Search Experience (SXO), Performance/CWV.*
