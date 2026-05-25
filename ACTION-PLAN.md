# SEO Action Plan: dar2.cl

**Site:** https://dar2.cl/
**Date:** May 25, 2026
**Current Score:** 78/100
**Target Score:** 88/100

---

## Priority Definitions

- **CRITICAL** — Blocks indexing or directly harms rankings. Fix immediately.
- **HIGH** — Significantly impacts rankings or AI visibility. Fix within 1-2 weeks.
- **MEDIUM** — Optimization opportunity with measurable impact. Fix within 1 month.
- **LOW** — Nice to have, incremental improvement. Backlog.

---

## CRITICAL Priority

### 1. Add canonical tags to all pages
**Category:** Technical SEO
**Effort:** 30 minutes
**Impact:** Prevents duplicate content issues and consolidates ranking signals

Multiple pages lack explicit `<link rel="canonical">` tags, including /servicios/, /contacto/, /nosotros/, /portafolio/, and individual service pages. In Astro.js, add a canonical link in the `<head>` layout component:

```html
<link rel="canonical" href={Astro.url.href} />
```

### 2. Fix sitemap lastmod timestamps
**Category:** Technical SEO
**Effort:** 1-2 hours
**Impact:** Enables crawlers to prioritize fresh content

All 25 URLs share identical lastmod (build artifact from Astro). Configure Astro's sitemap integration to use actual content modification dates instead of build time. Also add `changefreq` and `priority` attributes.

### 3. Launch Google review acquisition campaign
**Category:** Local SEO
**Effort:** 2 hours setup + ongoing
**Impact:** 12 reviews in 15 years is critically low. Directly affects local pack rankings and AI trust signals.

Actions:
- Implement post-project review request email sequence (send 48h after delivery)
- Add WhatsApp review request to project close workflow
- Contact top 10 existing clients for reviews
- Target: 1 review every 2 weeks minimum
- Goal: 40+ reviews within 90 days

### 4. Add hyperlinked source citations to all blog statistics
**Category:** Content Quality / GEO
**Effort:** 2-3 hours per post (~16 hours total)
**Impact:** Transforms unverifiable claims into citable facts for AI systems

Fix these specific unsourced claims:
- "95% de hogares chilenos compraron online en 2024" → link to CCS report
- "USD 562 billion China live shopping 2023" → link to McKinsey/Statista
- "Conversión 5-10x mayor que e-commerce" → link to Bambuser/McKinsey
- "70% of companies don't measure video ROI" → link to Wyzowl/HubSpot or remove
- Audit all 8 posts for every statistic and add `[Source, Year](URL)` format

---

## HIGH Priority

### 5. Link or create YouTube channel across all entity touchpoints
**Category:** GEO / AI Visibility
**Effort:** 2-4 hours (if channel exists) / 2-4 weeks (if creating)
**Impact:** YouTube-AI citation correlation is 0.737 — the strongest single signal

Actions:
- If YouTube channel exists: add URL to JSON-LD sameAs, llms.txt, footer social links
- If no channel: create one, upload 5-10 portfolio pieces with VideoObject schema
- Add `VideoObject` schema to each portfolio/case study page that embeds a video

### 6. Create Clutch.co profile with verified client reviews
**Category:** Local SEO / Authority
**Effort:** 4-6 hours setup
**Impact:** #1 B2B services citation platform globally. 3 of top 5 AI visibility factors are citation-related.

With 30+ named corporate clients across healthcare, energy, retail, and banking, 3-5 Clutch reviews with verified project descriptions would significantly elevate both citation authority and conversion credibility.

### 7. Convert blog H2/H3 headings to question format
**Category:** On-Page SEO / GEO
**Effort:** 1-2 hours total
**Impact:** AI Overviews extract answers to questions. Question-format headings create direct query-answer pairs.

Examples:
- "Cómo funciona una sesión de live shopping" → "¿Cómo funciona una sesión de live shopping en Chile?"
- "Por qué está creciendo en Chile" → "¿Por qué está creciendo el live shopping en Chile en 2026?"
- "Multicámara y switcher: por qué importa" → "¿Por qué necesitas multicámara y switcher profesional?"
- Each H3 question should be followed by a self-contained 134-167 word answer paragraph

### 8. Implement HowTo schema on procedural blog posts
**Category:** Schema / GEO
**Effort:** 3-5 hours
**Impact:** HowTo schema is a reliable Google AI Overview trigger for procedural queries

Target posts:
- "Producción de video corporativo paso a paso: desde el brief hasta la entrega"
- "Cómo transmitir tu junta anual de accionistas sin caídas técnicas"
- "Cómo producir contenido para LinkedIn con tus ejecutivos como talento"

### 9. Add VideoObject schema to individual case study / portfolio pages
**Category:** Schema
**Effort:** 2-3 hours
**Impact:** Enables video rich results in Google Search and Images

Each case study and portfolio page embedding a YouTube video should have:
```json
{
  "@type": "VideoObject",
  "name": "Project name",
  "description": "Project description",
  "thumbnailUrl": "thumbnail URL",
  "uploadDate": "YYYY-MM-DD",
  "duration": "PT5M30S",
  "embedUrl": "YouTube embed URL"
}
```

### 10. Add pricing context to service pages
**Category:** SXO
**Effort:** 2-3 hours
**Impact:** Competitors (FeriaPixel) have dedicated pricing pages. Google rewards pricing transparency.

Don't need a rate card. Add a "Precios y Presupuestos" FAQ entry on each service page:
- "¿Cuánto cuesta un streaming corporativo?" → "Depende de X, Y, Z. Proyectos típicos parten desde..."
- "¿De qué depende el precio?" → "Las variables principales son..."
- "¿Cómo solicito un presupuesto?" → "Completa el formulario..."

---

## MEDIUM Priority

### 11. Add geographic modifiers to missing title tags
**Category:** On-Page SEO / Local
**Effort:** 30 minutes
**Impact:** Local ranking signal for geo-modified queries

| Page | Current | Recommended |
|------|---------|-------------|
| /servicios/estudio-virtual/ | "Estudio virtual con green screen y escenografías 3D \| DAR2" | "Estudio virtual con green screen en Santiago \| DAR2" |
| /servicios/ | "Servicios audiovisuales: streaming, live shopping y más \| DAR2" | "Servicios audiovisuales en Santiago \| DAR2" |
| /blog/ | "Blog — Guías de producción audiovisual y live shopping \| DAR2" | "Blog — Guías de producción audiovisual en Chile \| DAR2" |
| /nosotros/ | "Equipo DAR2 — 15 años produciendo audiovisual" | "Equipo DAR2 — 15 años de producción audiovisual en Santiago" |
| /contacto/ | "Contacto — Cotiza tu proyecto audiovisual en 48h \| DAR2" | "Contacto — Cotiza producción audiovisual en Santiago \| DAR2" |

### 12. Individualize meta descriptions per page
**Category:** On-Page SEO
**Effort:** 1-2 hours
**Impact:** Unique meta descriptions improve CTR from search results

Write unique 150-160 character meta descriptions for each service page including: service name, differentiator, and geo modifier.

### 13. Add Person sameAs and GBP URL to schema
**Category:** Schema / Local / GEO
**Effort:** 20 minutes
**Impact:** Connects on-page entities to external verified profiles

Actions:
- Add to Person schema for Carlos Rios Guevara:
  ```json
  "sameAs": ["https://www.linkedin.com/in/carlos-rios-guevara-9a1b5a2b/"]
  ```
- Add to Organization sameAs array:
  ```json
  "https://maps.google.com/?cid=6666778595618035561"
  ```

### 14. Standardize NAP formatting site-wide
**Category:** Local SEO
**Effort:** 30 minutes
**Impact:** Consistent NAP improves citation matching algorithms

Adopt single canonical format:
- Address: `Av. Holanda 099, of. 603, Providencia, Santiago, Chile`
- Phone: `+56 9 9843 3346`

Standardize across: homepage footer, contact page, about page, JSON-LD schema, all future directory listings.

### 15. Create dedicated Santiago location page
**Category:** Local SEO
**Effort:** 4-6 hours
**Impact:** Captures high-intent local searches like "productora audiovisual Santiago"

Create `/produccion-audiovisual-santiago/` with:
- 600+ word unique description of the Providencia studio
- Embedded Google Maps
- Address and phone in visible HTML
- Selection of Santiago-based case studies
- LocalBusiness schema markup
- CTA to contact/cotizar

### 16. Add OAI-SearchBot to robots.txt
**Category:** GEO
**Effort:** 5 minutes
**Impact:** Ensures ChatGPT's real-time web search crawler has explicit access

Add to robots.txt:
```
User-agent: OAI-SearchBot
Allow: /
```

### 17. Add 301 redirect from /.well-known/llms.txt to /llms.txt
**Category:** GEO
**Effort:** 5 minutes
**Impact:** Some AI crawlers check the alternative path

### 18. Fix blog post date metadata error
**Category:** Content Quality
**Effort:** 15 minutes
**Impact:** A published date later than updated date is logically impossible and harms freshness credibility

The "junta anual" post shows published: May 19, updated: May 12. Fix dateModified to equal or follow datePublished. Audit all 8 posts for similar inconsistencies.

### 19. Submit NAP to key Chilean directories
**Category:** Local SEO
**Effort:** 2-3 hours
**Impact:** Tier 1 citation sources for the Chilean market

Register on:
- Páginas Amarillas Chile (amarillas.cl)
- Apple Maps (Apple Business Connect)
- Waze
- Foursquare/Factual
- Ensure category matches GBP primary category

### 20. Add inter-blog cross-linking
**Category:** On-Page SEO
**Effort:** 1 hour
**Impact:** Distributes link equity and creates topical clusters

Add "Artículos relacionados" section at bottom of each blog post linking to 2-3 related posts. Group by topic clusters:
- Streaming cluster: junta anual, circuito cerrado vs streaming
- Video cluster: video corporativo paso a paso, ROI video corporativo
- Digital/social cluster: LinkedIn ejecutivos, redes sociales, filtros AR
- Innovation cluster: live shopping, estudio virtual vs set físico

---

## LOW Priority

### 21. Add alt text to team member photos
**Category:** Images
**Effort:** 15 minutes
**Impact:** Accessibility and image SEO

Add descriptive alt text to all 8 team photos on /nosotros/:
- "Carlos Rios Guevara — Director de DAR2 Servicios Audiovisuales"
- "Víctor Arriagada — Publicista y Locutor en DAR2"
- etc.

### 22. Implement weekly GBP post cadence
**Category:** Local SEO
**Effort:** 30 min/week (repurpose existing blog content)
**Impact:** GBP posts are a direct engagement signal

### 23. Add ContactPage schema to /contacto/
**Category:** Schema
**Effort:** 15 minutes

### 24. Add SearchAction to WebSite schema
**Category:** Schema
**Effort:** 15 minutes

### 25. Create llms-full.txt companion file
**Category:** GEO
**Effort:** 2-3 hours
**Impact:** Allows AI systems to index full content without HTTP round-trips

### 26. Verify GBP primary category
**Category:** Local SEO
**Effort:** 10 minutes (requires GBP dashboard access)
**Impact:** #1 local ranking factor (Whitespark 2026, score: 193)

Confirm primary category is the most specific available option: "Empresa de producción de vídeos" or equivalent.

### 27. Add Vimeo/Behance profile to sameAs
**Category:** Schema / Authority
**Effort:** 1-2 hours if profiles exist

### 28. Reduce geo coordinate precision in schema
**Category:** Schema (cosmetic)
**Effort:** 5 minutes
**Impact:** From 15 decimal places to recommended 5

---

## Implementation Roadmap

### Week 1 (CRITICAL)
- [ ] Add canonical tags to all pages (#1)
- [ ] Fix sitemap lastmod timestamps (#2)
- [ ] Set up review acquisition campaign (#3)
- [ ] Add OAI-SearchBot to robots.txt (#16)
- [ ] Fix date metadata error (#18)
- [ ] Standardize NAP formatting (#14)
- [ ] Add Person sameAs and GBP URL to schema (#13)

### Week 2 (HIGH)
- [ ] Link/create YouTube channel (#5)
- [ ] Convert blog headings to question format (#7)
- [ ] Add geographic modifiers to title tags (#11)
- [ ] Individualize meta descriptions (#12)
- [ ] Add inter-blog cross-linking (#20)
- [ ] Add alt text to team photos (#21)

### Week 3-4 (HIGH)
- [ ] Begin adding source citations to blog posts (#4) — 2 posts per week
- [ ] Implement HowTo schema on 3 posts (#8)
- [ ] Add VideoObject schema to case studies (#9)
- [ ] Add pricing FAQ to service pages (#10)
- [ ] Create Clutch.co profile (#6)

### Month 2 (MEDIUM)
- [ ] Complete source citations on remaining posts (#4)
- [ ] Create Santiago location page (#15)
- [ ] Submit NAP to directories (#19)
- [ ] Add /.well-known/llms.txt redirect (#17)
- [ ] Create llms-full.txt (#25)
- [ ] Implement GBP weekly posts (#22)
- [ ] Add ContactPage schema (#23)

### Ongoing
- [ ] Maintain review velocity (1+ review per 2 weeks)
- [ ] Publish 2-4 new blog posts per month
- [ ] Monitor sitemap lastmod freshness
- [ ] Track keyword rankings for 5 target queries

---

## Expected Impact

| Metric | Current | 30 Days | 90 Days |
|--------|---------|---------|---------|
| SEO Health Score | 78/100 | 84/100 | 88/100 |
| Local SEO Score | 67/100 | 75/100 | 82/100 |
| GEO Score | 71/100 | 78/100 | 85/100 |
| SXO Score | 54/100 | 62/100 | 72/100 |
| Google Reviews | 12 | 16 | 30+ |
| FAQ Rich Results | Eligible | Active | Active |
| Video Rich Results | Partial | Full | Full |

---

*Action plan generated by Claude Code SEO Audit — May 25, 2026*
