# Full SEO Audit Report: dar2.cl

**Site:** https://dar2.cl/
**Audit Date:** May 25, 2026
**Business:** DAR2 Servicios Audiovisuales — B2B Audiovisual Production
**Location:** Av. Holanda 099, of 603, Providencia, Santiago, Chile
**Pages Crawled:** 25 (via sitemap)
**Framework:** Astro.js (SSG) + Tailwind CSS

---

## SEO Health Score: 78 / 100

| Category | Weight | Score | Weighted | Grade |
|----------|--------|-------|----------|-------|
| Technical SEO | 22% | 78/100 | 17.2 | B+ |
| Content Quality | 23% | 82/100 | 18.9 | A- |
| On-Page SEO | 20% | 75/100 | 15.0 | B |
| Schema / Structured Data | 10% | 82/100 | 8.2 | A- |
| Performance (CWV) | 10% | 80/100 | 8.0 | B+ |
| AI Search Readiness (GEO) | 10% | 71/100 | 7.1 | B- |
| Images | 5% | 74/100 | 3.7 | B |
| **TOTAL** | **100%** | | **78.1** | **B+** |

**Supplemental Scores:**
- Local SEO: 67/100
- Search Experience (SXO): 54/100

---

## Executive Summary

dar2.cl is a well-built B2B audiovisual production website with strong fundamentals. The site leverages Astro.js for excellent server-side rendering, implements comprehensive Schema.org structured data, maintains a consistent content architecture across 25 pages, and has proactively enabled AI crawler access with a well-crafted llms.txt file.

### Top 5 Critical Issues

1. **Missing canonical tags** on multiple pages (services, contact, about) — risks duplicate content issues
2. **Low Google review count** (12 reviews in 15 years) — undermines AggregateRating authority and local pack eligibility
3. **Uniform sitemap lastmod timestamps** — all 25 URLs share identical build-time timestamp, preventing crawlers from prioritizing fresh content
4. **Unsourced statistics in blog posts** — claims lack hyperlinked citations, reducing AI citability and E-E-A-T trust
5. **Missing YouTube channel linkage** — for a video production company, the strongest AI citation signal (YouTube correlation: 0.737) is absent

### Top 5 Quick Wins

1. Add `User-agent: OAI-SearchBot / Allow: /` to robots.txt (5 min)
2. Add 301 redirect from `/.well-known/llms.txt` to `/llms.txt` (5 min)
3. Add geographic modifier to `/servicios/estudio-virtual/` title tag (5 min)
4. Add Google Maps CID URL to schema `sameAs` array (10 min)
5. Standardize phone formatting site-wide to `+56 9 9843 3346` (15 min)

---

## 1. Technical SEO (78/100)

### Crawlability

| Check | Status | Notes |
|-------|--------|-------|
| robots.txt | PASS | Open access, allows all AI bots (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, ChatGPT-User) |
| Sitemap | PASS (with issues) | sitemap-index.xml → sitemap-0.xml, 25 URLs. Missing changefreq/priority. All lastmod identical (build artifact) |
| HTTPS | PASS | Full HTTPS implementation |
| URL structure | PASS | Clean hierarchical structure: /servicios/streaming/, /blog/slug/ |
| Internal linking | PASS | Good navigation with cross-linking between service pages |
| Redirect chains | PASS | No redirect chains detected |
| JavaScript rendering | PASS | Astro.js SSG serves fully rendered HTML — no JS dependency for core content |

### Indexability

| Check | Status | Notes |
|-------|--------|-------|
| Meta robots | PASS | `index, follow` on homepage |
| Canonical tags | FAIL | Missing explicit canonical tags on /servicios/, /contacto/, /nosotros/, and several service pages |
| Hreflang | N/A | Single language site (es-CL) |
| OG tags | PASS | Present on homepage with og:title, og:image, og:type, og:url |
| Twitter cards | PASS | summary_large_image configured |

### Security

| Check | Status | Notes |
|-------|--------|-------|
| HTTPS | PASS | Valid SSL certificate |
| Mixed content | Not detected | |
| Security headers | Not verified | Requires server-side header inspection |

### Issues Found

| Severity | Issue | Affected Pages |
|----------|-------|----------------|
| High | Missing canonical tags | /servicios/, /contacto/, /nosotros/, /portafolio/, individual service pages |
| Medium | Sitemap lastmod all identical (2026-05-25T17:35:47.043Z) | All 25 URLs |
| Medium | No changefreq or priority in sitemap | All URLs |
| Low | Missing OAI-SearchBot in robots.txt | Site-wide |
| Low | No SearchAction in WebSite schema | Homepage |

---

## 2. Content Quality (82/100)

### E-E-A-T Assessment

| Signal | Score | Evidence |
|--------|-------|----------|
| **Experience** | Strong | 15+ years in business (founded 2010), 40+ annual productions, 30+ corporate clients named on-site |
| **Expertise** | Strong | Detailed technical content (equipment specs: Sony FX6, PTZ, broadcast lighting), procedural blog posts, industry-specific FAQs |
| **Authority** | Moderate | Named enterprise clients (Copec, Nestlé, Banco de Chile, CMPC, Codelco), 5.0 Google rating. Gap: no press mentions, industry certifications, or awards displayed |
| **Trust** | Moderate-Strong | Real testimonials, contact info visible, privacy policy, physical address with Google Maps embed. Gap: only 12 reviews, no Clutch.co profile |

### Content Depth Analysis

| Page Type | Pages | Avg Word Count | Assessment |
|-----------|-------|----------------|------------|
| Homepage | 1 | ~2,500 | Excellent depth for a services homepage |
| Service pages | 8 | ~2,100 | Strong — each page has unique content, FAQ sections, portfolio examples |
| Blog posts | 8 | ~2,000 | Good depth — informational guides with FAQs |
| Case studies | 2 | ~1,300 | Good narrative depth with challenge/solution/result structure |
| About page | 1 | ~1,300 | Good — team profiles, company philosophy, 8 team members |
| Portfolio | 1 | ~450 | Thin content — primarily visual grid with minimal text |
| Contact | 1 | ~850 | Adequate for a contact page |
| Privacy | 1 | Not assessed | Legal content |

### Blog Content Assessment

All 8 blog posts are well-structured informational guides:

| Post | Word Count | FAQ | Schema |
|------|-----------|-----|--------|
| Qué es Live Shopping en Chile | ~2,400 | 5 Q&As | Article + FAQPage |
| Transmitir junta anual sin caídas | ~2,000 | Yes | Article + FAQPage |
| Estudio virtual vs. set físico | ~2,000 | Yes | Article + FAQPage |
| Medir ROI video corporativo | ~1,800 | 5 Q&As | Article + FAQPage |
| Filtros AR para marca | ~2,000 | Yes | Article + FAQPage |
| Circuito cerrado vs. streaming | ~2,000 | Yes | Article + FAQPage |
| Contenido LinkedIn ejecutivos | ~2,000 | Yes | Article + FAQPage |
| Producción video corporativo paso a paso | ~2,000 | Yes | Article + FAQPage |

### Content Issues

| Severity | Issue | Details |
|----------|-------|---------|
| High | Unsourced statistics | Blog posts cite data (e.g., "95% de hogares compraron online", "USD 562B live shopping China") without hyperlinked source URLs. AI systems treat unlinked stats as opinions. |
| Medium | Same meta description on some pages | Several service pages appear to use the same generic company description |
| Medium | Blog date inconsistency | One post shows published: May 19 but updated: May 12 — chronologically impossible |
| Low | Portfolio page is thin | ~450 words, primarily a visual grid without descriptive content |
| Low | No "Last updated" dates on service pages | Reduces freshness signal |

---

## 3. On-Page SEO (75/100)

### Title Tags

| Page | Title | Length | Geo Modifier | Assessment |
|------|-------|--------|--------------|------------|
| Homepage | Productora audiovisual en Santiago de Chile — 15 años \| DAR2 | 63 chars | Santiago de Chile | Excellent |
| /servicios/ | Servicios audiovisuales: streaming, live shopping y más \| DAR2 | 60 chars | None | Missing geo |
| /servicios/streaming/ | Streaming corporativo profesional en Chile \| DAR2 | 50 chars | Chile | Good |
| /servicios/live-shopping/ | Live Shopping en Chile — Ventas en vivo para retail \| DAR2 | 55 chars | Chile | Good |
| /servicios/videos-corporativos/ | Videos corporativos e institucionales en Chile \| DAR2 | 50 chars | Chile | Good |
| /servicios/estudio-virtual/ | Estudio virtual con green screen y escenografías 3D \| DAR2 | 56 chars | None | Missing geo |
| /blog/ | Blog — Guías de producción audiovisual y live shopping \| DAR2 | 56 chars | None | Missing geo |
| /nosotros/ | Equipo DAR2 — 15 años produciendo audiovisual | 47 chars | None | Missing geo |
| /contacto/ | Contacto — Cotiza tu proyecto audiovisual en 48h \| DAR2 | 53 chars | None | Missing geo |

### Heading Structure

All pages have a single H1, followed by semantic H2/H3 hierarchy. This is correct.

**Issue:** H2 headings on blog posts are declarative rather than interrogative. "Cómo funciona una sesión de live shopping" should be "¿Cómo funciona una sesión de live shopping en Chile?" to better match AI query extraction.

### Internal Linking

- Navigation: 7 main sections (Servicios, Portafolio, Casos, Blog, Nosotros, Contacto, Cotizar)
- Service pages cross-link to related services ("Servicios relacionados")
- Blog posts link to service pages via CTAs
- Footer repeats all major navigation links
- Portfolio links to individual project pages

**Gap:** Blog posts do not cross-link to each other. No "Related posts" or topical cluster linking.

### Issues

| Severity | Issue | Affected Pages |
|----------|-------|----------------|
| Medium | Missing geo modifier in title tags | /servicios/, /estudio-virtual/, /blog/, /nosotros/, /contacto/ |
| Medium | Declarative H2 headings instead of question format | All 8 blog posts |
| Medium | No inter-blog cross-linking | All blog posts |
| Low | H2s on homepage are branding-focused, not keyword-optimized | Homepage |

---

## 4. Schema & Structured Data (82/100)

### Implementation Summary

| Schema Type | Pages | Status |
|-------------|-------|--------|
| LocalBusiness + ProfessionalService | All pages | Excellent — consistent with @id cross-referencing |
| WebSite | Homepage | Good — has publisher @id reference, inLanguage |
| Person (founder) | All pages | Good — but missing sameAs for LinkedIn |
| BreadcrumbList | Inner pages | Correct 3-level hierarchy |
| FAQPage | Service + blog pages | Excellent — 5 Q&As per page, rich result eligible |
| Service | Individual service pages | Good — has provider @id, areaServed, serviceType |
| Article | Blog posts | Good — headline, dates, author, publisher @id |
| ItemList + VideoObject | Portfolio | Good — 19 entries with YouTube links |
| OfferCatalog | Homepage/all | Good — 8 services linked |
| AggregateRating | All pages | Present — 5.0 / 12 reviews |
| GeoCoordinates | All pages | Present with address |
| OpeningHoursSpecification | All pages | Mon-Fri 09:00-19:00 |

### Validation Results

**Correct:**
- @id referencing between Organization, WebSite, and Person schemas
- AggregateRating with ratingValue, reviewCount, bestRating
- Full PostalAddress with streetAddress, locality, region, postal code, country
- OfferCatalog linking to all 8 service URLs
- BreadcrumbList correctly nested on service and blog pages

**Issues:**

| Severity | Issue | Details |
|----------|-------|---------|
| Medium | Missing VideoObject on case study pages | For a video production company, individual video pages should have VideoObject schema |
| Medium | Missing HowTo schema | Blog posts on procedural topics (paso a paso, cómo transmitir) lack HowTo markup — strong AI Overview trigger |
| Medium | Person schema missing sameAs | Carlos Rios Guevara's LinkedIn URL is in llms.txt but not in on-page Person schema |
| Low | Missing GBP URL in sameAs | `https://maps.google.com/?cid=6666778595618035561` should be in the sameAs array |
| Low | Geo precision excessive | Coordinates use 15 decimal places; 5 is recommended |
| Low | Missing ContactPage schema | /contacto/ lacks ContactPage or ContactPoint schema |
| Low | No SearchAction in WebSite | Not critical for a 25-page site but a missed opportunity |

### Rich Result Eligibility

| Rich Result | Eligible | Notes |
|-------------|----------|-------|
| FAQ Rich Results | YES | FAQPage schema on 16 pages (8 services + 8 blog) |
| Breadcrumbs | YES | BreadcrumbList on inner pages |
| Local Business | YES | Full LocalBusiness with address, hours, rating |
| Article | YES | Blog posts with full Article schema |
| Video | PARTIAL | Portfolio has VideoObject but individual pages don't |
| HowTo | NO | Missing schema on procedural content |
| Review Snippet | YES | AggregateRating present |

---

## 5. Performance / Core Web Vitals (80/100 — Estimated)

> Note: PageSpeed Insights API was rate-limited during this audit. Score is estimated based on static analysis of the tech stack and implementation patterns.

### Architecture Assessment

| Factor | Status | Impact |
|--------|--------|--------|
| Astro.js SSG | Excellent | Pre-rendered HTML, minimal client JS, fast TTFB |
| Tailwind CSS | Good | Utility-first, likely purged in production |
| Image formats | Good | WebP and AVIF detected |
| Lazy loading | Good | Implemented via Intersection Observer |
| Third-party scripts | Moderate risk | GTM (GTM-5NBSGWM5), Web3Forms, Behold Instagram widget |
| Font loading | Good | Inter Variable with system fallback |
| JS framework weight | Minimal | No React/Vue/heavy client-side framework |

### Estimated CWV Status

| Metric | Estimated | Threshold | Likely Status |
|--------|-----------|-----------|---------------|
| LCP | <2.5s | 2.5s | Good |
| FCP | <1.8s | 1.8s | Good |
| CLS | <0.1 | 0.1 | Good (lazy loading may cause minor shifts) |
| TBT | <200ms | 200ms | Good (minimal JS) |
| TTFB | <800ms | 800ms | Good (static hosting) |

### Potential Issues

| Severity | Issue | Details |
|----------|-------|---------|
| Medium | Behold Instagram widget | Third-party JavaScript for Instagram feed could increase TBT |
| Low | GTM blocking | GTM may add render-blocking potential depending on tag configuration |
| Low | Marquee animations | CSS animations on client logo carousel could affect CLS on slower devices |

---

## 6. AI Search Readiness / GEO (71/100)

### AI Crawler Access

| Crawler | Status |
|---------|--------|
| GPTBot | ALLOWED |
| ClaudeBot | ALLOWED |
| anthropic-ai | ALLOWED |
| PerplexityBot | ALLOWED |
| Google-Extended | ALLOWED |
| ChatGPT-User | ALLOWED |
| OAI-SearchBot | NOT LISTED (gap) |
| CCBot | Allowed (default) |

### llms.txt

| Check | Status |
|-------|--------|
| /llms.txt | PRESENT — well-structured with services, blog, clients, FAQ, contact |
| /.well-known/llms.txt | 404 (missing) |
| llms-full.txt | NOT PRESENT |
| Last Updated date | Present (2026-05-25) |
| Canonical declaration | Present |

### Citability Assessment

**Strengths:**
- FAQ sections on all service and blog pages provide direct extraction surfaces
- Blog posts contain specific, numeric data points (ROI calculation: 440%, retention benchmarks, conversion rates)
- Consistent entity naming ("DAR2 Servicios Audiovisuales") across all pages
- SSR-rendered HTML ensures full content delivery to AI crawlers
- 30+ named client entities create authority associations in AI knowledge graphs

**Weaknesses:**
- Statistics lack hyperlinked source URLs — AI systems downgrade unlinked claims
- No YouTube channel linked (0.737 correlation with AI citations)
- H2/H3 headings are declarative, not interrogative — miss question-matching for AI extraction
- Blog answer paragraphs are sometimes too brief for optimal passage length (134-167 words target)
- Person schema for author lacks external sameAs links

### Platform-Specific Estimated Visibility

| Platform | Score | Key Bottleneck |
|----------|-------|----------------|
| Google AI Overviews | 68/100 | Missing HowTo schema, unsourced stats |
| Perplexity | 74/100 | Best score — llms.txt + FAQ schema |
| Claude | 77/100 | Both Claude crawlers allowed, strong llms.txt |
| ChatGPT | 62/100 | OAI-SearchBot missing, no YouTube |
| Bing Copilot | 61/100 | Low external citation presence |

---

## 7. Images (74/100)

### Format & Optimization

| Check | Status |
|-------|--------|
| Modern formats (WebP/AVIF) | PASS — detected in source |
| Lazy loading | PASS — Intersection Observer implemented |
| Responsive images | Partial — srcset not confirmed on all images |
| Image compression | Likely good (Astro build pipeline) |

### Alt Text

| Page Type | Status | Notes |
|-----------|--------|-------|
| Portfolio images | PASS | Descriptive alt text: "Diversidad & Inclusión — Polpaico" |
| Client logos | PASS | Named: "Logo abcdin", "Logo banco de chile" |
| Hero images | PASS | Descriptive alt text present |
| Service card images | PARTIAL | Some may lack descriptive alt attributes |
| Blog featured images | PARTIAL | Filenames are descriptive but explicit alt text not confirmed on all |
| Team photos | FAIL | No explicit alt attributes visible |

### Issues

| Severity | Issue | Details |
|----------|-------|---------|
| Medium | Team member photos lack alt text | 8 team photos on /nosotros/ without descriptive alt attributes |
| Medium | Some service images missing alt text | Service card images on /servicios/ may lack alt attributes |
| Low | No OG image dimensions specified | og:image present but width/height meta tags not confirmed |

---

## 8. Local SEO (67/100)

### NAP Consistency

| Source | Name | Address | Phone |
|--------|------|---------|-------|
| Homepage footer | DAR2 Servicios Audiovisuales | Av. Holanda 099, of 603, Providencia | +56998433346 |
| Contact page | DAR2 Servicios Audiovisuales | Av. Holanda 099, of. 603, Providencia | +56 9 9843 3346 |
| JSON-LD Schema | DAR2 Servicios Audiovisuales | Av. Holanda 099, of 603, Providencia, RM, 7510689, CL | +56998433346 |

**Issues:** Minor punctuation inconsistency ("of 603" vs "of. 603"), phone formatting varies (condensed vs. spaced).

### GBP Signals

- Google Maps CID confirmed: 6666778595618035561
- Maps iframe embedded on /contacto/
- AggregateRating: 5.0 / 12 reviews
- GBP URL NOT in schema sameAs array

### Review Health

| Metric | Value | Assessment |
|--------|-------|------------|
| Google Rating | 5.0 / 5.0 | Excellent |
| Review Count | 12 | Critically low for a 15-year B2B company |
| Other platforms | None detected | Major gap — no Clutch, Trustpilot, Yelp |

### Citation Status

| Platform | Status | Priority |
|----------|--------|----------|
| Google Business Profile | Confirmed | Verified |
| Instagram | Active (@dar2.cl) | Good |
| LinkedIn | Active (company/dar2) | Good |
| Clutch.co | NOT PRESENT | Critical for B2B |
| Páginas Amarillas Chile | NOT DETECTED | High |
| Apple Maps | NOT VERIFIED | Medium |
| Waze | NOT VERIFIED | Medium |

### Key Recommendations

1. Launch active review acquisition campaign (target: 1 review per 2 weeks)
2. Create Clutch.co profile with verified client reviews
3. Add GBP URL to schema sameAs
4. Standardize NAP formatting across all touchpoints
5. Create dedicated location page at /produccion-audiovisual-santiago/
6. Verify GBP primary category is optimal ("Empresa de producción de vídeos")

---

## 9. Search Experience / SXO (54/100)

### SERP Competitor Landscape

| Query | SERP Dominant Type | DAR2 Match |
|-------|--------------------|------------|
| productora audiovisual santiago | Directories + specialist homepages | Partial match — homepage competes but lacks depth vs. specialists |
| streaming corporativo chile | Dedicated streaming company pages | Match — /servicios/streaming/ exists with deep content |
| live shopping chile | 70% informational / 30% platform | Partial — blog post exists but service page could be stronger |
| videos corporativos santiago | Dedicated service pages with pricing | Match — /servicios/videos-corporativos/ exists |
| estudio virtual santiago | Mixed studio rental + informational | Partial — page exists but missing geo in title |

> Note: DAR2's service pages exist at /servicios/[service-slug]/ URLs (confirmed via sitemap and fetching). These pages have strong content depth (1,800-2,500 words each with FAQs).

### Persona Scoring

| Persona | Score | Key Gap |
|---------|-------|---------|
| Procurement Officer | 42/100 | No pricing context, no scope-of-work examples |
| Head of Digital Commerce | 51/100 | Live shopping page needs stronger conversion data |
| Corporate Communications Manager | 58/100 | No preferred-supplier or retainer pathway |
| Marketing Manager (mediana empresa) | 62/100 | Blog content not surfacing in SERP for educational queries |
| Event Planner / Agency | 67/100 | No agency-specific landing page or fast-quote path |

### Key Issues

| Severity | Issue | Details |
|----------|-------|---------|
| High | No pricing transparency | Zero pricing context on any service page. Competitors (FeriaPixel) have dedicated pricing subpages |
| High | Hero H1 leads with "live shopping" | Creates mismatch for visitors arriving via broader queries like "productora audiovisual santiago" |
| Medium | No "para agencias" or B2B landing page | Missing conversion path for the agency/subcontractor persona |
| Medium | Blog content not ranking for target queries | 8 posts exist but aren't appearing in SERP for primary keywords |
| Medium | Low review count vs. competitors | 12 reviews compared to competitors with 50-100+ |

---

## Site Architecture Map

```
dar2.cl/
├── servicios/
│   ├── streaming/
│   ├── live-shopping/
│   ├── circuito-cerrado/
│   ├── estudio-virtual/
│   ├── videos-corporativos/
│   ├── estrategias-digitales/
│   ├── redes-sociales/
│   └── filtros-ar/
├── blog/
│   ├── que-es-live-shopping-chile/
│   ├── transmitir-junta-anual-sin-caidas/
│   ├── estudio-virtual-vs-set-fisico/
│   ├── medir-roi-video-corporativo/
│   ├── filtros-ar-marca-instagram-tiktok/
│   ├── circuito-cerrado-vs-streaming/
│   ├── contenido-linkedin-ejecutivos/
│   └── produccion-video-corporativo-paso-a-paso/
├── casos/
│   ├── cirugia-robotica-clinica-santa-maria/
│   └── valores-corporativos-castano/
├── portafolio/
├── nosotros/
├── contacto/
├── privacidad/
├── llms.txt
├── robots.txt
└── sitemap-index.xml → sitemap-0.xml (25 URLs)
```

---

## Tech Stack Summary

| Component | Technology |
|-----------|-----------|
| Framework | Astro.js (Static Site Generator) |
| CSS | Tailwind CSS (utility-first) |
| Analytics | Google Tag Manager (GTM-5NBSGWM5) |
| Forms | Web3Forms API |
| Instagram | Behold widget embed |
| Images | WebP/AVIF with lazy loading |
| Hosting | Static (CDN-served) |
| Language | Spanish (es-CL) |

---

*Report generated by Claude Code SEO Audit — May 25, 2026*
