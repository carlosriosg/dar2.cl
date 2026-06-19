# Plan de Acción SEO: repuestoverde.cl

**Fecha:** 2026-06-13 | **Score actual: 43/100** | **Score objetivo: 70/100**

---

## Resumen: Qué mueve la aguja

A diferencia de dar2.cl (donde el código está listo y solo falta autoridad), repuestoverde.cl necesita trabajo en **tres frentes simultáneos**: código, credibilidad y autoridad. El fix técnico más urgente (product 404s) desbloquea todo lo demás.

---

## Crítico — Esta semana

### 1. Diagnosticar y fijar product pages 404
**Problema:** Productos en sitemap devuelven 404. Quema crawl budget, destruye rich results.
**Causa probable:** ISR/SSG sin `fallback: 'blocking'`, o sitemap incluye productos eliminados.
**Fix Next.js App Router:**
```js
export const dynamicParams = true;
```
**Fix Next.js Pages Router:**
```js
export async function getStaticPaths() {
  return { paths: [...], fallback: 'blocking' };
}
```
**Para productos eliminados:** devolver 410 Gone (no 404).
**Para sin stock temporal:** mantener página con `availability: OutOfStock` en schema.
**Esfuerzo:** 2-4h | **Impacto:** Crítico — desbloquea indexación de ~600+ productos

### 2. noindex en faceted URLs (duplicados)
**Problema:** `/catalogo?condicion=nuevos`, `/catalogo?tipo=NUEVO_ALTERNATIVO`, etc. crean miles de duplicados.
**Fix:** Agregar en el template de catálogo:
```html
<!-- Solo cuando hay query params de filtro -->
<meta name="robots" content="noindex, follow" />
```
**Esfuerzo:** 30 min | **Impacto:** Elimina crawl budget drain masivo

### 3. noindex en vehicle pages con <20 productos
**Problema:** 280 vehicle model pages, muchas con <20 productos y sin contenido editorial = thin content a escala.
**Fix:** Condicional en el template de vehicle model:
```js
if (products.length < 20) {
  // render <meta name="robots" content="noindex, follow" />
}
```
**Esfuerzo:** 1h | **Impacto:** Previene penalización Helpful Content por páginas thin

### 4. Nombrar un fundador / persona real
**Problema:** Cero personas nombradas en todo el sitio. E-E-A-T = 28/100.
**Acción:**
- Agregar nombre, foto, bio del fundador en /sobre (50-80 palabras)
- Crear una página de autor mínima
- Cambiar byline de blog de "Equipo Repuesto Verde" a nombre real
- Agregar Person schema con @id
**Esfuerzo:** 1h | **Impacto:** Transforma E-E-A-T de anónimo a atribuible

### 5. Agregar teléfono y dirección física
**Problema:** Sin teléfono ni dirección visible. B2B en Chile lo espera. Imposible verificar Google Business Profile.
**Acción:**
- Agregar número (WhatsApp Business es aceptable) en footer, /sobre, y schema
- Agregar dirección en /sobre y schema (habilita LocalBusiness y GBP)
- Agregar RUT visible en /sobre
**Esfuerzo:** 30 min | **Impacto:** Habilita GBP + señal de confianza fundamental

---

## Alto — 2 semanas

### 6. Implementar Product schema en páginas de producto
**Problema:** Sin Product schema = sin rich results, sin Google Shopping eligibility.
**Template recomendado:**
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Foco Trasero Derecho Subaru Outback 2020-2024",
  "image": "https://repuestoverde.cl/images/products/foco-subaru.jpg",
  "description": "...",
  "sku": "RV-12345",
  "mpn": "84251-AN04A",
  "brand": { "@type": "Brand", "name": "Subaru" },
  "offers": {
    "@type": "Offer",
    "url": "https://repuestoverde.cl/catalogo/repuesto/foco-trasero-...",
    "priceCurrency": "CLP",
    "price": "89990",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/UsedCondition",
    "seller": { "@type": "Organization", "name": "Repuesto Verde" },
    "priceValidUntil": "2027-01-01",
    "hasMerchantReturnPolicy": {
      "@type": "MerchantReturnPolicy",
      "applicableCountry": "CL",
      "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
      "merchantReturnDays": 10
    }
  },
  "isCompatibleWith": {
    "@type": "Vehicle",
    "brand": { "@type": "Brand", "name": "Subaru" },
    "model": "Outback"
  }
}
```
**Win inmediato:** los OEM numbers ya visibles en la UI mapean directamente a `mpn`.
**Esfuerzo:** 4-8h | **Impacto:** Habilita Product rich results + Google Shopping

### 7. Cambiar Organization a LocalBusiness + agregar logo
**Fix en schema:**
```json
{
  "@type": "LocalBusiness",
  "name": "Repuesto Verde",
  "logo": {
    "@type": "ImageObject",
    "url": "https://repuestoverde.cl/logo.png",
    "width": 400,
    "height": 100
  },
  "telephone": "+56 9 XXXX XXXX",
  "address": { "@type": "PostalAddress", ... }
}
```
**Esfuerzo:** 1h | **Impacto:** Knowledge Panel + GBP alignment

### 8. Agregar Cloudflare CDN
**Problema:** Sin CDN, cada request va al origin directo. TTFB alto, sin edge caching, sin Brotli automático.
**Acción:** Configurar Cloudflare free tier como reverse proxy.
**Esfuerzo:** 30 min | **Impacto:** TTFB -200-400ms, LCP mejora significativamente

### 9. Fix homepage H1
**Actual:** "Encuentra tu repuesto, de un vendedor verificado y con tu pago protegido"
**Sugerido:** "Marketplace de repuestos automotrices en Chile — vendedores verificados y pago protegido"
**Esfuerzo:** 10 min | **Impacto:** Alineamiento H1/title para keyword principal

### 10. Agregar BlogPosting schema a blog posts
**Cada blog post necesita:**
```json
{
  "@type": "BlogPosting",
  "headline": "...",
  "datePublished": "2026-05-19",
  "dateModified": "2026-05-20",
  "author": {
    "@type": "Person",
    "name": "[Nombre del fundador]",
    "url": "https://repuestoverde.cl/sobre"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Repuesto Verde",
    "logo": { "@type": "ImageObject", "url": "..." }
  },
  "image": "...",
  "mainEntityOfPage": "https://repuestoverde.cl/blog/[slug]"
}
```
**Esfuerzo:** 1h (3 posts) | **Impacto:** Article rich results + E-E-A-T

### 11. Fix llms.txt + mirror
**Cambios en `public/llms.txt`:**
- Agregar sección `## Pages` con URLs de páginas clave (landing pages, blog posts, categorías)
- Agregar `Last-Updated: 2026-06-13`
**Crear:** `public/.well-known/llms.txt` como copia o redirect
**Esfuerzo:** 30 min | **Impacto:** Navegabilidad AI mejorada

### 12. Fix LCP: priority en hero image + scope Mercado Pago SDK
**Fix 1 — Hero image:**
```jsx
<Image src="/hero.jpg" priority alt="..." width={1200} height={600} />
```
**Fix 2 — Mercado Pago solo en checkout:**
```js
// En componente de pago, no en layout global
const { MercadoPago } = await import('@mercadopago/sdk-js');
```
**Esfuerzo:** 1h | **Impacto:** LCP -600ms a -1.2s

---

## Medio — 30 días

| # | Acción | Esfuerzo |
|---|---|---|
| 13 | **Google Merchant Center** — cuenta, feed, verificar dominio, free listings | 4h |
| 14 | **Expandir FAQs de categorías** de 3 a 8 preguntas por categoría | 3h |
| 15 | **Contenido editorial para top 20 vehicle pages** — 200+ palabras c/u (Corolla, Accent, Spark, Hilux, etc.) | 8h |
| 16 | **Crear /para-aseguradoras** — 1,000 palabras, persona alto valor, baja competencia | 3h |
| 17 | **Publicar 2 blog posts/mes** con author byline real y fuentes externas | Ongoing |
| 18 | **MerchantReturnPolicy + ShippingDetails** en Product schema | 2h |
| 19 | **LinkedIn company page** + 3 posts compartiendo blog articles | 2h |
| 20 | **YouTube video** explicativo de 3-5 min (screen recording + voiceover basta) | 1 día |

---

## Bajo — Backlog

| # | Acción | Esfuerzo |
|---|---|---|
| 21 | ISR en catálogo/categorías (revalidate: 1800-3600) | 2h |
| 22 | IndexNow para cambios de inventario (Bing/Yandex) | 2h |
| 23 | Página comparación vs MercadoLibre (buyer-facing) | 3h |
| 24 | Filtro de año en vehicle model pages | 2h |
| 25 | Post-purchase review request flow | 4h |
| 26 | Directorios automotrices chilenos (ANAC, cámaras) | 2h |
| 27 | Fix SoftwareApplication schema (Offer structure + operatingSystem) | 30 min |
| 28 | Virtualizar grids 60+ items con react-window | 4h |
| 29 | Trailing slash enforcement en next.config.js | 30 min |
| 30 | Verificar www → apex 301 y HTTP → HTTPS 301 | 15 min |

---

## Timeline estimado

| Semana | Acciones | Score esperado |
|---|---|---|
| Semana 1 | #1-5 (críticos) | 50/100 |
| Semana 2-3 | #6-12 (alto) | 58/100 |
| Semana 4-8 | #13-20 (medio) | 65/100 |
| Mes 3-6 | Reviews, backlinks, contenido, Google Shopping | 70/100 |

---

## Diferencia clave vs. dar2.cl

| | dar2.cl | repuestoverde.cl |
|---|---|---|
| Código listo | Si | **No** — product 404s, schema ausente, facets sin canonical |
| E-E-A-T | 74/100 | **34/100** — necesita fundador nombrado, teléfono, testimonios |
| Siguiente paso | Off-page (backlinks, reviews) | **Código + credibilidad + autoridad** (los tres) |
| Primer win posible | Ya rankea para algunos términos | `/para-desarmadurias` en "POS gratis desarmaduria" (baja competencia) |

> **Foco:** el primer ranking orgánico realista es `/para-desarmadurias` para "POS gratis desarmaduria" — keyword long-tail con casi cero competencia. Concentrar esfuerzo de link building en esa página primero.
