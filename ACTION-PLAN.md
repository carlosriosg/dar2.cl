# Plan de Acción SEO: dar2.cl

**Fecha:** 2026-06-13 | **Score actual: 72/100** | **Score objetivo: 85/100**

---

## Resumen: Qué mueve la aguja

El sitio está técnicamente completo. El código no es el cuello de botella — **la autoridad de dominio lo es**. Las acciones 1-3 son las únicas que desbloquean la indexación de las 19 páginas atascadas. El resto son optimizaciones que preparan el sitio para capitalizar esa autoridad.

---

## Crítico — Esta semana

### 1. Registrar en Film Commission Chile (.gob.cl)
**Impacto:** Un backlink .gob.cl es la señal de confianza más fuerte disponible para un negocio audiovisual chileno.
**NAP exacto a usar:**
```
DAR2 Servicios Audiovisuales
Av. Holanda 099, Oficina 603
Providencia, Región Metropolitana, Chile
+56 9 9843 3346
dar2@dar2.cl
https://dar2.cl
```
**Esfuerzo:** 1-2h | **Archivo:** Externo (dirfcch.cultura.gob.cl)

### 2. live.dar2.cl — NO eliminar (es sitio legítimo de cliente)
**Corrección importante:** `live.dar2.cl` es la app de **Live Shopping de Radio Futuro** (cliente de DAR2), NO spam. El spam del hackeo viejo (`justsim-lowl.html`, etc.) **ya da 404 — está muerto**. La app está aislada y no contamina el dominio principal.
**Acción opcional:** si `live.dar2.cl` está como propiedad en Search Console, usar "Retiradas" para acelerar la desindexación de las URLs spam viejas. Si no, el 404 las limpia con el tiempo. **NO tocar el DNS.**
**Esfuerzo:** 0 (o 10 min retirada opcional en GSC) | **Archivo:** Externo (GSC, opcional)

### 3. Campaña de reviews (12 → 40+)
**Impacto:** 12 reviews en 15 años es señal débil. Meta: 3/mes.
**Link directo:** `https://g.page/r/CWmX_YPPJ4VcEBM/review`
**Acción:** WhatsApp individual a los últimos 10 clientes con el link.
**Esfuerzo:** 1h | **Archivo:** Externo

### 4. Fix teléfono en schema
**Impacto:** NAP consistency para citaciones automáticas.
**Cambio:** `"telephone": "+56998433346"` → `"telephone": "+56 9 9843 3346"`
**Esfuerzo:** 5 min | **Archivo:** `src/layouts/Base.astro` línea 44

### 5. Fix llms.txt
**Impacto:** Corrección para crawlers AI.
**Cambios:**
- Línea 6: `> Canonical: https://llms.txt` → `> Canonical: https://dar2.cl/llms.txt`
- Línea 79: `of 603` → `Oficina 603`
**Esfuerzo:** 5 min | **Archivo:** `public/llms.txt`

---

## Alta — 2 semanas

### 6. Restringir aggregateRating solo al homepage
**Problema:** 5.0/12 reviews hardcodeado se inyecta en TODAS las páginas (servicios, blog, etc.).
**Fix en Base.astro:**
```js
const organizationSchema = {
  // ... propiedades existentes ...
  ...(isHome && {
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": 5.0,
      "reviewCount": 12,
      "bestRating": 5,
      "worstRating": 1
    }
  })
};
```
**Esfuerzo:** 10 min | **Archivo:** `src/layouts/Base.astro` líneas 68-74

### 7. Fix bug LCP hero shuffle
**Problema:** `initHeroGallery()` reemplaza la imagen preloaded con otra aleatoria. Browser descarga imagen preloaded y luego la descarta.
**Fix en index.astro:**
```js
imgs.forEach((img, i) => {
  if (i === 0) return; // keep the preloaded LCP image
  // ... rest of shuffle logic
});
```
**Esfuerzo:** 15 min | **Archivo:** `src/pages/index.astro`

### 8. Vincular author via @id en blog posts
**Problema:** Articles declaran `author` como inline Person en vez de referenciar el @id global.
**Fix en 12 archivos (10 blog + 2 casos):**
```json
"author": { "@id": "https://dar2.cl/#person" }
```
**Esfuerzo:** 30 min | **Archivos:** `src/pages/blog/*.astro`, `src/pages/casos/*.astro`

### 9. Registrar en Clutch.co
**Impacto:** Directorio B2B Tier 1 + reviews verificados de clientes.
**Esfuerzo:** 2h | **Archivo:** Externo

### 10. Registrar en Bing Places + Apple Business Connect
**Impacto:** Citaciones Tier 1. Importan desde GBP.
**Esfuerzo:** 30 min | **Archivo:** Externo

### 11. Tabla comparativa de precios live shopping
**Impacto:** Activo GEO #1 — tablas son targets de extracción premium para AI.
**Agregar tabla HTML** con columnas: Tier, Precio, Cámaras, Duración, Integración, Caso ideal.
**Esfuerzo:** 1-2h | **Archivo:** `src/pages/blog/cuanto-cuesta-live-shopping-chile.astro`

### 12. Fix Service schema
**Cambios en `[slug].astro`:**
```js
const serviceJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Service',
  'url': `https://dar2.cl/servicios/${s.slug}/`,
  name: s.title,
  provider: { '@id': 'https://dar2.cl/#organization' },
  areaServed: { '@type': 'Country', 'name': 'Chile' },
  description: s.seoDescription ?? s.description,
  serviceType: s.serviceType ?? s.title,
});
```
**Esfuerzo:** 10 min | **Archivo:** `src/pages/servicios/[slug].astro`

---

## Media — 30 días

| # | Acción | Archivo | Esfuerzo |
|---|---|---|---|
| 13 | Expandir caso CASTAÑO (+150-200 palabras contextuales) | `casos/valores-corporativos-castano.astro` | 1h |
| 14 | Agregar fuentes a estadísticas (CCS, China, ROI) con links | 3 blog posts | 1h |
| 15 | Crear caso de éxito live shopping (incluso anonimizado) | Nuevo en `casos/` | 4-6h |
| 16 | Agregar H2 long-tail a streaming ("juntas anuales" + "congresos") | `servicios.js` o template | 1h |
| 17 | Links comerciales desde blog posts a servicios con anchor text | 3 blog posts | 30 min |
| 18 | Investigar/resolver `/privacidad/` duplicada en sitemap | config @astrojs/sitemap | 30 min |
| 19 | Agregar `lastmod` al sitemap automático | `astro.config.mjs` | 30 min |
| 20 | Mejorar seoDescription videos-corporativos (agregar "Santiago" + CTA) | `servicios.js` L416 | 10 min |

---

## Baja — Backlog

| # | Acción | Archivo | Esfuerzo |
|---|---|---|---|
| 21 | Preconnect img.youtube.com | `Base.astro` | 5 min |
| 22 | VideoObject uploadDate con fechas reales de YouTube | 20 `.md` portafolio | 2h |
| 23 | numberOfEmployees en schema organization | `Base.astro` | 5 min |
| 24 | Person Carlos en nosotros.astro con @id `#person` | `nosotros.astro` | 10 min |
| 25 | Fix Reveal.astro FOUC (clase en HTML, no via JS) | `Reveal.astro` | 15 min |
| 26 | Definición live shopping al primer párrafo del artículo | blog live shopping | 20 min |
| 27 | `<figcaption>` en imágenes clave | Varios | 1h |
| 28 | Simplificar @type a solo ProfessionalService | `Base.astro` L31 | 5 min |

---

## Timeline estimado

| Semana | Acciones | Score esperado |
|---|---|---|
| Semana 1 | #1-5 (críticos) | 74/100 |
| Semana 2 | #6-12 (alta) | 78/100 |
| Semana 3-4 | #13-20 (media) | 82/100 |
| Mes 2-3 | Reviews acumulándose, backlinks indexados | 85/100 |
| Mes 4-6 | Páginas desindexadas empiezan a aparecer | Ranking visible |

> **Recordatorio:** el score on-page ya es 77/100. El salto a 85+ vendrá de la **autoridad de dominio** (backlinks + reviews + citaciones), no del código.
