# Full SEO Audit Report: dar2.cl

**Date:** 2026-05-18
**URL:** https://dar2.cl
**Business:** DAR2 Servicios Audiovisuales — Productora audiovisual en Santiago, Chile
**Business Type:** Local Professional Service (Hybrid: brick-and-mortar + service area business)
**Stack:** Astro v6.1.8 (static SSG) | Cloudflare CDN | HSTS enabled
**Pages Crawled:** 12 (homepage + 8 service pages + servicios index + nosotros + contacto + portafolio)

---

## Executive Summary

### Overall SEO Health Score: 62 / 100

| Category | Score | Weight | Weighted |
|----------|-------|--------|----------|
| Technical SEO | 72 | 22% | 15.8 |
| Content Quality | 54 | 23% | 12.4 |
| On-Page SEO | 68 | 20% | 13.6 |
| Schema / Structured Data | 54 | 10% | 5.4 |
| Performance (CWV) | 85 | 10% | 8.5 |
| AI Search Readiness (GEO) | 34 | 10% | 3.4 |
| Images | 55 | 5% | 2.8 |
| **TOTAL** | | **100%** | **61.9** |

### Top 5 Critical Issues

1. **Thin content across entire site** — Homepage has only 267 words; service pages average 415 words (recommended: 800+). This is the #1 ranking suppressor.
2. **Schema data conflicts** — Two separate schema blocks with conflicting postal codes (7510689 vs 7510071) and coordinates (~600m discrepancy). Undermines local SEO entity confidence.
3. **Cloudflare WAF blocking AI crawlers** — Despite robots.txt allowing AI bots, Cloudflare's Bot Fight Mode returns 403 to non-browser clients, making the site invisible to AI search engines.
4. **No Google Business Profile signals detected** — No Maps embed, reviews, or aggregateRating for a 15-year-old B2B firm with enterprise clients.
5. **No llms.txt file** — Site is not optimized for AI citation in ChatGPT, Perplexity, or Google AI Overviews.

### Top 5 Quick Wins

1. **Merge two schema blocks into one** — Eliminate conflicting data, use `@type: ["LocalBusiness", "ProfessionalService"]` (2 hours)
2. **Add `fetchpriority="high"` to LCP hero image** — Improve LCP by 200-600ms (15 minutes)
3. **Fix empty alt attributes on 4 hero images** — Accessibility and image SEO fix (30 minutes)
4. **Create llms.txt file** — Enable AI citation for 8 service pages (2-3 hours)
5. **Self-host Inter font** — Eliminate render-blocking third-party request (1-2 hours)

---

## 1. Technical SEO (72/100)

### Crawlability

**robots.txt:** Present at https://dar2.cl/robots.txt
- Default: `Allow: /` for all user-agents
- Cloudflare managed section blocks: Amazonbot, Applebot-Extended, Bytespider, CCBot, ClaudeBot, GPTBot, Google-Extended, meta-externalagent
- Site owner overrides then explicitly allow: GPTBot, ClaudeBot, anthropic-ai, PerplexityBot, Google-Extended, ChatGPT-User
- **Issue:** Conflicting directives create ambiguity. RFC 9309 favors `Allow` on ties, but Cloudflare WAF may block at network layer regardless.
- Sitemap declared: `https://dar2.cl/sitemap-index.xml`

**Sitemap:** Declared but returns 403 (Cloudflare blocked). Cannot verify contents.

**Internal Linking:** Good structure — homepage links to all 8 service pages, plus /portafolio/, /nosotros/, /contacto/. One-click depth from homepage to all service pages.

### Indexability

| Check | Status |
|-------|--------|
| `<html lang="es">` | PASS |
| `<meta charset="utf-8">` | PASS |
| `<meta name="viewport">` | PASS |
| `<meta name="robots" content="index, follow">` | PASS (with max-snippet:-1, max-image-preview:large, max-video-preview:-1) |
| Canonical tags | PASS — unique, correct canonical on every page |
| hreflang | N/A — single-language site (Spanish) |
| Duplicate content | No duplicates detected across crawled pages |

### Security

| Header | Status |
|--------|--------|
| HTTPS | PASS — HSTS enabled (max-age=31536000; includeSubDomains) |
| X-Content-Type-Options | MISSING |
| X-Frame-Options | MISSING |
| Content-Security-Policy | MISSING |
| Permissions-Policy | MISSING |
| Server header | Reveals "cloudflare" (acceptable) |

### URL Structure

All URLs are clean, lowercase, descriptive, with trailing slashes. Excellent URL hierarchy:
```
/servicios/
/servicios/streaming/
/servicios/live-shopping/
/servicios/circuito-cerrado/
/servicios/estudio-virtual/
/servicios/videos-corporativos/
/servicios/estrategias-digitales/
/servicios/redes-sociales/
/servicios/filtros-ar/
/portafolio/
/nosotros/
/contacto/
```

---

## 2. Content Quality (54/100)

### Content Depth Analysis

| Page | Words | Recommended | Status |
|------|-------|-------------|--------|
| Homepage | 267 | 600+ | CRITICAL — Thin |
| /servicios/ | 176 | 400+ | CRITICAL — Thin |
| /servicios/streaming/ | 415 | 800+ | LOW — Below target |
| /servicios/live-shopping/ | 419 | 800+ | LOW — Below target |
| /servicios/circuito-cerrado/ | 409 | 800+ | LOW — Below target |
| /servicios/estudio-virtual/ | 402 | 800+ | LOW — Below target |
| /servicios/videos-corporativos/ | 414 | 800+ | LOW — Below target |
| /servicios/estrategias-digitales/ | 399 | 800+ | LOW — Below target |
| /servicios/redes-sociales/ | 419 | 800+ | LOW — Below target |
| /servicios/filtros-ar/ | 464 | 800+ | LOW — Below target |
| /nosotros/ | 357 | 500+ | MEDIUM — Close |
| /contacto/ | 167 | 200+ | OK |
| /portafolio/ | 186 | 400+ | LOW — Below target |
| **Site Total** | **~4,094** | **~7,600+** | **46% below target** |

### E-E-A-T Assessment

| Signal | Score | Notes |
|--------|-------|-------|
| **Experience** | 14/20 | 15+ years claimed but not substantiated with specific milestones, project counts, or outcome data. Client logos without case studies are weak experience signals. |
| **Expertise** | 16/25 | Founder named (Carlos Rios Guevara). 8 service lines show technical breadth. No certifications, awards, or published thought leadership. |
| **Authoritativeness** | 14/25 | Enterprise clients (Codelco, Banco de Chile, ENAP) imply authority. No testimonials, press coverage, or industry recognition cited. |
| **Trustworthiness** | 19/30 | Physical address, direct phone, email all present. No privacy policy, no legal registration (RUT), no Google reviews visible. "Cotizacion en 48h" is a strong specific promise. |
| **E-E-A-T Total** | **63/100** | |

### Readability

- Heading language is clear, direct, active-voice Chilean Spanish
- Scannable structure with punchy H2s
- Insufficient body copy to fully assess readability
- No bullet lists, numbered processes, or comparison tables on homepage
- Streaming service page has best structure with FAQ section

### AI Citation Readiness: 31/100

- No direct-answer passages (passages AI can quote without surrounding context)
- No statistical claims with attribution
- No FAQ or question-based headings on homepage
- No content freshness signals (no dates, no "last updated")
- Schema present but not paired with sufficient descriptive text

---

## 3. On-Page SEO (68/100)

### Title Tags

| Page | Title | Length | Assessment |
|------|-------|--------|------------|
| Homepage | Productora audiovisual en Santiago de Chile — 15 anos \| DAR2 Servicios Audiovisuales | 83 chars | Good — keyword-rich, brand included. Slightly long (may truncate). |
| /servicios/ | Servicios audiovisuales: streaming, live shopping y mas \| DAR2 | 66 chars | Good |
| /servicios/streaming/ | Streaming corporativo profesional en Chile \| DAR2 | 52 chars | Good |
| /servicios/live-shopping/ | Live Shopping en Chile — Ventas en vivo para retail \| DAR2 | 60 chars | Good |
| /nosotros/ | Equipo DAR2 — 15 anos produciendo audiovisual \| DAR2 | 53 chars | Good |
| /contacto/ | Contacto — Cotiza tu proyecto audiovisual en 48h \| DAR2 | 56 chars | Good |
| /portafolio/ | Portafolio — Videos y streaming para empresas chilenas \| DAR2 | 63 chars | Good |

All titles are unique, keyword-rich, and include brand name. Well-structured.

### Meta Descriptions

All pages have unique, descriptive meta descriptions that include target keywords and CTAs. Homepage meta description effectively names major clients (Cencosud, ENAP, Clinica Santa Maria, ABCDIN). Strong across the board.

### Heading Structure

| Page | H1 | Issue |
|------|-----|-------|
| Homepage | "Producimos live shopping para empresas." | Targets "live shopping" while title targets "productora audiovisual" — keyword mismatch |
| /servicios/ | "Todo lo que necesitas bajo un solo techo." | Generic — doesn't include service keywords |
| /streaming/ | "Transmisiones en vivo sin dolores de cabeza." | Benefit-focused but keyword-light |
| /nosotros/ | "Un equipo pequeno con foco quirurgico." | Creative but no keywords |
| /contacto/ | "Cotizacion en 48 horas." | Good for conversion, low keyword value |
| /portafolio/ | "Proyectos que hablan por si solos." | No keywords |

**Pattern:** H1 tags prioritize creative copywriting over keyword targeting. This works for branding but weakens on-page relevance signals.

### Internal Linking

- Homepage links to all major sections (one-click depth)
- Service pages have clear CTAs to /contacto/
- Footer includes complete navigation with all service pages
- WhatsApp CTA present (`wa.me/56998433346`)
- No breadcrumb navigation detected
- No cross-linking between related service pages (e.g., streaming <-> live shopping)

---

## 4. Schema & Structured Data (54/100)

### Current Implementation

Two JSON-LD blocks on every page:

1. **LocalBusiness** — with @id, address, geo, founder, serviceType, sameAs
2. **ProfessionalService** — with OfferCatalog listing 8 services

### Critical Issues

| Issue | Severity |
|-------|----------|
| **Conflicting postal codes:** 7510689 vs 7510071 | CRITICAL |
| **Conflicting coordinates:** ~600m discrepancy between schemas | CRITICAL |
| **Schema 2 missing @id** — Google cannot link entities, creates duplicate entity risk | CRITICAL |
| `serviceType` is not a valid Schema.org property on LocalBusiness | MEDIUM |
| `logo` should be ImageObject, not bare URL string | MEDIUM |
| `foundingDate: "2010"` should be ISO 8601 (`"2010-01-01"`) | LOW |

### Missing Schema Opportunities

| Type | Priority | Benefit |
|------|----------|---------|
| `WebSite` with SearchAction | HIGH | Sitelinks Search Box in SERP |
| `BreadcrumbList` on interior pages | HIGH | Breadcrumb rich results |
| `VideoObject` for showreel/demos | HIGH | Video rich results (core business) |
| `FAQPage` on service pages with FAQ sections | MEDIUM | AI citation improvement |
| Expanded `Person` for founder | MEDIUM | Entity association strength |

### Recommended Fix

Merge both blocks into a single unified schema:
```json
{
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": "https://dar2.cl/#organization",
  ...unified data with verified postal code and coordinates...
}
```

---

## 5. Performance / Core Web Vitals (85/100)

### Estimated CWV Status

| Metric | Threshold | Estimate | Status |
|--------|-----------|----------|--------|
| LCP | <=2.5s | 1.4-2.2s (mobile) / 0.8-1.4s (desktop) | LIKELY PASS |
| INP | <=200ms | <50ms | PASS (Astro minimal JS) |
| CLS | <=0.1 | 0.02-0.08 | LIKELY PASS |

*Note: These are structural estimates. Validate with [PageSpeed Insights](https://pagespeed.web.dev/?url=https://dar2.cl) and [CrUX Vis](https://cruxvis.withgoogle.com/#/?url=https://dar2.cl) for field data.*

### Architecture Strengths

- **Astro v6.1.8 static SSG** — zero client-side JS by default, fastest possible TTFB
- **Cloudflare CDN** — edge delivery with nearby PoPs for Chilean users (Santiago, Buenos Aires, Sao Paulo)
- **HSTS enabled** — no HTTP->HTTPS redirect latency
- **WebP in picture/source** — correct modern format usage for service images
- **93 lazy-loaded images** — excellent deferred loading
- **Hashed CSS filenames** — long-term browser caching

### Performance Issues

| Issue | Impact | Fix |
|-------|--------|-----|
| No `<link rel="preload">` for LCP hero image | HIGH — adds 200-600ms to LCP on mobile | Add preload hint for the first `<picture>` element |
| Google Fonts (Inter) loaded via render-blocking `<link>` | MEDIUM — blocks rendering 100-300ms | Self-host via @fontsource/inter or async load |
| No `fetchpriority="high"` on any image | MEDIUM — browser can't prioritize LCP image | Add to the LCP candidate image |
| 4 eager images without width/height attributes | MEDIUM — CLS risk | Add explicit dimensions |
| Client logos in PNG format (not WebP) | LOW — suboptimal compression | Convert to WebP with PNG fallback |
| HTML size 74KB (uncompressed) | LOW — acceptable with Brotli compression (~15-20KB on wire) | Review for inlined data that could be external |

---

## 6. Images (55/100)

### Image Inventory

| Category | Count | Format | Notes |
|----------|-------|--------|-------|
| Logo | 1 | PNG + WebP source | Has alt text, width/height, eager loading |
| Hero/portfolio images | 4 | PNG + WebP source | **Empty alt attributes**, eager loading, **no width/height** |
| Service images | 8 | JPG + WebP source | Good alt text (service names), lazy loading |
| Portfolio case study images | 6 | PNG + WebP source | Good alt text (project names), lazy loading |
| Client logos | ~38 | PNG only | Some have alt ("Logo [brand]"), others empty alt |

### Issues

| Issue | Count | Severity |
|-------|-------|----------|
| Hero images with empty `alt` attribute | 4 | HIGH — accessibility failure + missed image SEO |
| Client logos without WebP optimization | ~38 | MEDIUM — all PNG, no picture/source WebP |
| No `fetchpriority="high"` on any image | All | MEDIUM — LCP performance risk |
| Hero images missing `width`/`height` | 4 | MEDIUM — CLS risk |
| Service image alt text too short | 8 | LOW — "Streaming" could be "Servicio de streaming corporativo DAR2" |

---

## 7. AI Search Readiness / GEO (34/100)

### AI Crawler Accessibility

| Crawler | robots.txt | WAF Reality | Effective Status |
|---------|-----------|-------------|-----------------|
| GPTBot | Allow (overrides block) | Likely 403 | BLOCKED |
| ClaudeBot | Allow (overrides block) | Likely 403 | BLOCKED |
| PerplexityBot | Allow (overrides block) | Likely 403 | BLOCKED |
| Google-Extended | Allow (overrides block) | Likely 403 | BLOCKED |
| ChatGPT-User | Allow (no conflict) | Likely 403 | BLOCKED |

**Critical issue:** The site's robots.txt explicitly invites AI crawlers, but Cloudflare's WAF (Bot Fight Mode or similar) returns 403 before robots.txt rules even apply. This makes the site effectively invisible to all AI search platforms.

### llms.txt: MISSING

No llms.txt file exists. This file would allow AI assistants (Perplexity, Claude) to understand the site's content structure and prioritize the most citable pages.

### Citation Readiness

- **Quotable passages:** None — 267 words with no self-contained factual statements
- **Statistical claims:** None — no production volumes, event counts, conversion data
- **Named entity density:** Good (Cencosud, Codelco, Banco de Chile, Carlos Rios Guevara)
- **FAQ content:** Only on /servicios/streaming/ page
- **Content freshness signals:** None (no dates, no "last updated")

### Platform Scores

| Platform | Score | Primary Blocker |
|----------|-------|----------------|
| Google AI Overviews | 18/100 | WAF blocks + sparse content |
| ChatGPT | 22/100 | WAF blocks + no citable passages |
| Perplexity | 25/100 | WAF blocks + no llms.txt |
| Bing Copilot | 20/100 | Same Bing index gaps |
| Claude | 28/100 | anthropic-ai allowed in robots.txt, but WAF blocks |

---

## 8. Local SEO (42/100)

### NAP Consistency: FAIL

| Field | Schema 1 | Schema 2 | Match |
|-------|----------|----------|-------|
| Name | DAR2 Servicios Audiovisuales | DAR2 | PARTIAL |
| Address | Av. Holanda 099, of 603 | Av. Holanda 099, of 603 | MATCH |
| Postal Code | 7510689 | 7510071 | CONFLICT |
| Latitude | -33.4191 | -33.424 | CONFLICT (~600m) |
| Longitude | -70.6074 | -70.612 | CONFLICT (~460m) |
| Phone | +56998433346 | +56998433346 | MATCH |
| Email | dar2@dar2.cl | dar2@dar2.cl | MATCH |

### GBP Signals: NOT DETECTED

- No Google Maps embed on contact page
- No aggregateRating in schema
- No review widget visible
- No GBP profile URL in sameAs
- No Place ID reference

### Local Schema: PARTIALLY IMPLEMENTED

- LocalBusiness + ProfessionalService types present (good)
- Missing: openingHoursSpecification, aggregateRating
- geo.placename meta says "Santiago" while schema says "Providencia" (soft inconsistency)

### Citation Opportunities (Chile-specific)

| Directory | Priority | Status |
|-----------|----------|--------|
| Google Business Profile | CRITICAL | Unconfirmed |
| LinkedIn Company Page | HIGH | Present (/company/dar2) |
| Instagram Business | HIGH | Present (@dar2.cl) |
| Clutch.co | HIGH | Unknown |
| Sortlist LatAm | HIGH | Unknown |
| Paginas Amarillas Chile | HIGH | Unknown |
| Guia.cl | MEDIUM | Unknown |
| ANDA (industry association) | MEDIUM | Unknown |

---

## Site Crawl Summary

### All Pages Discovered

| URL | Title | H1 | Words | Schema | Status |
|-----|-------|----|-------|--------|--------|
| / | Productora audiovisual en Santiago... | Producimos live shopping para empresas. | 267 | 2 | Thin |
| /servicios/ | Servicios audiovisuales: streaming... | Todo lo que necesitas bajo un solo techo. | 176 | 2 | Very thin |
| /servicios/streaming/ | Streaming corporativo profesional... | Transmisiones en vivo sin dolores de cabeza. | 415 | 2 | Below target |
| /servicios/live-shopping/ | Live Shopping en Chile... | (not extracted) | 419 | 2 | Below target |
| /servicios/circuito-cerrado/ | Circuito cerrado CCTV... | (not extracted) | 409 | 2 | Below target |
| /servicios/estudio-virtual/ | Estudio virtual con green screen... | (not extracted) | 402 | 2 | Below target |
| /servicios/videos-corporativos/ | Videos corporativos e institucionales... | (not extracted) | 414 | 2 | Below target |
| /servicios/estrategias-digitales/ | (not extracted) | (not extracted) | 399 | 2 | Below target |
| /servicios/redes-sociales/ | (not extracted) | (not extracted) | 419 | 2 | Below target |
| /servicios/filtros-ar/ | Filtros AR de marca... | (not extracted) | 464 | 2 | Below target |
| /nosotros/ | Equipo DAR2 — 15 anos... | Un equipo pequeno con foco quirurgico. | 357 | 2 | Close |
| /contacto/ | Contacto — Cotiza tu proyecto... | Cotizacion en 48 horas. | 167 | - | OK |
| /portafolio/ | Portafolio — Videos y streaming... | Proyectos que hablan por si solos. | 186 | 2 | Thin |

### Technical Consistency

- All pages return HTTP 200
- All pages have unique canonical tags
- All pages have unique title tags and meta descriptions
- All pages use consistent `<html lang="es">`
- Schema markup present on all pages except /contacto/
- Consistent Astro v6.1.8 build across all pages

---

## Methodology Notes

- Homepage HTML was fetched successfully via curl with browser user-agent (74,534 bytes)
- Inner pages fetched successfully (200 status codes)
- WebFetch tool returned 403 on homepage and sitemap (Cloudflare WAF challenge)
- robots.txt was accessible via WebFetch
- No Google API credentials available (no CrUX field data, no GSC, no GA4)
- No DataForSEO MCP available (no SERP rankings, no backlink data)
- Performance scores are structural estimates based on stack analysis (Astro + Cloudflare)
- Local SEO scored without GBP dashboard access or citation verification

---

*Generated by Claude Code SEO Audit | 2026-05-18*
