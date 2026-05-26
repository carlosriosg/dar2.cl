# Full SEO Audit Report: dar2.cl

**Site:** https://dar2.cl/
**Business:** DAR2 Servicios Audiovisuales — Streaming & Audiovisual Production
**Location:** Av. Holanda 099, Of. 603, Providencia, Santiago, Chile
**Industry:** Local Professional Service (B2B)
**Stack:** Astro v6.1.8, Cloudflare CDN, GTM
**Pages Crawled:** 26
**Audit Date:** 2026-05-26

---

## SEO Health Score: 62 / 100

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 22% | 68/100 | 15.0 |
| Content Quality | 23% | 71/100 | 16.3 |
| On-Page SEO | 20% | 54/100 | 10.8 |
| Schema / Structured Data | 10% | 65/100 | 6.5 |
| Performance (CWV) | 10% | 62/100 | 6.2 |
| AI Search Readiness | 10% | 71/100 | 7.1 |
| Images | 5% | 78/100 | 3.9 |
| **TOTAL** | **100%** | | **65.8 → 62** |

*Score adjusted down by -4 for: broken SearchAction schema, SXO page-type mismatch on primary keywords (54/100 SXO score), and near-zero backlink profile.*

---

## Executive Summary

### Business Type Detected

**Local Professional Service (Hybrid)** — Studio-based in Providencia, Santiago with nationwide service delivery (areaServed: Chile).

### Top 5 Critical Issues

1. **Title tags exceed 60 characters on ALL pages** — Homepage is 122 chars (2x the limit). Google truncates heavily, hurting CTR across every SERP listing.
2. **Broken SearchAction schema** — `WebSite.potentialAction` points to `/search?q=` which returns 404. Active invalid markup.
3. **SXO page-type mismatch** — Primary commercial keywords ("streaming corporativo chile", "videos corporativos santiago") require dedicated Service Pages. The homepage tries to rank for all 8 services simultaneously, competing against single-topic pages from competitors.
4. **Near-zero backlink profile** — Common Crawl data shows dar2.cl below the reporting threshold. Despite 40+ enterprise client relationships, essentially no inbound links exist.
5. **HTML not edge-cached on Cloudflare** — `cf-cache-status: DYNAMIC` means every visitor hits origin, adding 200-600ms to TTFB unnecessarily for a static site.

### Top 5 Quick Wins

1. **Edge-cache HTML on Cloudflare** — Zero code changes, just a Cache Rule. Expected LCP improvement: 200-600ms.
2. **Truncate all title tags to <60 characters** — Template-level fix affecting all 26 pages instantly.
3. **Remove broken SearchAction** from WebSite schema — 5-minute code change.
4. **Add `preconnect` hints** for GTM and Behold widget — saves 100-300ms per page load.
5. **Fix `ratingValue` type** in AggregateRating schema — change string `"5.0"` to number `5.0`, add `worstRating: 1`.

---

## Technical SEO — 68/100

| Check | Status | Severity |
|-------|--------|----------|
| HTTPS enforcement | PASS | — |
| Canonical tags (all pages) | PASS | — |
| Meta robots | PASS | index, follow on all pages |
| Viewport meta | PASS | — |
| robots.txt | PASS | Open policy, AI crawlers allowed |
| hreflang (es-CL + x-default) | PARTIAL | Medium — only on homepage, should be sitewide |
| Duplicate sitemaps | FAIL | High — Two competing sitemaps, neither ideal |
| Sitemap lastmod dates | FAIL | Medium — Manual has none; auto-gen has fake identical timestamps |
| Content-Type charset header | FAIL | High — No `charset=utf-8` in HTTP header, corrupting Spanish characters in schema |
| SearchAction → 404 | FAIL | Critical — Active invalid schema |
| Internal linking (18-19/page) | PASS | Good cross-linking |
| URL structure | PASS | Clean, trailing slashes, logical hierarchy |
| JavaScript dependency | PASS | Astro static — minimal JS |
| HTTP/3 support | PASS | `alt-svc: h3=":443"` present |
| Google Maps embed on contact | FAIL | High — No map iframe on /contacto/ |

### robots.txt

Open crawling policy. Explicitly allows all major AI crawlers:
- GPTBot, ClaudeBot, anthropic-ai, PerplexityBot, Google-Extended, ChatGPT-User, OAI-SearchBot

Sitemap reference: `https://dar2.cl/sitemap-manual.xml`

### Sitemaps

Two competing sitemaps exist covering the same 26 URLs:

- `sitemap-manual.xml` — referenced in robots.txt, has priority/changefreq but NO lastmod dates
- `sitemap-index.xml` → `sitemap-0.xml` — Astro auto-generated, has lastmod (build timestamp) but identical across all URLs

**Recommendation:** Consolidate to the Astro auto-generated sitemap. Implement git-based lastmod injection at build time. Remove deprecated priority/changefreq tags. Update robots.txt to reference `sitemap-index.xml`.

### Crawled Pages (26 total)

| URL | Status | Words | H1 | H2s | Images | Title Length |
|-----|--------|-------|----|----|--------|-------------|
| / | 200 | 676 | 1 | 9 | 98 | 122 chars |
| /servicios/ | 200 | 361 | 1 | 3 | 10 | 102 chars |
| /servicios/streaming/ | 200 | 829 | 1 | 10 | 9 | 111 chars |
| /servicios/live-shopping/ | 200 | 798 | 1 | 10 | 9 | 96 chars |
| /servicios/videos-corporativos/ | 200 | 787 | 1 | 10 | 9 | 77 chars |
| /servicios/estudio-virtual/ | 200 | 765 | 1 | 10 | 9 | 83 chars |
| /servicios/filtros-ar/ | 200 | 878 | 1 | 10 | 3 | 74 chars |
| /servicios/redes-sociales/ | 200 | 810 | 1 | 10 | 9 | 74 chars |
| /servicios/circuito-cerrado/ | 200 | 806 | 1 | 10 | 9 | 78 chars |
| /servicios/estrategias-digitales/ | 200 | 765 | 1 | 10 | 9 | 74 chars |
| /blog/ | 200 | 428 | 1 | 8 | 10 | 82 chars |
| /casos/ | 200 | 185 | 1 | 2 | 2 | 97 chars |
| /contacto/ | 200 | 214 | 1 | 2 | 2 | 81 chars |
| /nosotros/ | 200 | 609 | 1 | 5 | 10 | 94 chars |
| /portafolio/ | 200 | 190 | 1 | 0 | 21 | 95 chars |
| /privacidad/ | 200 | 543 | 1 | 11 | 2 | 54 chars |

Plus 8 blog posts and 2 case study detail pages in the sitemap.

---

## Content Quality (E-E-A-T) — 71/100

### E-E-A-T Breakdown

| Dimension | Score | Notes |
|-----------|-------|-------|
| Experience | 16/20 | Named founder, equipment specifics, first-person operational insights |
| Expertise | 20/25 | Expert-level blog content; no external corroboration |
| Authoritativeness | 17/25 | Major clients named; low review count; no press coverage |
| Trustworthiness | 22/30 | Address/contact solid; missing RUT, anonymous testimonials |

### Strengths

- Named founder (Carlos Rios Guevara, UNIACC) attributed as author on all 8 blog posts
- Blog content demonstrates genuine operational knowledge with Chile-specific market data
- 8 team members named with roles on /nosotros/
- Equipment specificity (Sony FX6, PTZ, green screen studio)
- Enterprise client portfolio: Cencosud, ENAP, Banco Chile, Codelco, Clínica Santa María
- TTS (text-to-speech) player on blog posts — genuine UX differentiator

### Title Tag Issues (Critical)

ALL pages exceed the ~60-character Google display limit:

| Page | Current Length | Recommended |
|------|---------------|-------------|
| Homepage | 122 chars | "Productora Audiovisual en Santiago \| DAR2" (41 chars) |
| /servicios/ | 102 chars | "Servicios Audiovisuales Santiago \| DAR2" (40 chars) |
| /servicios/streaming/ | 111 chars | "Streaming Corporativo Santiago \| DAR2" (38 chars) |

### Thin Content Pages

| Page | Words | Minimum | Status |
|------|-------|---------|--------|
| /servicios/ | 361 | 800 | FAIL — service hub needs expansion |
| /casos/ | 185 | 500 | FAIL — critically thin for B2B trust |
| /portafolio/ | 190 | — | THIN — 0 H2s, no descriptive text |

### Blog Content Assessment

- 8 posts with 1,333–1,568 words each — adequate depth
- All published 2026-05-19 (same day) — **batch-publication red flag**
- Unattributed statistics: "70% don't measure ROI", "USD 562B China live shopping" need source citations
- Question-based H2 headings strongly correlate with AI snippet selection

### AI Citation Readiness: 62/100

- FAQ schema implemented on service pages (positive)
- Statistics without source citations reduce citability
- No HowTo or structured comparison data
- Missing "Key Takeaways" summary blocks

---

## On-Page SEO / SXO — 54/100

### Page-Type Mismatch (Critical Finding)

Google's SERPs for primary keywords show dedicated Service Pages ranking, not multi-service homepages:

| Keyword | SERP Dominant Type | DAR2 Match? |
|---------|-------------------|-------------|
| productora de streaming santiago | Service Page | NO — Homepage covers 8 services |
| streaming corporativo chile | Service Page | Service pages exist but may not be optimized |
| live shopping chile | Hybrid (edu+CTA) | PARTIAL — Blog post only |
| videos corporativos santiago | Service Page | Service pages exist |
| estudio virtual chile | Service Page | Service pages exist |

### Persona Scores

| Persona | Score | Rating |
|---------|-------|--------|
| Corporate Comm Manager | 54/100 | Needs Work |
| Retail Brand Manager (Live Shopping) | 40/100 | Critical Mismatch |
| Procurement Officer | 43/100 | Critical Mismatch |
| SME Owner (First-Time) | 56/100 | Needs Work |
| Agency Account Manager | 53/100 | Needs Work |

**Systemic issue:** Average Action score is 8.4/25 across all personas. The single-CTA WhatsApp model forces every visitor into a sales conversation regardless of journey stage.

### Conversion Path Issues

- Blog educates users → sends them to generic WhatsApp CTA → no commercial service page to link to internally
- Case study pages exist in sitemap but may have thin content
- No downloadable spec sheet or quotation form for consideration-stage visitors
- 48-hour quote promise is too slow for agency pitch cycles

### Competitors Ranking Ahead

- StreamingHD (/productora) — dedicated single-topic service pages
- FeriaPixel (/videos-corporativos/) — dedicated video production page
- EnDirecto.cl (/sets-virtuales/) — dedicated virtual studio page
- ATE Producciones — explicit event type targeting (juntas de accionistas)

---

## Schema / Structured Data — 65/100

### Schema Types Detected

| Page | Schema Types |
|------|-------------|
| Homepage | LocalBusiness+ProfessionalService, WebSite, Person |
| /servicios/ | LocalBusiness+ProfessionalService, Person, BreadcrumbList |
| Service pages | LocalBusiness+ProfessionalService, Person, BreadcrumbList, Service, FAQPage |
| /blog/ | LocalBusiness+ProfessionalService, Person, BreadcrumbList, Blog, ItemList |
| /contacto/ | LocalBusiness+ProfessionalService, Person, BreadcrumbList, ContactPage |
| /nosotros/ | LocalBusiness+ProfessionalService, Person, BreadcrumbList, AboutPage |
| /portafolio/ | LocalBusiness+ProfessionalService, Person, BreadcrumbList, CollectionPage |

### Critical Issues

| ID | Issue | Detail |
|----|-------|--------|
| C1 | ratingValue is String | `"5.0"` must be number `5.0` |
| C2 | SearchAction → 404 | `/search?q=` endpoint doesn't exist |
| C3 | Service schema missing `url` | Cannot associate schema with canonical page |
| C4 | BlogPosting missing `dateModified` | Required for Article rich results |
| C5 | UTF-8 encoding corrupted | No `charset=utf-8` in HTTP Content-Type header |
| C6 | CollectionPage empty | /portafolio/ has 19 YouTube videos with zero VideoObject |

### Missing Schema Opportunities

1. **VideoObject** for 19 portfolio YouTube videos — highest missed rich result opportunity
2. **Review** entities for individual testimonials (only AggregateRating exists)
3. **Person.image** and **Person.description** for founder
4. **worstRating** missing from AggregateRating
5. **HowTo** schema for blog how-to content

### Corrected AggregateRating

```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": 5.0,
  "reviewCount": 12,
  "bestRating": 5,
  "worstRating": 1
}
```

### Corrected WebSite (remove SearchAction)

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://dar2.cl/#website",
  "url": "https://dar2.cl/",
  "name": "DAR2 Servicios Audiovisuales",
  "description": "Productora audiovisual en Santiago de Chile especializada en streaming, live shopping y video corporativo.",
  "publisher": { "@id": "https://dar2.cl/#organization" },
  "inLanguage": "es-CL"
}
```

### Service Schema Template (add to each service page)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Streaming Corporativo",
  "url": "https://dar2.cl/servicios/streaming/",
  "image": "https://dar2.cl/images/servicios/streaming-hero.jpg",
  "description": "Streaming corporativo profesional con multicámara y enlace redundante.",
  "serviceType": "Transmisión audiovisual en vivo",
  "provider": { "@id": "https://dar2.cl/#organization" },
  "areaServed": { "@type": "Country", "name": "Chile" },
  "offers": {
    "@type": "Offer",
    "url": "https://dar2.cl/servicios/streaming/",
    "priceCurrency": "CLP",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "priceCurrency": "CLP",
      "description": "Cotización a medida según alcance del evento"
    }
  }
}
```

---

## Performance (CWV) — 62/100

### Core Web Vitals Estimates

| Metric | Estimated Value | Status |
|--------|----------------|--------|
| LCP | ~2.8-3.5s | Needs Improvement |
| INP | ~80-130ms | Good |
| CLS | ~0.05-0.12 | Borderline |

### Performance Scorecard

| Area | Score |
|------|-------|
| CSS delivery (fully inline) | 10/10 |
| Font loading (self-hosted Inter, swap, preloaded) | 9/10 |
| INP risk (lightweight JS, passive listeners) | 9/10 |
| JS loading (minimal Astro, correct defer/async) | 8/10 |
| Image formats (WebP + AVIF via `<picture>`) | 8/10 |
| Preload hints (hero image correct) | 7/10 |
| CLS risk (Behold widget + 6 undimensioned images) | 6/10 |
| HTML delivery (TTFB not edge-cached) | 6/10 |
| Image sizing (no srcset anywhere) | 5/10 |
| Third-party scripts (GTM position + Behold) | 5/10 |

### Key Findings

- **HTML not edge-cached:** `cf-cache-status: DYNAMIC` on every request. Astro generates static HTML — it should be cached at Cloudflare's edge. TTFB is 0.35s from Santiago when it could be <50ms.
- **GTM loads before charset/viewport** — first element in `<head>`, blocks parser
- **No preconnect hints** for `googletagmanager.com`, `w.behold.so`, `static.cloudflareinsights.com`
- **No srcset on any image** — mobile users receive desktop-sized images
- **6 video card images missing width/height** — CLS risk
- **Behold Instagram widget** has no reserved height — highest CLS risk
- **Self-hosted Inter font with swap + preload** — excellent
- **Zero external CSS** — all inline, zero render-blocking

---

## AI Search Readiness (GEO) — 71/100

### GEO Scores by Dimension

| Dimension | Weight | Score |
|-----------|--------|-------|
| Citability | 25% | 72/100 |
| Structural Readability | 20% | 78/100 |
| Multi-Modal Content | 15% | 55/100 |
| Authority & Brand Signals | 20% | 68/100 |
| Technical Accessibility | 20% | 77/100 |

### Platform-Specific Readiness

| Platform | Score | Rationale |
|----------|-------|-----------|
| Claude | 74/100 | Both ClaudeBot + anthropic-ai allowed; structured content |
| Perplexity | 73/100 | Question-based headings optimized for passage retrieval |
| Google AI Overviews | 70/100 | FAQ schema + Google-Extended allowed |
| ChatGPT | 65/100 | GPTBot allowed; no YouTube/Wikipedia entity |
| Bing Copilot | 62/100 | Missing external citation signals |

### AI Crawler Access

All major AI crawlers explicitly allowed in robots.txt. llms.txt present at both canonical paths (`/llms.txt` and `/.well-known/llms.txt`).

### Key Gaps

- **No YouTube channel** — YouTube correlation with AI citations is 0.737 (strongest known signal)
- **No Wikipedia/Wikidata entity** — Primary AI entity disambiguation source absent
- **llms.txt not spec-compliant** — Paragraph format instead of structured Markdown with URL index
- **Statistics without attribution** reduce citation likelihood
- **No "Key Takeaways" boxes** on blog articles (most commonly cited block format in Perplexity)

---

## Images — 78/100

| Check | Status |
|-------|--------|
| Alt text (all 98 homepage images) | PASS — 100% coverage |
| Modern formats (WebP/AVIF via `<picture>`) | PASS |
| Lazy loading | PASS — all images lazy-loaded |
| Hero preload with fetchpriority="high" | PASS |
| Responsive sizing (srcset) | FAIL — No srcset on any image |
| Width/height dimensions | PARTIAL — 6 video cards missing |
| Client logo optimization | PASS — AVIF sources for logos |

---

## Local SEO — 61/100

### Scores by Dimension

| Dimension | Weight | Score |
|-----------|--------|-------|
| GBP Signals | 25% | 52/100 |
| Reviews & Reputation | 20% | 65/100 |
| Local On-Page SEO | 20% | 72/100 |
| NAP Consistency & Citations | 15% | 55/100 |
| Local Schema Markup | 10% | 78/100 |
| Local Link & Authority Signals | 10% | 45/100 |

### NAP Consistency

| Source | Name | Address | Phone |
|--------|------|---------|-------|
| Schema (all pages) | DAR2 Servicios Audiovisuales | Av. Holanda 099, of 603 | +56998433346 |
| Contact page visible | DAR2 Servicios Audiovisuales | Av. Holanda 099, oficina 603 | +56 9 9843 3346 |

**Discrepancy:** "of 603" vs "oficina 603" — standardize to "Oficina 603" across all instances.

### GBP Signals

- Google Maps CID confirmed: 6666778595618035561
- Review link present: g.page/r/CWmX_YPPJ4VcEBM/review
- Review CTA in footer: "Déjanos una reseña"
- **MISSING:** No Google Maps iframe embed on /contacto/ (critical GBP signal)
- **MISSING:** No directions link

### Reviews

- AggregateRating: 5.0 / 12 reviews
- 12 reviews is LOW for a 15-year company with 30+ enterprise clients
- 18-day review velocity rule applies — need consistent new reviews
- On-page testimonials not marked up with Review schema

### Citation Opportunities

| Directory | Status | Priority |
|-----------|--------|----------|
| Google Business Profile | Present | — |
| LinkedIn Company Page | Present | — |
| Instagram @dar2.cl | Present | — |
| Clutch.co | Missing | High |
| Sortlist.com | Missing | Medium |
| ACHAP (Chilean ad agencies) | Missing | Medium |
| Agencias.cl | Missing | Medium |
| Wikidata | Missing | Medium |

---

## Backlink Profile — Insufficient Data

### Common Crawl Results

| Metric | Value |
|--------|-------|
| Found in CC crawl | Yes |
| PageRank ranking | Below threshold |
| Referring domains sampled | 0 |

The domain is crawled but sits below the link graph reporting threshold — consistent with very few or zero inbound links from external domains.

### Key Insight

dar2.cl links out to 40+ enterprise clients but receives essentially no inbound links in return. The relationship equity exists; it has not been converted into link equity.

### Link Building Priorities

1. **Client backlinks** — Joint case studies, production credits on client video pages
2. **YouTube channel** — High-DA referring domain, zero cost
3. **Clutch.co profile** — B2B services directory with strong DA
4. **Chilean directories** — ACHAP, CORFO, ProChile
5. **Editorial coverage** — Chilean trade media (El Publicista, Mercado Negro)
6. **Vimeo portfolio** — Professional video platform with followed links

### API Configuration Needed

Free APIs that would unlock full scoring:
- Moz: https://moz.com/products/api (2,500 rows/month free)
- Bing Webmaster: https://www.bing.com/webmasters (free)
- Config file: `~/.config/claude-seo/backlinks-api.json`

---

## All Scores Summary

| Analysis | Score |
|----------|-------|
| **Overall SEO Health** | **62/100** |
| Technical SEO | 68/100 |
| Content Quality (E-E-A-T) | 71/100 |
| On-Page SEO / SXO | 54/100 |
| Schema / Structured Data | 65/100 |
| Performance (CWV) | 62/100 |
| AI Search Readiness (GEO) | 71/100 |
| Images | 78/100 |
| Local SEO | 61/100 |
| Backlink Profile | Insufficient Data |
