# Full SEO Audit Report: dar2.cl

**Date:** May 26, 2026
**URL:** https://dar2.cl/
**Business:** DAR2 Servicios Audiovisuales — Productora audiovisual corporativa
**Location:** Av. Holanda 099, Oficina 603, Providencia, Santiago, Chile
**Industry:** Professional Services / Audiovisual Production (B2B)
**CMS:** Astro (Static Site Generator) + Tailwind CSS
**Pages Crawled:** 26

---

## Executive Summary

### Overall SEO Health Score: 63/100

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 22% | 72 | 15.8 |
| Content Quality | 23% | 71 | 16.3 |
| On-Page SEO | 20% | 55 | 11.0 |
| Schema / Structured Data | 10% | 68 | 6.8 |
| Performance (CWV) | 10% | 70 | 7.0 |
| AI Search Readiness (GEO) | 10% | 74 | 7.4 |
| Images | 5% | 60 | 3.0 |
| **TOTAL** | **100%** | | **67.3** |

**Adjusted Score: 63/100** (-4.3 for local SEO score of 58 and SXO gap score of 44, which drag operational effectiveness below the weighted technical score)

### Top 5 Critical Issues

1. ~~**Homepage cannibalizes /servicios/streaming/**~~ ✅ **FIXED** — Homepage retitled to "Productora Audiovisual Corporativa en Santiago | DAR2". Streaming service title shortened to "Streaming Corporativo en Santiago | DAR2" (47 chars).
2. ~~**404 page is indexable**~~ ✅ **FIXED** — Added `noindex={true}` to 404.astro + conditional meta robots in Base.astro layout.
3. ~~**All 8 blog posts published on the same day** (2026-05-19) — signals content dump, undermines freshness~~ ✅ **FIXED** — Dates already staggered from 2026-03-03 to 2026-05-19 (weekly cadence)
4. **Only 12 Google reviews in 15 years** — near-zero review velocity is the #1 local ranking liability
5. ~~**Portfolio page (/portafolio/) is critically thin** — 190 words, zero H2 structure, 19 YouTube embeds with no VideoObject schema~~ ✅ **FIXED** — Expanded with service intro cards, H2 structure, internal links to service pages, VideoObject schema

### Top 5 Quick Wins

1. ~~Add `noindex` to the 404 page template~~ ✅ **DONE**
2. ~~Retitle homepage to "Productora Audiovisual Corporativa en Santiago | DAR2"~~ ✅ **DONE**
3. ~~Standardize NAP address to "Oficina 603" sitewide~~ ✅ **DONE** (commit f531e61)
4. ~~Add `preload` to HSTS header and submit to hstspreload.org (10 min)~~ ✅ **DONE**
5. ~~Increase geo precision in schema from 3 to 5 decimal places~~ ✅ **DONE** (commit f531e61)

---

## 1. Technical SEO (72/100)

### Critical

- ~~**404 page indexable:** Custom 404 at `/404/` serves `robots: index, follow`. Must add `noindex, nofollow`. Also has hreflang tags pointing to `/404/` — remove them.~~ ✅ **FIXED**
- ~~**Sitemap fragmentation:** Two sitemaps cover the same 26 pages. robots.txt only references `sitemap-manual.xml`. Auto-generated chain (`/sitemap.xml` → 301 → `/sitemap-index.xml` → `/sitemap-0.xml`) creates split authority. Consolidate to one.~~ ✅ **FIXED** — nginx.conf redirects `/sitemap.xml` → `/sitemap-manual.xml`, astro.config.mjs suppresses auto-sitemap

### High

- ~~**Duplicate title tag on streaming page:** `/servicios/streaming/` produces 87-character title with "DAR2" appearing twice. All service page titles should be under 60 characters.~~ ✅ **FIXED** (commit f531e61)
- ~~**HSTS missing `preload` directive:** `strict-transport-security` header present but lacks `; preload`. Not eligible for browser HSTS preload lists.~~ ✅ **FIXED** — Added `; preload` to nginx.conf
- **CSP uses `unsafe-inline` for scripts:** Due to GTM usage. Should migrate to nonce-based CSP.

### Medium

- ~~**`/sitemap.xml` returns 301, not 200:** Unnecessary redirect hop.~~ ✅ **FIXED** — Now redirects to `/sitemap-manual.xml`
- ~~**`/sitemap-0.xml` missing `<lastmod>` and `<priority>`:** Only contains `<loc>` entries.~~ ✅ **FIXED** — Auto-sitemap suppressed, manual sitemap is canonical
- **Services hub page duplicate content risk:** Thin hub potentially competing with individual service pages.

### Low

- **No IndexNow key detected:** Adding it enables instant crawl signals for Bing/Yandex.
- **LCP preload may target wrong image:** Preloads portfolio image instead of hero.
- **`Permissions-Policy` missing `interest-cohort`:** Minor audit tool flag.

### Passing

| Check | Status |
|-------|--------|
| HTTPS / TLS (Cloudflare) | PASS |
| `html lang="es-CL"` | PASS |
| Canonical tags (self-referencing) | PASS |
| meta robots (indexable pages) | PASS |
| Viewport meta | PASS |
| JS rendering (Astro SSG) | PASS |
| Structured data blocks | PASS |
| Security headers (CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy) | PASS |
| Font preloading (Inter woff2) | PASS |
| URL structure (trailing slashes, lowercase, hyphens) | PASS |
| H1 count (1 per page on service pages) | PASS |
| Open Graph / Twitter Card | PASS |
| robots.txt AI crawler policy | PASS |

---

## 2. Content Quality & E-E-A-T (71/100)

### E-E-A-T Breakdown

| Factor | Score | Key Strengths | Key Gaps |
|--------|-------|---------------|----------|
| Experience (20%) | 16/20 | Named founder, equipment specifics, 15+ years | No inline project references on service pages |
| Expertise (25%) | 20/25 | Expert blog content, specialized services | No external corroboration, no industry association |
| Authoritativeness (25%) | 17/25 | Enterprise client roster, 40+ annual productions | Only 12 reviews, no Clutch.co, no press coverage |
| Trustworthiness (30%) | 22/30 | Physical address, phone, transparent pricing | Anonymous testimonials |

### Thin Content Pages

| Page | Words | Minimum | Severity |
|------|-------|---------|----------|
| /casos/ (hub) | 185 | 500 | HIGH |
| /portafolio/ | 190 → **500+** | n/a | ~~HIGH~~ ✅ **FIXED** |
| /contacto/ | 214 | 300 | MEDIUM |
| /servicios/ (hub) | 361 | 800 | HIGH |
| /blog/ (hub) | 428 | 500 | MEDIUM |

### Content Freshness

- ~~All 8 blog posts published 2026-05-19 (same day) — **critical freshness signal problem**~~ ✅ **FIXED** — Dates staggered from 2026-03-03 to 2026-05-19
- No `dateModified` values in BlogPosting schema
- Service pages carry no visible "last updated" dates
- Recommendation: stagger publication dates, add `dateModified`, refresh 2 posts per quarter

### AI Citation Readiness: 62/100

| Signal | Status |
|--------|--------|
| FAQ schema on service pages | Present |
| Question-based H2s in blog | Present |
| AI crawlers allowed | Present |
| llms.txt present | Present (non-compliant format) |
| Statistics with source citations | MISSING |
| Key Takeaways summary blocks | MISSING |
| HowTo schema | MISSING |
| YouTube channel entity | MISSING |
| Wikipedia/Wikidata entity | MISSING |

---

## 3. On-Page SEO (55/100)

### Homepage Cannibalization (CRITICAL)

~~The homepage title "Productora de Streaming en Santiago | DAR2" directly competes with `/servicios/streaming/` titled "Productora de Streaming en Santiago | Streaming Corporativo Profesional — DAR2". Both target the same keyword.~~ ✅ **FIXED**

**Fix:** Retitle homepage to "Productora Audiovisual Corporativa en Santiago | DAR2" — the homepage should sell the brand, not one service.

### Service Page Intent Mismatches

| Page | Current Target | SERP Dominant Type | Alignment |
|------|---------------|-------------------|-----------|
| Homepage | productora streaming santiago | Service pages | ~~MISALIGNED~~ ✅ **FIXED** |
| /servicios/streaming/ | streaming corporativo | Service landing | ALIGNED |
| /servicios/live-shopping/ | live shopping chile | Informational (90%) | MISALIGNED |
| /blog/que-es-live-shopping-chile/ | que es live shopping | Blog/editorial | ALIGNED |
| /servicios/videos-corporativos/ | videos corporativos santiago | Service pages | ALIGNED |

### Missing City Modifiers

~~Service page titles and H1s lack geographic modifiers. "Streaming Corporativo" should be "Streaming Corporativo Santiago" or "en Santiago". This is the #1 local organic ranking factor per Whitespark 2026.~~ ✅ **FIXED** — All 8 service seoTitles now include "en Santiago"

### Internal Linking Gaps

- Blog posts link to generic WhatsApp CTA, not to relevant service pages inline
- Case studies not cross-linked from corresponding service pages
- ~~/portafolio/ has 19 YouTube embeds but zero internal links to service pages~~ ✅ **FIXED** — Added service intro cards with internal links

---

## 4. Schema & Structured Data (68/100)

### Implemented (Correct)

- LocalBusiness + ProfessionalService dual typing
- WebSite with publisher @id reference
- FAQPage on all 8 service pages (5 Q&As each)
- BlogPosting with author, dates, publisher
- BreadcrumbList on all pages
- CollectionPage on portfolio
- AggregateRating (5.0, 12 reviews)
- OfferCatalog (8 services)
- ~~VideoObject on portfolio page~~ ✅ **ADDED**

### Critical Issues

| Issue | Severity |
|-------|----------|
| AggregateRating has no linked Review entities or source URL — unverifiable | CRITICAL |
| FAQPage on commercial service pages yields no Google rich results (restricted since Aug 2023) | CRITICAL |

### Warnings

| Issue | Severity |
|-------|----------|
| `image` is single string, should be array with 3 aspect ratios (16:9, 4:3, 1:1) | WARNING |
| `founder` Person lacks `@id`, `url`, `sameAs` — weakens E-E-A-T linkage | WARNING |
| LocalBusiness re-declared on service pages instead of referenced by `@id` | WARNING |
| Blog post `author` Person nodes don't share `@id` with homepage founder node | WARNING |

### Missing Opportunities

| Schema Type | Where | Impact |
|-------------|-------|--------|
| **VideoObject** | Portfolio, case studies, service pages | HIGH — unlocks video rich results ✅ **DONE on portfolio** |
| **BroadcastEvent** | /servicios/streaming/ | MEDIUM — LIVE badge eligibility |
| **ProfilePage** | /nosotros/ for founder | MEDIUM — Knowledge Graph entity |
| **HowTo** | Blog posts with step-by-step content | MEDIUM — rich result eligible |
| **SearchAction** | WebSite block | LOW — sitelinks search box |

---

## 5. Performance / Core Web Vitals (70/100)

*Note: Lab-based analysis only. No CrUX field data or PageSpeed API access.*

### LCP (Largest Contentful Paint)

- **Risk:** GTM loaded synchronously in `<head>` blocks HTML parser before hero image discovery
- **Risk:** Hero image may lack `<link rel="preload">`
- **Risk:** Inter Variable font without `font-display: swap` could delay text LCP

**Fixes:**
1. Add `<link rel="preload" as="image">` for hero image with correct `imagesrcset`
2. Move GTM to async or defer initialization until after LCP
3. Confirm `font-display: swap` on `@font-face` declarations

### INP (Interaction to Next Paint)

- **Low risk:** Astro SSG with minimal client JS
- **Watch:** GTM firing multiple tags on interaction, marquee/lightbox handlers

### CLS (Cumulative Layout Shift)

- **Good:** Picture elements with WebP/AVIF sources
- **Risk:** GTM-injected elements (banners, chat widgets) without reserved space
- **Fix:** Verify all images carry `width` and `height` attributes

### Positive Signals

- Astro SSG = pre-rendered HTML, no client-side rendering dependency
- Images use `<picture>` with WebP + AVIF
- Fonts loaded as woff2 with preload
- Tailwind CSS purged for production
- Minimal JS footprint

---

## 6. AI Search Readiness / GEO (74/100)

### AI Crawler Access: Fully Open

All major AI crawlers explicitly allowed in robots.txt: GPTBot, ClaudeBot, anthropic-ai, PerplexityBot, Google-Extended, ChatGPT-User, OAI-SearchBot.

### llms.txt: Present but Non-Compliant

Found at both `/llms.txt` and `/.well-known/llms.txt`. Contains company info, services, and contact data. Missing RSL 1.0 license declaration and proper structured URL index format.

### Platform Readiness

| Platform | Score | Key Factor |
|----------|-------|------------|
| Perplexity | 78/100 | SSG rendering + question headings well-matched |
| Google AI Overviews | 72/100 | Schema strong; passage length slightly long |
| Bing Copilot | 65/100 | Moderate passage density |
| ChatGPT | 58/100 | No Wikipedia/Wikidata entity, no YouTube presence |

### Key Recommendations

1. Trim blog passages to 134-167 words per section (optimal AI citation window)
2. Source every statistic with inline citations
3. Create YouTube channel (strongest AI citation correlation: r=0.737)
4. Add RSL 1.0 license to llms.txt
5. Create Wikidata entity for DAR2

---

## 7. Local SEO (58/100)

### Dimension Scores

| Dimension | Score |
|-----------|-------|
| GBP Signals | 52/100 |
| Reviews & Reputation | 60/100 |
| Local On-Page SEO | 72/100 |
| NAP Consistency | 55/100 |
| Local Schema | 68/100 |
| Local Links & Authority | 35/100 |

### NAP Consistency Issues

- ~~Footer uses "of 603" vs Schema uses "Oficina 603" — standardize~~ ✅ **FIXED**
- Phone format varies: spaced vs unspaced across page elements
- E.164 format in schema (`+56998433346`) is correct

### Review Velocity Crisis

12 reviews over 15 years = ~0.8 reviews/year. Per Sterling Sky's 18-day rule, review velocity is a cliff-edge ranking factor. This is the single largest local ranking liability.

### Missing Local Signals

- No GBP review badge or live data widget on site
- No `priceRange` or `hasMap` in schema
- No Chilean business directories (Páginas Amarillas, Cylex, Hotfrog)
- No industry association memberships documented
- ~~Missing RUT (Chilean tax ID) for B2B trust~~ ✅ **FIXED** — Added to contact page and footer
- No neighborhood/landmark copy on contact page

---

## 8. SXO / Search Experience (44/100)

### Page-Type Mismatches

~~The homepage attempts to rank for "productora streaming santiago" but delivers a multi-service hub — Google rewards dedicated service pages for this query.~~ ✅ **FIXED** Meanwhile, `/servicios/live-shopping/` targets "live shopping chile" but this SERP is 90% informational/editorial content.

### Persona Scores

| Persona | Score | Biggest Gap |
|---------|-------|-------------|
| Corporate Event Planner | 50/100 | No pricing/scope detail, generic CTAs |
| Marketing Director (Live Shopping) | 41/100 | No retail case studies, no conversion metrics |
| Procurement Officer (Videos) | 55/100 | No deliverables spec, no turnaround time |

### Key Fixes

1. ~~Retitle homepage to eliminate streaming keyword overlap~~ ✅ **DONE**
2. Retarget live shopping service page to "produccion live shopping para empresas"
3. Add social proof (named clients, metrics) to every service page
4. Replace generic CTAs with service-specific ones ("Cotiza tu evento en vivo")

---

## 9. Sitemap Analysis

### Structure

| Sitemap | URLs | lastmod | changefreq | priority |
|---------|------|---------|------------|----------|
| sitemap-manual.xml | 26 | Missing | Present | Present |
| sitemap-0.xml (auto) | 26 | Fabricated (all same timestamp) | Missing | Missing |

### Issues

- ~~**HIGH:** All lastmod values in sitemap-0.xml are identical (build timestamp) — Google ignores/devalues this~~ ✅ **FIXED** — Auto-sitemap suppressed
- ~~**MEDIUM:** Duplicate sitemaps with no declared relationship~~ ✅ **FIXED** — Consolidated to sitemap-manual.xml
- **INFO:** priority and changefreq are ignored by Google

### Recommendation

~~Consolidate into one `/sitemap.xml` with real lastmod dates. Remove priority and changefreq. Update robots.txt to reference the single sitemap.~~ ✅ **DONE**

---

## 10. Images Assessment (60/100)

### Strengths

- Modern format support: `<picture>` elements with WebP and AVIF sources
- Portfolio images have descriptive alt text (e.g., "Cirugía Robótica — Clínica Santa María")
- Logo uses proper alt text on service pages

### Issues

| Issue | Severity | Pages Affected |
|-------|----------|---------------|
| Some service card images use generic alt text | MEDIUM | Homepage |
| ~~Portfolio page has 19 YouTube embeds with no VideoObject schema~~ | ~~HIGH~~ | ~~/portafolio/~~ ✅ **FIXED** |
| No `<link rel="preload">` confirmed for hero images | MEDIUM | All pages |
| Image dimensions may not be explicitly set on all `<picture>` elements | MEDIUM | TBD |

---

## Appendix: Site Structure

```
dar2.cl/
├── / (Homepage)
├── /servicios/ (Services hub)
│   ├── /streaming/
│   ├── /live-shopping/
│   ├── /circuito-cerrado/
│   ├── /estudio-virtual/
│   ├── /videos-corporativos/
│   ├── /estrategias-digitales/
│   ├── /redes-sociales/
│   └── /filtros-ar/
├── /portafolio/ (Portfolio)
├── /casos/ (Case studies hub)
│   ├── /cirugia-robotica-clinica-santa-maria/
│   └── /valores-corporativos-castano/
├── /blog/ (Blog hub)
│   ├── /que-es-live-shopping-chile/
│   ├── /transmitir-junta-anual-sin-caidas/
│   ├── /estudio-virtual-vs-set-fisico/
│   ├── /medir-roi-video-corporativo/
│   ├── /filtros-ar-marca-instagram-tiktok/
│   ├── /circuito-cerrado-vs-streaming/
│   ├── /contenido-linkedin-ejecutivos/
│   └── /produccion-video-corporativo-paso-a-paso/
├── /nosotros/ (About)
├── /contacto/ (Contact)
└── /privacidad/ (Privacy Policy)
```

**Total: 26 pages | 8 services | 8 blog posts | 2 case studies**
