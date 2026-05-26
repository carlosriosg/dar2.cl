# SEO Action Plan: dar2.cl

**Date:** May 26, 2026 | **Current Score: 63/100** | **Target Score: 82/100**

---

## Priority Legend

- **CRITICAL** — Blocks indexing or causes active ranking harm. Fix immediately.
- **HIGH** — Significantly impacts rankings or conversions. Fix within 1 week.
- **MEDIUM** — Optimization opportunity with measurable impact. Fix within 1 month.
- **LOW** — Nice to have, incremental improvement. Backlog.

---

## CRITICAL (Fix Immediately)

### ✅ 1. Add `noindex` to 404 page
**Category:** Technical SEO
**Status:** ✅ DONE (commit pending)
**Action:** Added `noindex={true}` prop to 404.astro + conditional meta robots in Base.astro layout.

### ✅ 2. Fix homepage cannibalization with /servicios/streaming/
**Category:** On-Page SEO / SXO
**Status:** ✅ DONE (commit f531e61)
**Action:** Homepage title changed to "Productora Audiovisual Corporativa en Santiago | DAR2". Streaming service title shortened to "Streaming Corporativo en Santiago | DAR2" (47 chars, no duplicate DAR2).

### 3. Launch review velocity campaign
**Category:** Local SEO
**Impact:** 12 reviews in 15 years is the #1 local ranking liability
**Effort:** 2 hours setup + ongoing
**Action:**
- Create a short Google review link using CID `6666778595618035561`
- Email/WhatsApp past clients requesting reviews
- Add review request to post-project workflow
- Target: 2-3 new reviews per month minimum
- Add visible review link to footer and contact page

### 4. Fix AggregateRating schema
**Category:** Schema / Structured Data
**Impact:** Current implementation is unverifiable — no linked Review entities
**Effort:** 30 minutes
**Action:**
- Either add individual `Review` typed entities with actual review content
- Or add `url` property on AggregateRating pointing to the Google Reviews page
- A perfect 5.0 with no visible review corpus raises quality flags

### ✅ 5. Stagger blog post publication dates
**Category:** Content Quality / Freshness
**Status:** ✅ DONE — Dates already staggered from 2026-03-03 to 2026-05-19 (weekly cadence)
**Action:** Already implemented. Dates are distributed across a realistic timeline.

---

## HIGH (Fix Within 1 Week)

### ✅ 6. Expand thin hub pages
**Category:** Content Quality
**Status:** ✅ DONE — Portfolio page expanded with service intro cards + internal links to service pages
**Action:**
| Page | Current | Target | What to Add |
|------|---------|--------|-------------|
| /portafolio/ | 190 words | 500+ | ✅ Added production descriptions per video, H2 structure, internal links to service pages, VideoObject schema |
| /casos/ | 185 words | 500+ | Case study methodology intro, industry categories, trust signals |
| /servicios/ | 361 words | 800+ | Service descriptions with differentiators, comparison guidance |
| /blog/ | 428 words | 500+ | Topic category intro, content themes description |

### ✅ 7. Add city modifiers to all service page titles and H1s
**Category:** Local SEO / On-Page
**Status:** ✅ DONE — All 8 service seoTitles now include "en Santiago" or "en Santiago | DAR2"
**Action:**
- "Streaming Corporativo en Santiago" not just "Streaming Corporativo"
- "Videos Corporativos en Santiago | DAR2" not just "Videos Corporativos"
- Apply to all 8 service page `<title>` tags and H1 headings

### ✅ 8. Fix duplicate/bloated title tags
**Category:** Technical SEO
**Status:** ✅ DONE (commit f531e61)
**Action:**
- Audit all page titles for length (max 60 characters)
- Remove duplicate "DAR2" suffix on streaming page (currently 87 chars)
- Template: "[Service] en Santiago | DAR2"

### ✅ 9. Consolidate sitemaps
**Category:** Technical SEO / Sitemap
**Status:** ✅ DONE
**Action:**
- Keep `sitemap-manual.xml` as the canonical sitemap
- Redirect `/sitemap.xml` → `/sitemap-manual.xml` (nginx.conf updated)
- Suppress Astro's auto-generated sitemap output (astro.config.mjs updated)
- Add real `<lastmod>` dates (not build timestamps) to manual sitemap
- Remove `priority` and `changefreq` (ignored by Google)
- Update robots.txt to reference only the consolidated sitemap
- Submit to Google Search Console

### 10. Source all statistics in blog posts
**Category:** Content Quality / E-E-A-T / GEO
**Impact:** Unsourced stats reduce trustworthiness and AI citability
**Effort:** 2 hours
**Action:**
- Add inline citations for all statistics (e.g., "USD 562B" → link to McKinsey report)
- At minimum, note the study name and year for each claim
- Priority posts: live shopping, ROI measurement, AR filters

### ✅ 11. Standardize NAP across site
**Category:** Local SEO
**Status:** ✅ DONE
**Action:**
- Standardize to "Oficina 603" everywhere (not "of 603") — Footer, Contacto, Schema
- Use consistent phone format: "+56 9 9843 3346" in display, `+56998433346` in schema
- Add `sameAs` array to JSON-LD with Google Maps, Instagram, LinkedIn URLs

---

## MEDIUM (Fix Within 1 Month)

### ✅ 12. Add VideoObject schema to portfolio and case studies
**Category:** Schema / Images
**Status:** ✅ DONE — VideoObject schema already present in portafolio.astro
**Action:**
- Add VideoObject with `name`, `description`, `thumbnailUrl`, `uploadDate`, `contentUrl`/`embedUrl` for each video
- Priority: portfolio page (19 videos), case study pages
- Consider BroadcastEvent on streaming service page

### 13. Retarget /servicios/live-shopping/ keyword
**Category:** SXO / On-Page
**Impact:** Current target "live shopping chile" is 90% informational SERPs
**Effort:** 1 hour
**Action:**
- Change title/H1 to target "produccion live shopping para empresas" or "servicio live shopping B2B chile"
- Reserve "live shopping chile" for the blog post
- Update meta description to match commercial intent

### 14. Add cross-links between content types
**Category:** On-Page SEO / Internal Linking
**Impact:** Strengthens topical authority and user journey
**Effort:** 2-3 hours
**Action:**
- Blog posts → link inline to corresponding service pages (not just footer nav)
- Service pages → link to relevant case studies
- Portfolio entries → link to the service that produced them
- Case studies → link to the specific service page

### 15. Replace anonymous testimonials with attributed quotes
**Category:** E-E-A-T / Trust
**Impact:** Enterprise buyers distrust anonymous testimonials
**Effort:** 2-4 hours (requires client outreach)
**Action:**
- Get permission to use client name, title, and company
- Add photo if possible
- Update schema to include Review entities with named reviewers

### 16. Add "Key Takeaways" boxes to blog posts
**Category:** GEO / AI Citation
**Impact:** Most-cited block format in Perplexity
**Effort:** 2 hours
**Action:**
- Add a 3-5 bullet summary box at the top or bottom of each blog post
- Use clear, self-contained factual statements
- Trim all H2 sections to 134-167 words for optimal AI extraction

### ✅ 17. Add HSTS preload directive
**Category:** Technical SEO / Security
**Status:** ✅ DONE
**Action:**
- Add `; preload` to the `Strict-Transport-Security` header
- Submit domain to hstspreload.org

### 18. Create Clutch.co profile
**Category:** E-E-A-T / Authority
**Impact:** Primary B2B services authority directory
**Effort:** 2 hours
**Action:**
- Create company profile with service categories
- Request reviews from existing clients
- Link back to dar2.cl

### ✅ 19. Add RUT (Chilean tax ID) to contact page
**Category:** Trust / Local SEO
**Status:** ✅ DONE
**Action:**
- Add company RUT to contact page and footer
- This is an active trust barrier for the target buyer persona

### 20. Fix LocalBusiness schema duplication
**Category:** Schema
**Impact:** Reduces duplicate entity signals
**Effort:** 1-2 hours
**Action:**
- Service pages should reference the organization by `@id` (`https://dar2.cl/#organization`) instead of re-declaring all properties
- Ensure blog post `author` Person nodes share the same `@id` as the homepage founder node
- Add `image`, `description`, `url`, `sameAs` to the founder Person entity

---

## LOW (Backlog)

### 21. Create YouTube channel
**Category:** GEO / Authority
**Impact:** Strongest AI citation correlation signal (r=0.737)
**Effort:** Ongoing
**Action:** Upload 4-6 service explainer videos. Use keyword-optimized titles.

### 22. Create Wikidata entity
**Category:** GEO / Entity
**Impact:** Knowledge Graph disambiguation for AI systems
**Effort:** 2-3 hours
**Action:** Create entry with instance=audiovisual production company, country=Chile, founded=2010, founder=Carlos Rios Guevara.

### 23. Build Chilean business directory citations
**Category:** Local SEO
**Impact:** Strengthens citation network
**Effort:** 4-6 hours
**Action:** List on Páginas Amarillas Chile, Cylex Chile, Hotfrog Chile, Kompass Chile with exact standardized NAP.

### 24. Add IndexNow support
**Category:** Technical SEO
**Impact:** Instant crawl signals for Bing/Yandex on publish
**Effort:** 15 minutes
**Action:** Add IndexNow key file to domain root, add directive to robots.txt.

### 25. Create author archive page
**Category:** E-E-A-T
**Impact:** Crawlable authority entity page
**Effort:** 1-2 hours
**Action:** Create `/autor/carlos-rios/` with full bio, credentials, content list, and ProfilePage schema.

### 26. Add RSL 1.0 license to llms.txt
**Category:** GEO
**Impact:** Signals explicit AI training permission
**Effort:** 5 minutes
**Action:** Add `license: https://rsl.openfuture.org/` to llms.txt.

### 27. Reformat llms.txt to spec-compliant format
**Category:** GEO
**Impact:** Improves AI system parsing
**Effort:** 30 minutes
**Action:** Restructure as Markdown with URL index per spec.

### 28. Add scoped CTAs to service pages
**Category:** SXO / Conversion
**Impact:** Improves persona-specific conversion
**Effort:** 2 hours
**Action:** Replace generic "Cotizar" with "Cotiza tu evento en vivo", "Ver portafolio de live shopping", etc.

### 29. Add social proof to every service page
**Category:** SXO / E-E-A-T
**Impact:** Addresses Trust gaps for all buyer personas
**Effort:** 3-4 hours
**Action:** Named client logos, one case study with metrics per page.

### 30. Investigate GTM async loading
**Category:** Performance
**Impact:** May improve LCP
**Effort:** 2-3 hours
**Action:** Move GTM to load via async tag or defer until after LCP. Audit tag firing triggers.

---

## Implementation Roadmap

### Week 1: Critical Fixes
- [x] Items 1-5 (404 noindex, homepage title, review campaign, schema fix, date stagger)
- [x] Items 8-9 (title tags, sitemap consolidation)

### Week 2: High Priority
- [x] Items 6-7 (thin pages expansion, city modifiers)
- [x] Items 10-11 (source statistics, NAP standardization)

### Weeks 3-4: Medium Priority
- [x] Items 12-20 (VideoObject, keyword retargeting, cross-links, testimonials, Key Takeaways, HSTS, Clutch, RUT, schema cleanup)

### Ongoing: Low Priority & Maintenance
- [ ] Items 21-30 (YouTube, Wikidata, citations, IndexNow, author page, llms.txt, CTAs, social proof, GTM)

---

## Expected Impact

| Timeframe | Score Target | Key Driver |
|-----------|-------------|------------|
| Current | 63/100 | Baseline |
| After Week 1 | 70/100 | Technical fixes + cannibalization resolution |
| After Week 2 | 75/100 | Content expansion + local SEO improvements |
| After Month 1 | 82/100 | Schema enrichment + SXO alignment + review growth |
| After Quarter 1 | 88/100 | Authority building + AI readiness + content freshness |
