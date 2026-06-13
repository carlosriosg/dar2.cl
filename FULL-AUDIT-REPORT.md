# Auditoría SEO Completa — dar2.cl

**Fecha:** 2026-06-13
**Sitio:** https://dar2.cl/
**Tipo de negocio:** Productora audiovisual B2B, Santiago de Chile (Híbrido: oficina + servicio a domicilio)
**Páginas en sitemap:** 29 (sitemap automático via @astrojs/sitemap)
**Páginas indexadas (GSC, junio 2026):** 15 indexadas / ~19 rastreadas sin indexar

---

## Puntuación SEO Global: 72 / 100

| Categoría | Peso | Puntuación | Ponderado |
|---|---|---|---|
| SEO Técnico | 22% | 82 / 100 | 18.0 |
| Calidad de Contenido (E-E-A-T) | 23% | 74 / 100 | 17.0 |
| SEO On-Page | 20% | 71 / 100 | 14.2 |
| Schema / Datos Estructurados | 10% | 78 / 100 | 7.8 |
| Rendimiento (CWV) | 10% | 80 / 100 | 8.0 |
| AI Search Readiness (GEO) | 10% | 74 / 100 | 7.4 |
| Imágenes | 5% | 85 / 100 | 4.3 |
| **TOTAL** | | | **76.7** |

> **Nota:** el puntaje refleja calidad on-page y técnica. El factor que bloquea el posicionamiento no es el código sino la **autoridad de dominio (DA = 0, cero backlinks)**. Con backlinks y citaciones, el score efectivo de ranking sube significativamente.

---

## Resumen Ejecutivo

### Lo que está bien (no tocar)

El sitio está técnicamente bien construido y por encima de la competencia directa en Santiago:

- **Arquitectura SSG** (Astro, 0 JS de framework) con CSS inline — excelente rendimiento
- **Schema.org completo**: LocalBusiness, Service, FAQPage, Article, BreadcrumbList, VideoObject, Person en cada página
- **Imágenes optimizadas**: pipeline AVIF + WebP + fallback con `<picture>`, srcset responsive, lazy loading
- **FAQ en cada página de servicio** (6-8 preguntas con FAQPage schema) — fuerte señal GEO
- **llms.txt comprensivo** con 30 clientes nombrados — raro y valioso para citación AI
- **robots.txt** permite explícitamente 7 crawlers de AI (GPTBot, ClaudeBot, PerplexityBot, etc.)
- **Canonicals correctos** (self-referencing, verificado en código fuente)
- **hreflang es-CL + x-default** en todas las páginas
- **Security headers** completos (HSTS, CSP, X-Frame-Options, Referrer-Policy)
- **Meta descriptions únicas** por servicio (cada uno tiene `seoDescription` propio en servicios.js)

### Top 5 Problemas Críticos

1. **Autoridad de dominio = 0** — cero backlinks, 19 páginas rastreadas sin indexar. Esto bloquea todo.
2. **Solo 12 reviews en Google** — insuficiente para local pack, señal de autenticidad débil.
3. **Homepage H1 no alineado con keyword principal** — el H1 dice "Producimos live shopping y mucho más", no "Productora audiovisual en Santiago".
4. **AggregateRating hardcodeado (5.0/12)** — se desactualiza, inyectado en TODAS las páginas.
5. **VideoObject uploadDate fabricado** — fechas generadas por hash, no reales.

### Top 5 Quick Wins

1. Corregir teléfono en schema: `+56998433346` → `+56 9 9843 3346` (5 min)
2. Corregir Canonical en llms.txt: `https://llms.txt` → `https://dar2.cl/llms.txt` (5 min)
3. Corregir "of 603" en llms.txt → "Oficina 603" (5 min)
4. Restringir `aggregateRating` solo al homepage (10 min)
5. Vincular `author` en blog posts via `@id` en vez de Person inline (30 min)

---

## 1. SEO Técnico — 82/100

### Crawlability

| Aspecto | Estado | Notas |
|---|---|---|
| robots.txt | PASS | Permite todos los bots + AI crawlers explícitamente |
| Sitemap | PASS | Auto-generado por @astrojs/sitemap, 29 URLs |
| Internal linking | PASS | Cross-linking entre servicios (3 relacionados por servicio) |
| Trailing slash canonical | PASS | nginx redirige `/ruta` → `/ruta/` (301) |
| www redirect | PASS | 301 www.dar2.cl → dar2.cl |

### Problemas encontrados

| Prioridad | Problema | Detalle |
|---|---|---|
| **Media** | Sitemap: `/privacidad/` duplicada | Aparece 2 veces en sitemap-0.xml (URL #19 y #29). Bug de @astrojs/sitemap o config. |
| **Media** | Sitemap sin `lastmod` | Ninguna URL tiene fecha de modificación. Configurar en astro.config.mjs. |
| **Baja** | Comentario HTML desactualizado en Base.astro | Línea 185 dice "WebSite con SearchAction" pero SearchAction fue removido. |

### Seguridad

Todos los headers de seguridad están correctamente configurados en nginx:
- HSTS con includeSubDomains y preload
- CSP con dominios permitidos (behold.so, youtube, web3forms)
- X-Content-Type-Options: nosniff
- X-Frame-Options: SAMEORIGIN
- Permissions-Policy restrictivo

### Mobile

- Viewport meta correcto: `width=device-width, initial-scale=1`
- Tailwind responsive (mobile-first)
- WhatsApp button adapta a mobile (padding/label responsive)
- Nav con hamburger menu en mobile

---

## 2. Calidad de Contenido — 74/100

### E-E-A-T Breakdown

| Dimensión | Puntuación | Fortalezas | Debilidades |
|---|---|---|---|
| **Experiencia** | 17/20 | Casos reales (Clínica Santa María en pabellón, CASTAÑO con 2.000 colaboradores). Blog con datos locales (CLP, CCS). | Solo 3 de 8 miembros del equipo tienen credenciales educativas. |
| **Expertise** | 19/25 | Distinciones técnicas reales (switcher vs Zoom, GMV vs conversión e-commerce). Filtros AR actualizado post-cierre Spark AR. | seoDescription de videos-corporativos sin señal geográfica. |
| **Autoridad** | 18/25 | 40+ clientes enterprise IPSA (Cencosud, Codelco, Banco de Chile). Casos con links a sitios de clientes. | Solo 12 reviews. Cero menciones en prensa, premios, o publicaciones externas. |
| **Confianza** | 20/30 | NAP consistente (verificado en código). HSTS + CSP. Privacy policy existe. | Testimonios anónimos sin Review schema. No hay pricing orientation. |

### Contenido por tipo de página

| Página | Palabras est. | Mínimo | Estado |
|---|---|---|---|
| Homepage | ~1,800 | 500 | PASS |
| Servicios (7 dinámicas) | ~1,200-1,450 | 800 | PASS |
| Blog posts (10) | ~1,500-2,200 | 1,500 | PASS |
| Caso Clínica Santa María | ~980 | 800 | PASS |
| **Caso CASTAÑO** | **~700** | **800** | **FLAG** — contenido fino |
| Nosotros | ~820 | 500 | PASS |

### Problemas de contenido

| Prioridad | Problema | Archivo |
|---|---|---|
| **Alta** | Caso CASTAÑO es fino (~700 palabras vs. ~980 de Santa María). Falta sección contextual equivalente. | `src/pages/casos/valores-corporativos-castano.astro` |
| **Alta** | Estadísticas sin fuente: USD 562B China, 95% CCS, 70% no miden ROI. | `blog/que-es-live-shopping-chile.astro`, `blog/medir-roi-video-corporativo.astro` |
| **Alta** | No hay HowTo schema en posts con pasos numerados. | `blog/que-es-live-shopping-chile.astro`, `blog/produccion-video-corporativo-paso-a-paso.astro` |
| **Media** | H2 de páginas de servicio son idénticos ("¿Qué es y cómo lo producimos?"). | `src/pages/servicios/[slug].astro` |
| **Media** | seoDescription de videos-corporativos sin geo ni diferenciador. | `src/data/servicios.js` línea 416 |
| **Media** | FAQ accordion esconde contenido por defecto (details/summary cerrados). | Todas las páginas de servicio |

### AI Citation Readiness — 68/100

**Lo que funciona:**
- FAQPage schema en cada servicio y blog post — señal #1 para citación AI
- Respuestas FAQ autocontenidas y quotable (ej. "5 a 50 millones de pesos en ventas atribuibles")
- llms.txt con 30 clientes nombrados
- SSG = todo el contenido en HTML raw, sin JS rendering

**Lo que falta:**
- Blog post "Qué es live shopping" no define el concepto en las primeras 40 palabras
- No hay tablas comparativas (pricing tiers, servicios vs. competencia)
- Estadísticas sin links a fuentes externas
- No hay `<figcaption>` en imágenes

---

## 3. SEO On-Page — 71/100

### Titles y Meta Descriptions

| Página | Title | Meta Description | Estado |
|---|---|---|---|
| Home | "Productora Audiovisual Corporativa en Santiago \| DAR2" | Única, 160 chars, con geo + clientes | PASS |
| Servicios index | "Servicios \| DAR2" | Default de Base.astro | FLAG — title genérico |
| Streaming | "Productora de streaming corporativo en Santiago \| DAR2" | Única, con geo y CTA | PASS |
| Live Shopping | Incluye keyword + Chile | Única | PASS |
| Blog index | "Blog de Producción Audiovisual \| DAR2" | Única, con keywords | PASS |
| Contacto | "Contacto — Cotiza tu proyecto en 48h \| DAR2" | Única, con NAP | PASS |

### Heading Structure

**Correcto:** Cada página tiene exactamente 1 `<h1>` (verificado en código fuente). El WebFetch inicial reportó múltiples H1s pero era un error de extracción.

**Problema principal — Homepage H1:**
```html
<h1>
  <span>"Productora audiovisual en Santiago."</span>  <!-- texto pequeño -->
  <span>"Producimos live shopping y mucho más."</span> <!-- texto grande, rotating -->
</h1>
```

Google indexa el texto SSG renderizado: **"Producimos live shopping y mucho más."** — no contiene "productora audiovisual" que es el keyword principal. El `<title>` sí lo contiene, creando un desalineamiento H1/title.

### Internal Linking

- Servicios cross-linkeados (3 relacionados por servicio via `relacionadosMap`)
- Nav con links a todas las secciones principales
- Footer con links a todos los servicios
- Blog posts con breadcrumbs
- **Gap:** blog posts informativos no tienen CTA comercial con anchor text hacia las páginas de servicio

---

## 4. Schema / Datos Estructurados — 78/100

### Implementación actual (correcta)

| Schema | Páginas | Estado |
|---|---|---|
| LocalBusiness + ProfessionalService | Todas (via Base.astro) | PASS |
| WebSite | Solo homepage | PASS |
| Person (Carlos Rios) | Todas (via Base.astro) | PASS |
| BreadcrumbList | Todas excepto home | PASS |
| Service | 8 páginas de servicio | PASS |
| FAQPage | 8 servicios + 10 blog posts | PASS |
| Article | 10 blog posts + 2 casos | PASS |
| VideoObject | Homepage (6) + Portafolio (20) | PASS* |
| CollectionPage | Portafolio | PASS |
| AboutPage | Nosotros | PASS |
| ContactPage | Contacto | PASS |
| Blog + ItemList | Blog index | PASS |

### Problemas

| Prioridad | Problema | Archivo | Fix |
|---|---|---|---|
| **Alta** | `aggregateRating` (5.0/12) hardcodeado en TODAS las páginas | `Base.astro` L68-74 | Restringir solo al homepage: `...(isHome && { aggregateRating })` |
| **Alta** | `VideoObject.uploadDate` fabricado por hash | `index.astro`, `portafolio.astro` | Agregar campo `uploadDate` real en cada `.md` |
| **Media** | `author` en Articles no usa `@id` reference | Todos los blog posts | Cambiar a `{ "@id": "https://dar2.cl/#person" }` |
| **Media** | `Service` sin `url` y `areaServed` es string | `[slug].astro` L44-52 | Agregar `url` + cambiar areaServed a `{ "@type": "Country" }` |
| **Media** | Person de Carlos en nosotros.astro sin `@id` | `nosotros.astro` | Agregar `"@id": "https://dar2.cl/#person"` |
| **Info** | FAQPage en sitios comerciales no genera rich results (desde ago 2023) | Servicios y blog | No requiere cambio — útil para GEO |

---

## 5. Rendimiento (CWV) — 80/100

### Estimación basada en análisis de código (sin CrUX field data)

| Métrica | Desktop | Mobile | Estado |
|---|---|---|---|
| **LCP** | 1.5-2.5s | 2.0-3.5s | Likely Good* |
| **CLS** | ≤0.1 | ≤0.1 | Good |
| **INP** | ≤150ms | ≤150ms | Good |

*\*LCP tiene un bug que lo degrada (ver abajo).*

### Arquitectura de rendimiento (excelente)

- SSG 100% estático, cero hydration
- CSS inline — elimina render-blocking
- Inter variable self-hosted con preload woff2
- AVIF + WebP con `<picture>`, lazy loading
- Cloudflare CDN con Brotli + cache 1 año immutable
- GTM removido
- Solo 2 scripts de terceros: Behold.so (defer) + Web3Forms (solo en submit)

### Problemas

| Prioridad | Problema | Impacto |
|---|---|---|
| **Alta** | **Bug LCP: hero shuffle invalida preload.** `initHeroGallery()` reemplaza la imagen preloaded (`pc-factory.webp`) con otra aleatoria en cada visita. Cuesta ~200-600ms de LCP. | Fijar imagen posición 0 o no shufflear la primera. |
| **Media** | No hay preconnect para `img.youtube.com` | Agregar `<link rel="preconnect">` en Base.astro |
| **Baja** | Reveal.astro FOUC — agrega `is-animated` via JS post-render | Agregar clase en HTML server-side |

### Page Weight

| Recurso | Tamaño |
|---|---|
| Above-the-fold total | ~195-275KB |
| Página completa | ~500-700KB |

Presupuesto de peso excelente.

---

## 6. AI Search Readiness (GEO) — 74/100

| Dimensión | Puntuación |
|---|---|
| Accesibilidad técnica AI | 95/100 |
| Citabilidad | 72/100 |
| Estructura para extracción | 82/100 |
| Contenido multi-modal | 58/100 |
| Señales de autoridad/marca | 62/100 |

### Plataformas AI

| Plataforma | Score estimado | Factor clave |
|---|---|---|
| Google AI Overviews | 68/100 | FAQ schema + SSG, limitado por DA baja |
| Perplexity | 76/100 | llms.txt fuerte + post de precios |
| ChatGPT | 72/100 | OAI-SearchBot permitido, 30 clientes |
| Claude | 80/100 | ClaudeBot permitido, llms.txt bien estructurado |
| Bing Copilot | 65/100 | Sin señales Bing-específicas |

---

## 7. SEO Local — 61/100

### NAP Inconsistencies

| Campo | Schema | Visible | llms.txt | Acción |
|---|---|---|---|---|
| Teléfono | +56998433346 | +56 9 9843 3346 | +56 9 9843 3346 | Fix schema a formato con espacios |
| Dirección | Oficina 603 | oficina 603 | **of 603** | Fix llms.txt a "Oficina 603" |

### Reviews: 12 actuales → meta 40+

- Rating 5.0/5 a 12 reviews puede disparar filtros de autenticidad
- Sin Review schema individual
- Link de review en footer con baja visibilidad
- **Meta:** 3 reviews/mes × 10 meses = 42 reviews

### Citaciones pendientes

| Directorio | Prioridad | Tipo |
|---|---|---|
| Film Commission Chile (.gob.cl) | CRÍTICA | Backlink .gob.cl |
| Clutch.co | ALTA | B2B reviews |
| Bing Places | ALTA | Citation Tier 1 |
| Apple Business Connect | ALTA | Citation Tier 1 |
| ineventos.cl | MEDIA | Directorio industria |

---

## 8. Imágenes — 85/100

- Pipeline completo: AVIF + WebP + fallback con `<picture>` y srcset responsive
- Alt text descriptivo en hero images (heroAltMap)
- Client logos con dimensiones fijas (sin CLS)
- `fetchpriority="high"` en LCP image
- **Gap media:** alt text de service hero images genérico (solo nombre del servicio)
- **Gap baja:** sin `<figcaption>` en imágenes

---

## 9. Search Experience (SXO) — 65/100

### Page-Type Mismatch principal

**"productora audiovisual santiago"** — Google espera una landing page con especialización clara en H1. dar2.cl ofrece un homepage con H1 genérico rotativo. Los demás keywords (streaming, live shopping, estudio virtual) están correctamente alineados con sus páginas de servicio.

### Persona más débil: Jefe de Compras (56/100)

Sin pricing, sin RUT visible, sin PDF ficha técnica, sin ficha de proveedor descargable. Agregar orientación de precios y un documento descargable mejoraría significativamente la conversión B2B.

---

## Subdominio live.dar2.cl (aclaración — NO es spam)

**Corrección:** `live.dar2.cl` es la app de **Live Shopping de Radio Futuro** (cliente de DAR2), legítima y en producción (Next.js sobre Cloudflare). El spam del hackeo anterior (numismática / simuladores de vuelo) **ya da 404 — está muerto**, y las rutas internas de la app están en `noindex`. La app está aislada del dominio principal y no lo contamina. **NO eliminar el subdominio.** Acción opcional: solicitar retirada de las URLs spam viejas en Search Console si live.dar2.cl está como propiedad; de lo contrario, el 404 las desindexa con el tiempo.

---

## Plan de Acción Priorizado

### Crítico (esta semana)

| # | Acción | Esfuerzo |
|---|---|---|
| 1 | Registrar en Film Commission Chile (.gob.cl) con NAP canónico | 1-2h |
| 2 | live.dar2.cl: NO eliminar (es la app de Radio Futuro). Opcional: retirar URLs spam viejas en GSC | 0-10 min |
| 3 | Campaña de reviews — link individual a últimos 10 clientes | 1h |
| 4 | Fix teléfono en schema: `+56 9 9843 3346` — `Base.astro` L44 | 5 min |
| 5 | Fix llms.txt: Canonical URL + "Oficina 603" — `public/llms.txt` | 5 min |

### Alta (2 semanas)

| # | Acción | Esfuerzo |
|---|---|---|
| 6 | Restringir aggregateRating solo al homepage — `Base.astro` | 10 min |
| 7 | Fix bug LCP hero shuffle — no reemplazar imagen pos 0 — `index.astro` | 15 min |
| 8 | Vincular author via @id en blog posts y casos (12 archivos) | 30 min |
| 9 | Registrar en Clutch.co + solicitar 2 reviews | 2h |
| 10 | Registrar en Bing Places + Apple Business Connect | 30 min |
| 11 | Tabla comparativa de precios en blog live shopping | 1-2h |
| 12 | Fix Service schema: url + areaServed tipado — `[slug].astro` | 10 min |

### Media (30 días)

| # | Acción | Esfuerzo |
|---|---|---|
| 13 | Expandir caso CASTAÑO (+150-200 palabras contextuales) | 1h |
| 14 | Agregar fuentes a estadísticas en blog posts | 1h |
| 15 | Crear caso de éxito live shopping | 4-6h |
| 16 | H2 long-tail en streaming: "juntas anuales" + "congresos" | 1h |
| 17 | Links comerciales desde blog posts a servicios | 30 min |
| 18 | Resolver sitemap duplicado `/privacidad/` | 30 min |
| 19 | Agregar lastmod al sitemap — `astro.config.mjs` | 30 min |
| 20 | Mejorar seoDescription videos-corporativos (geo) | 10 min |

### Baja (backlog)

| # | Acción | Esfuerzo |
|---|---|---|
| 21 | Preconnect para img.youtube.com — `Base.astro` | 5 min |
| 22 | VideoObject uploadDate con fechas reales (20 .md) | 2h |
| 23 | numberOfEmployees en schema organization | 5 min |
| 24 | Person Carlos en nosotros.astro vinculado a @id | 10 min |
| 25 | Fix Reveal.astro FOUC | 15 min |
| 26 | Definición live shopping al primer párrafo | 20 min |
| 27 | `<figcaption>` en imágenes clave | 1h |
| 28 | Simplificar @type schema a solo ProfessionalService | 5 min |

---

## Nota sobre el factor limitante

El sitio tiene un puntaje técnico y de contenido de ~77/100, superior a la mayoría de la competencia directa en Santiago. Sin embargo, **el ranking en Google está bloqueado por falta de autoridad de dominio** (DA = 0, cero backlinks, solo 15/29 páginas indexadas).

El código está listo. Lo que falta es ejecución off-page:
1. Directorios (Film Commission Chile, Clutch.co, ineventos.cl)
2. Reviews (12 → 40+)
3. live.dar2.cl: aclarado — app legítima de Radio Futuro, el spam viejo ya da 404 (NO eliminar)
4. Tiempo (las 19 páginas necesitan señales de confianza externas)

Todas las mejoras de código preparan el sitio para capitalizar la autoridad cuando llegue.

---

*Auditoría generada con 7 agentes especializados en paralelo: Technical SEO, Content Quality, Schema Markup, Local SEO, GEO/AI Readiness, Search Experience (SXO), Performance/CWV.*
