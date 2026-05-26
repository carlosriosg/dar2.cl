# SEO Action Plan: dar2.cl

**Site:** https://dar2.cl/
**Business:** DAR2 Servicios Audiovisuales
**Overall SEO Health Score:** 62/100
**Date:** 2026-05-26

---

## Priority Definitions

- **Critical**: Blocks indexing, causes penalties, or actively harms rankings (fix immediately)
- **High**: Significantly impacts rankings or conversions (fix within 2 weeks)
- **Medium**: Optimization opportunity with measurable impact (fix within 1 month)
- **Low**: Nice to have, long-term improvements (backlog)

---

## ✅ Completed (commit f531e61 — 2026-05-26)

### ✅ 1. Truncate ALL title tags to <60 characters
**Category:** On-Page SEO
**Status:** ✅ DONE
**Changes:**
- Homepage: `"Productora de Streaming en Santiago | DAR2"` (41 chars)
- /servicios/: `"Servicios Audiovisuales | DAR2"` (28 chars)
- /contacto/: `"Contacto — Cotiza tu proyecto en 48h | DAR2"` (46 chars)
- /blog/: `"Blog de Producción Audiovisual | DAR2"` (38 chars)
- All service pages and blog posts updated with consistent format

### ✅ 2. Remove broken SearchAction schema
**Category:** Schema
**Status:** ✅ DONE
**Fix:** Removed the `potentialAction` block from WebSite JSON-LD in Base.astro layout.

### ✅ 5. Fix AggregateRating schema
**Category:** Schema
**Status:** ✅ DONE
**Fix:** Changed `"5.0"` (string) to `5.0` (number). Added `worstRating: 1`.

### ✅ 10. Add `dateModified` to all BlogPosting schema
**Category:** Schema
**Status:** ✅ DONE
**Fix:** Added `"dateModified"` to BlogPosting schema in blog/index.astro. Individual blog posts already had it.

### ✅ 11. Add preconnect hints for third-party origins
**Category:** Performance
**Status:** ✅ DONE
**Fix:** Added to Base.astro `<head>`:
```html
<link rel="preconnect" href="https://www.googletagmanager.com">
<link rel="preconnect" href="https://w.behold.so" crossorigin>
<link rel="preconnect" href="https://api.web3forms.com" crossorigin>
```

### ✅ 12. Reserve height for Behold Instagram widget
**Category:** Performance (CLS)
**Status:** ✅ DONE
**Fix:** Added `min-height: 600px` to behold-widget CSS in index.astro.

### ✅ NAP Consistency Fix
**Category:** Local SEO
**Status:** ✅ DONE
**Fix:** Changed `"of 603"` to `"Oficina 603"` in Base.astro schema for NAP consistency with visible text on /contacto/.

---

## Critical (Fix Immediately) — Remaining

### 3. Fix HTTP Content-Type header to include charset=utf-8
**Category:** Technical SEO
**Impact:** Fixes corrupted Spanish characters in all schema descriptions sitewide
**Effort:** Server/CDN configuration change
**Fix:** Ensure the HTTP response header includes `Content-Type: text/html; charset=utf-8`. Check Cloudflare settings or Astro's server configuration.

### 4. Edge-cache HTML on Cloudflare
**Category:** Performance
**Impact:** -200-600ms LCP improvement
**Effort:** Cloudflare Cache Rule, 10 minutes
**Fix:** The HTML is served as `cf-cache-status: DYNAMIC` on every request. Since Astro generates static HTML, add a Cloudflare Cache Rule: `Cache-Control: s-maxage=3600, stale-while-revalidate=86400`. TTFB drops from ~350ms to <50ms.

---

## High (Fix Within 2 Weeks)

### 6. Add Google Maps iframe to /contacto/
**Category:** Local SEO
**Impact:** Critical GBP signal + UX improvement
**Effort:** 15 minutes
**Fix:** Embed Google Maps using CID 6666778595618035561. Place prominently on the contact page.

### 7. Expand /casos/ case studies
**Category:** Content / E-E-A-T
**Impact:** Trust for procurement buyers, E-E-A-T authority
**Effort:** 4-6 hours
**Fix:** Expand each case study to 400-600 words with: Desafío → Solución → Ejecución → Resultados (with measurable outcomes: viewer count, connection stability, client repeat rate). Add at least 1-2 more case studies from financial/retail clients.

### 8. Expand /servicios/ hub from 361 to 800+ words
**Category:** Content
**Impact:** Category keyword coverage
**Effort:** 2-3 hours
**Fix:** Add a comparison matrix of the 8 services, FAQs, and a "how to choose" decision section.

### 9. Add `url` and `image` to Service schema
**Category:** Schema
**Impact:** Service-page association in Google's understanding
**Effort:** 1 hour total (all service pages)
**Fix:** Each Service JSON-LD block needs a `url` pointing to its canonical page and an `image` property.

### 10. Add `dateModified` to all BlogPosting schema
**Category:** Schema
**Impact:** Article rich results eligibility
**Effort:** Template change
**Fix:** Add `"dateModified": "YYYY-MM-DD"` to each BlogPosting in the Blog hub schema and individual post pages.

### 11. Add preconnect hints for third-party origins
**Category:** Performance
**Impact:** -100-300ms per page load
**Effort:** 5 minutes
**Fix:** Add to `<head>` after charset/viewport meta:
```html
<link rel="preconnect" href="https://www.googletagmanager.com">
<link rel="preconnect" href="https://w.behold.so" crossorigin>
<link rel="dns-prefetch" href="https://feeds.behold.so">
```

### 12. Reserve height for Behold Instagram widget
**Category:** Performance (CLS)
**Impact:** Eliminates highest CLS risk
**Effort:** 10 minutes
**Fix:** Add CSS: `behold-widget, [data-behold-id] { min-height: 420px; display: block; }`

### 13. Add VideoObject schema for portfolio YouTube videos
**Category:** Schema
**Impact:** Video rich results — highest visibility gain
**Effort:** 1-2 hours
**Fix:** Add VideoObject JSON-LD for each of the 19 YouTube embeds on /portafolio/. Include: name, description, thumbnailUrl, uploadDate, contentUrl, embedUrl, publisher.

### 14. Consolidate to one sitemap with real lastmod dates
**Category:** Technical SEO
**Impact:** Crawl efficiency + freshness signals
**Effort:** 1-2 hours
**Fix:**
1. Keep Astro auto-generated sitemap (`sitemap-index.xml`)
2. Implement git-based lastmod in Astro's sitemap serialize hook
3. Remove deprecated priority/changefreq
4. Update robots.txt: `Sitemap: https://dar2.cl/sitemap-index.xml`
5. Retire `sitemap-manual.xml`

### 15. Launch review acquisition program
**Category:** Local SEO
**Impact:** Local ranking + trust signals
**Effort:** Ongoing process
**Fix:** Target 30+ Google reviews within 6 months. Send direct review link (g.page/r/CWmX_YPPJ4VcEBM/review) via WhatsApp/email within 72 hours of project delivery. Minimum 1 new review every 15 days to stay above the 18-day velocity cliff.

---

## Medium (Fix Within 1 Month)

### 16. Add source citations to blog statistics
**Category:** Content / E-E-A-T
**Impact:** Citability + credibility
**Effort:** 2-4 hours editing
**Fix:** Link to eMarketer, Statista, CCS for claims like "USD 562B China live shopping", "95% Chilean households online", "70% don't measure ROI".

### 17. Create standalone author page for Carlos Rios Guevara
**Category:** E-E-A-T
**Impact:** Strengthens Person entity + authorship trail
**Effort:** 1-2 hours
**Fix:** Create `/nosotros/carlos-rios-guevara/` with 300-500 word bio, UNIACC details, production history, links to authored blog posts. Update Person schema `url` to point here.

### 18. Stagger blog publication dates for future posts
**Category:** Content
**Impact:** Reduces AI-batch-generation perception
**Effort:** Process change
**Fix:** All 8 current posts dated 2026-05-19 (red flag). Going forward, publish individually across weeks. If posts were genuinely authored at different times, update datePublished to reflect actual dates.

### 19. Add comparison tables to vs-type blog posts
**Category:** Content / GEO
**Impact:** AI citation + structured readability
**Effort:** 2-3 hours
**Fix:** Convert "Circuito cerrado vs. streaming" and "Estudio virtual vs. set físico" prose comparisons into HTML tables (5-8 rows: cost, setup time, audience size, use case, equipment).

### 20. Publish RUT (Chilean tax ID) on contact + nosotros pages
**Category:** Trust / Local SEO
**Impact:** Chilean B2B procurement trust signal
**Effort:** 5 minutes

### 21. Convert client relationships into backlinks
**Category:** Backlinks
**Impact:** Authority building (currently near-zero)
**Effort:** Ongoing outreach
**Fix:** Draft personalized emails to client marketing contacts (Cencosud, ENAP, Banco Chile). Propose joint case studies or "produced by" credits with links. Even 3-4 enterprise backlinks would push dar2.cl above CC reporting threshold.

### 22. Create YouTube channel
**Category:** GEO / Backlinks
**Impact:** Strongest AI citation signal (0.737 correlation) + high-DA referring domain
**Effort:** Ongoing
**Fix:** Upload 3-5 portfolio clips. Include https://dar2.cl/ in every description. Mirror blog content as 5-10 minute video explainers.

### 23. Create Clutch.co profile
**Category:** Local SEO / Citations
**Impact:** High-DA B2B citation + review channel
**Effort:** 2-3 hours
**Fix:** Register at clutch.co/agencies/video-production. Claim Chile/Santiago category. Request 3-5 client reviews.

### 24. Add srcset to images for responsive delivery
**Category:** Performance
**Impact:** Mobile performance improvement
**Effort:** 2-3 hours
**Fix:** Generate multiple image sizes at build time. Add srcset to `<picture>` sources. Mobile users currently receive desktop-sized images.

### 25. Implement two-track CTA system
**Category:** SXO / Conversion
**Impact:** Serves consideration-stage visitors
**Effort:** 4-6 hours
**Fix:**
- Track 1 (decision-ready): Keep WhatsApp "Cotizar ahora"
- Track 2 (consideration): "Descargar ficha de servicios" (PDF) or "Ver proceso en detalle"
- Every service page and blog post should offer both tracks

---

## Low (Backlog)

### 26. Fix llms.txt to spec-compliant format
**Category:** GEO
**Impact:** AI search indexing
**Effort:** 1-2 hours
**Fix:** Replace paragraph-style content with structured Markdown: brief description + `## Sections` block listing key pages with titles and URLs.

### 27. Build Wikidata entity for DAR2
**Category:** GEO
**Impact:** AI entity disambiguation
**Effort:** 3-6 hours
**Fix:** Create Wikidata item: instance of "audiovisual production company", country Chile, founded 2010, founder Carlos Rios Guevara, headquarters Providencia, Santiago.

### 28. Expand /portafolio/ with descriptive text per project
**Category:** Content
**Impact:** Content depth + searchability
**Effort:** 2-3 hours
**Fix:** Add 50-100 word description per portfolio item: client, challenge, format, technical approach.

### 29. Add hreflang to all pages (not just homepage)
**Category:** Technical SEO
**Impact:** International signal consistency
**Effort:** Template change
**Fix:** hreflang es-CL + x-default currently only on homepage. Add to all 26 pages.

### 30. Add verified testimonials with company affiliation
**Category:** E-E-A-T / Trust
**Impact:** Verifiable social proof
**Effort:** Requires client approval
**Fix:** Request permission from testimonial authors to include role + company name. Mark up with Review schema.

### 31. Submit to Chilean directories
**Category:** Local SEO / Citations
**Impact:** Citation building + entity corroboration
**Effort:** 2-3 hours
**Fix:** Submit to ACHAP, Sortlist.com, Agencias.cl, CORFO supplier registry, ProChile exporter directory.

### 32. Add width/height to 6 video card images
**Category:** Performance (CLS)
**Impact:** Minor CLS safety net
**Effort:** 15 minutes
**Fix:** The `.vc-img` portfolio images (polpaico, vida-camara, valores-castano, etc.) are missing `width` and `height` attributes.

### 33. Move GTM below charset/viewport meta tags
**Category:** Performance
**Impact:** Minor parser optimization
**Effort:** 5 minutes
**Fix:** GTM is currently the first element in `<head>`, before `<meta charset>`. Move it after the two critical meta tags.

---

## Implementation Roadmap

### Week 1 — Quick Wins (Items 1-5)
- Truncate title tags (template change)
- Remove SearchAction, fix AggregateRating (schema edits)
- Fix Content-Type header (server config)
- Edge-cache HTML (Cloudflare rule)
- **Expected score improvement: +5-8 points**

### Week 2 — High Priority (Items 6-15)
- Add Google Maps embed
- Preconnect hints + Behold height fix
- Sitemap consolidation
- Schema fixes (Service url, BlogPosting dateModified, VideoObject)
- Start review acquisition
- **Expected score improvement: +5-7 points**

### Weeks 3-4 — Content & Authority (Items 7-8, 16-25)
- Expand /casos/ and /servicios/ hub
- Add source citations to blog
- Create author page
- YouTube channel setup
- Clutch.co profile
- Begin client backlink outreach
- Implement two-track CTA
- **Expected score improvement: +8-12 points**

### Ongoing — Long-term (Items 26-33)
- Wikidata entity
- llms.txt optimization
- Portfolio expansion
- Directory submissions
- **Expected score improvement: +3-5 points**

### Projected Score After Full Implementation: 83-94/100
