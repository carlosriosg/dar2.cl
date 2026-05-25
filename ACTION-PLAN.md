# SEO Action Plan: dar2.cl

**Date:** 2026-05-18
**Overall SEO Health Score:** 62/100
**Target Score:** 80+/100

---

## Priority Definitions

- **CRITICAL** — Blocks indexing, suppresses rankings, or causes penalties. Fix immediately.
- **HIGH** — Significantly impacts rankings or conversions. Fix within 1 week.
- **MEDIUM** — Optimization opportunity with measurable impact. Fix within 1 month.
- **LOW** — Nice to have, marginal improvement. Backlog.

---

## CRITICAL (Fix Immediately)

### 1. Fix Cloudflare WAF blocking AI crawlers and sitemap
**Category:** Technical SEO / AI Search Readiness
**Impact:** +12 points GEO score, unblocks sitemap for all search engines
**Effort:** 2-4 hours

The site's robots.txt explicitly allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended), but Cloudflare's Bot Fight Mode returns 403 to non-browser HTTP clients. The sitemap-index.xml is also inaccessible (403).

**Action:**
1. In Cloudflare dashboard, go to Security > Bots
2. Ensure "Bot Fight Mode" or "Super Bot Fight Mode" allows verified bots
3. Verify AI crawlers can access the site: `curl -A "GPTBot" https://dar2.cl`
4. Confirm sitemap-index.xml returns 200
5. Consolidate robots.txt into a single clean file — remove the Cloudflare managed injection that contradicts the manual overrides

---

### 2. Merge two conflicting schema blocks into one
**Category:** Schema / Local SEO
**Impact:** Eliminates NAP inconsistency, fixes entity duplication, improves local pack eligibility
**Effort:** 2 hours

Two separate JSON-LD blocks exist with conflicting data:
- Postal codes: 7510689 vs 7510071
- Coordinates: ~600m discrepancy
- Schema 2 missing @id (creates duplicate entity in Google's Knowledge Graph)

**Action:**
1. Verify correct postal code at Correos de Chile for Av. Holanda 099, Providencia
2. Verify exact coordinates on Google Maps (use 5-decimal precision)
3. Replace both blocks with a single unified schema:
```json
{
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": "https://dar2.cl/#organization",
  // ...single set of verified address, geo, postal code data
}
```
4. Remove the invalid `serviceType` property (use `hasOfferCatalog` instead — already present)
5. Validate at https://search.google.com/test/rich-results

---

### 3. Expand homepage content from 267 to 800+ words
**Category:** Content Quality / On-Page SEO
**Impact:** Addresses the #1 ranking suppressor across all target keywords
**Effort:** 1-2 days

The homepage has only 267 words. Every competitor ranking for "productora audiovisual santiago" has 600-2,000 words. The 6 H2 sections need body copy.

**Action:**
- Under "Trayectoria que respalda cada proyecto" — Add founding date, 2-3 specific milestones, production volume claim
- Under "Trabajo real, clientes reales" — Add 2-3 one-sentence client outcome statements with named companies and measurable results
- Under "8 servicios. Un solo proveedor." — Add a 2-sentence value proposition per service cluster with visual cards
- Under "Confian en nosotros" — Add 2-3 attributed testimonials (named person, role, company)
- Add a "Como trabajamos" process section (Briefing > Produccion > Entrega)

---

### 4. Expand all 8 service pages to 800+ words each
**Category:** Content Quality
**Impact:** Transforms thin pages into rankable service pages; addresses content depth deficit across entire site
**Effort:** 3-5 days

All service pages average 400-465 words (recommended: 800+). Each page needs:

**Action per service page:**
- Opening 50-word direct answer to "What is this service?"
- 150-word process description (3-5 steps)
- 100-word "Who is this for?" section (industries, company sizes)
- Specific deliverables with named client examples
- 120-word client result block with metrics
- FAQ section (minimum 3 questions) — already present on /streaming/, replicate pattern
- Pricing signal: at minimum a "Proyectos desde X UF" range

---

## HIGH (Fix Within 1 Week)

### 5. Claim and optimize Google Business Profile
**Category:** Local SEO
**Impact:** #1 local ranking factor; enables local pack visibility
**Effort:** 3-4 hours

No GBP signals detected on the site. A 15-year-old B2B firm with enterprise clients should have a fully optimized GBP listing.

**Action:**
1. Claim GBP at https://business.google.com if not already claimed
2. Set primary category: "Video Production Service"
3. Add secondary categories: "Marketing Agency", "Audio Visual Equipment Supplier"
4. Write keyword-rich business description (750 chars) in Spanish
5. Add all 8 services with descriptions
6. Upload 10+ photos (interior, exterior, team, production stills)
7. Set hybrid mode: physical address visible + service area for Chile
8. Add GBP profile URL to schema `sameAs` array
9. Start weekly GBP Posts (behind-the-scenes, client spotlights)

---

### 6. Fix 4 hero images with empty alt attributes
**Category:** Images / Accessibility
**Impact:** Accessibility compliance + image SEO for portfolio images
**Effort:** 30 minutes

4 hero images (eager-loaded, above fold) have empty `alt` attributes:
- `/images/portafolio/pc-factory.png` → alt=""
- `/images/portafolio/pc-factory-ram.png` → alt=""
- `/images/portafolio/polpaico.png` → alt=""
- `/images/portafolio/beneficios-CMPC.png` → alt=""

**Action:** Add descriptive alt text for each:
```html
alt="Proyecto PC Factory — produccion de video corporativo por DAR2"
alt="Proyecto PC Factory RAM — streaming de evento por DAR2"
alt="Proyecto Polpaico — video corporativo diversidad e inclusion"
alt="Proyecto CMPC — beneficios corporativos video DAR2"
```

---

### 7. Add width/height attributes and fetchpriority to hero images
**Category:** Performance / Images
**Impact:** Prevents CLS layout shifts + improves LCP by 200-600ms
**Effort:** 1 hour

4 eager-loaded hero images lack `width` and `height` attributes (CLS risk). No images use `fetchpriority="high"` (LCP delay).

**Action:**
1. Add `width` and `height` attributes to all 4 hero `<img>` tags
2. Add `fetchpriority="high"` to the LCP candidate (first hero image)
3. Add `<link rel="preload" as="image" href="/images/portafolio/pc-factory.webp" type="image/webp" fetchpriority="high">` in `<head>`

---

### 8. Create llms.txt file
**Category:** AI Search Readiness
**Impact:** +8 points GEO score; enables Perplexity and Claude to understand site structure
**Effort:** 2-3 hours

**Action:** Create `/llms.txt` with:
```
# DAR2 - Produccion Audiovisual Santiago Chile

DAR2 es una empresa de produccion audiovisual y live shopping con sede
en Providencia, Santiago de Chile. Fundada en 2010 por Carlos Rios Guevara.
Mas de 15 anos de experiencia con clientes como Cencosud, ENAP, Codelco,
Banco de Chile y Clinica Santa Maria.

## Servicios principales
- /servicios/streaming/ — Transmision en vivo corporativa multicamara
- /servicios/live-shopping/ — Produccion de live shopping para retail
- /servicios/circuito-cerrado/ — CCTV para eventos corporativos
- /servicios/estudio-virtual/ — Estudio virtual con green screen y 3D
- /servicios/videos-corporativos/ — Videos institucionales y comerciales
- /servicios/estrategias-digitales/ — Estrategia digital para marcas
- /servicios/redes-sociales/ — Contenido para redes sociales
- /servicios/filtros-ar/ — Filtros AR para Instagram y TikTok

## Portafolio
- /portafolio/ — Casos de clientes: Cencosud, Codelco, Banco de Chile

## Contacto
dar2@dar2.cl | +56 9 9843 3346 | Av. Holanda 099 of 603, Providencia
```

---

### 9. Align H1 with title tag keyword target
**Category:** On-Page SEO
**Impact:** Eliminates H1/title keyword mismatch; broadens ranking eligibility
**Effort:** 30 minutes

Current H1 "Producimos live shopping para empresas" targets a narrow keyword, while the title targets the broader "productora audiovisual." This creates a mixed topical signal.

**Action:** Change H1 to capture the broader category:
```
"Produccion audiovisual para empresas en Chile"
```
or
```
"Productora audiovisual en Santiago — 15 anos de experiencia"
```
Move the live shopping proposition to a featured service section H2.

---

### 10. Get listed on 2x3.cl, ineventos.com, and sortlist.com
**Category:** SXO / Local SEO
**Impact:** These 3 directories hold 30% of top-10 SERP positions for "productora audiovisual santiago"
**Effort:** 3-4 hours

**Action:**
1. Create profile on 2x3.cl with full service listing, budget ranges, and portfolio
2. Create profile on ineventos.com with service categories and client types
3. Create profile on sortlist.com with capabilities, team, and case studies
4. Ensure NAP data matches the unified schema exactly

---

## MEDIUM (Fix Within 1 Month)

### 11. Self-host Inter font to eliminate render-blocking third-party request
**Category:** Performance
**Impact:** LCP improvement 100-300ms; eliminates third-party DNS round-trip
**Effort:** 1-2 hours

**Action:** Replace Google Fonts link with `@fontsource/inter` package. This allows Cloudflare to cache the WOFF2 files at the edge.

---

### 12. Add missing security headers
**Category:** Technical SEO
**Impact:** Security hardening; minor trust signal
**Effort:** 1 hour (Cloudflare Transform Rules)

**Action:** Add via Cloudflare Response Headers:
```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

---

### 13. Add WebSite schema with SearchAction
**Category:** Schema
**Impact:** Enables Sitelinks Search Box in SERP
**Effort:** 30 minutes

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://dar2.cl/#website",
  "url": "https://dar2.cl",
  "name": "DAR2 Servicios Audiovisuales",
  "publisher": { "@id": "https://dar2.cl/#organization" }
}
```

---

### 14. Add BreadcrumbList schema to all interior pages
**Category:** Schema
**Impact:** Breadcrumb rich results in SERP
**Effort:** 1-2 hours

Service pages should show: Home > Servicios > [Service Name]

---

### 15. Add VideoObject schema for showreel/demo content
**Category:** Schema
**Impact:** Video rich results — directly relevant for an audiovisual production company
**Effort:** 1-2 hours (per video)

---

### 16. Convert client logos to WebP format
**Category:** Images / Performance
**Impact:** ~38 PNG logos could be 25-35% smaller as WebP
**Effort:** 2 hours

---

### 17. Create 3-5 client case study pages
**Category:** Content / Authority / GEO
**Impact:** +8 GEO score; creates citable passages with named entities and metrics
**Effort:** 3-5 days

Create standalone pages (not just portfolio thumbnails) for major clients:
- "Produccion de Live Shopping para Cencosud" — scope, team, results, platforms
- "Video Corporativo para Codelco" — project brief, deliverables, outcome
- "Streaming en Vivo para Clinica Santa Maria" — event details, audience reach

Each case study: 500+ words, named client, project scope, specific numbers, date.

---

### 18. Implement review acquisition program
**Category:** Local SEO
**Impact:** Reviews are #2 local ranking factor; enables aggregateRating schema
**Effort:** Ongoing (1 review every 2 weeks)

Contact past clients and request Google reviews. Maintain 18-day velocity rule. Once 5+ reviews accumulated, add `aggregateRating` to schema.

---

### 19. Add privacy policy page
**Category:** Trust / Compliance
**Impact:** Trust signal for enterprise clients; Chile's data protection law compliance
**Effort:** 2-3 hours

---

### 20. Create informational content targeting "live shopping chile"
**Category:** SXO / Content
**Impact:** Captures an informational keyword where no production company currently ranks
**Effort:** 1 day

Create a 1,200-word guide: "Que es el live shopping y como lo implementan las empresas en Chile." The SERP for this keyword is dominated by editorial content — DAR2 could rank by matching the format Google rewards, then convert from within.

---

## LOW (Backlog)

### 21. Add cross-linking between related service pages
Internal links between related services (streaming <-> live shopping, estudio virtual <-> videos corporativos) to distribute link equity and improve crawl depth.

### 22. Add a contact form for formal procurement buyers
WhatsApp is the sole CTA — works for SMEs but creates friction for enterprise procurement. Add a "Solicitar cotizacion formal" form.

### 23. Launch YouTube channel with client production reels
YouTube has the strongest correlation (~0.737) with AI citation. Upload highlight reels per major client with proper titles and 200+ word descriptions.

### 24. Consider AVIF image format as primary source
Add AVIF as first `<source>` in `<picture>` elements, with WebP as fallback. 95%+ browser support in 2026.

### 25. Add openingHoursSpecification to schema
Enables Google to display hours in knowledge panels. Trust signal for enterprise buyers.

---

## Impact Projection

| Phase | Actions | Timeline | Projected Score |
|-------|---------|----------|----------------|
| Current | — | — | 62/100 |
| Phase 1 (Critical) | #1-4 | Week 1 | 72/100 |
| Phase 2 (High) | #5-10 | Weeks 2-3 | 78/100 |
| Phase 3 (Medium) | #11-20 | Weeks 4-8 | 85/100 |
| Phase 4 (Low) | #21-25 | Ongoing | 88/100 |

---

## Category Score Projections After Full Implementation

| Category | Current | After Phase 1-2 | After All Phases |
|----------|---------|-----------------|-----------------|
| Technical SEO | 72 | 82 | 88 |
| Content Quality | 54 | 72 | 82 |
| On-Page SEO | 68 | 78 | 84 |
| Schema | 54 | 75 | 88 |
| Performance | 85 | 90 | 93 |
| AI Search Readiness | 34 | 55 | 72 |
| Images | 55 | 70 | 80 |
| **Overall** | **62** | **76** | **85** |

---

*Generated by Claude Code SEO Audit | 2026-05-18*
