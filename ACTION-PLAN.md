# SEO Action Plan: dar2.cl

**Overall SEO Health Score: 71 / 100**
**Audit Date:** May 25, 2026
**Potential Score After Fixes:** ~85-88 / 100

---

## Critical Priority (Fix Immediately)

### 1. Add canonical URLs to ALL pages
**Impact:** Technical SEO +8 points | **Effort:** 1 hour
**Category:** Technical SEO

Every page on the site is missing `<link rel="canonical" href="...">`. This is the single most impactful technical fix available.

**Action:** In your Astro layout component, add to the `<head>`:
```html
<link rel="canonical" href={Astro.url.href} />
```

**Pages affected:** All 28 pages

---

### 2. Write unique meta descriptions for 5 pages
**Impact:** On-Page SEO +4 points | **Effort:** 2 hours
**Category:** On-Page SEO

| Page | Suggested Meta Description |
|------|---------------------------|
| /servicios/ | "Streaming, live shopping, videos corporativos, estudio virtual y 4 servicios audiovisuales más. Todo bajo un solo proveedor en Santiago." |
| /portafolio/ | "19 proyectos audiovisuales para empresas como Codelco, Clínica Santa María y PC Factory. Videos corporativos, streaming y live shopping." |
| /casos/ | "Casos de éxito: producción audiovisual para CASTAÑO y Clínica Santa María. Resultados reales de proyectos DAR2." |
| /contacto/ | "Cotiza tu proyecto audiovisual en 48 horas. WhatsApp, email o visítanos en Providencia, Santiago. DAR2 Servicios Audiovisuales." |
| /privacidad/ | "Política de privacidad de DAR2 Servicios Audiovisuales. Cómo protegemos tus datos personales." |

---

### 3. Fix /sitemap.xml 404
**Impact:** Technical SEO +2 points | **Effort:** 30 minutes
**Category:** Technical SEO

Search engines commonly check `/sitemap.xml` first. Either:
- Add a redirect from `/sitemap.xml` → `/sitemap-index.xml`
- Or generate a `/sitemap.xml` that matches the sitemap index

---

## High Priority (Fix Within 1 Week)

### 4. Add aggregateRating to LocalBusiness schema
**Impact:** Schema +3 points, CTR improvement | **Effort:** 30 minutes
**Category:** Schema

Add your Google 5.0 star rating to the LocalBusiness JSON-LD:
```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "5.0",
  "reviewCount": "XX",
  "bestRating": "5"
}
```

---

### 5. Add Person schema for Carlos Rios Guevara
**Impact:** E-E-A-T +2, AI Readiness +3 | **Effort:** 1 hour
**Category:** Schema / E-E-A-T

Create a Person entity with sameAs links to LinkedIn, UNIACC profile, and any other verifiable profiles. Add as `author` on all blog posts.

```json
{
  "@type": "Person",
  "name": "Carlos Rios Guevara",
  "jobTitle": "Director",
  "worksFor": { "@type": "Organization", "name": "DAR2 Servicios Audiovisuales" },
  "alumniOf": { "@type": "CollegeOrUniversity", "name": "UNIACC" },
  "sameAs": ["https://www.linkedin.com/in/...", "..."]
}
```

---

### 6. Add bylines and author bio to all blog posts
**Impact:** E-E-A-T +3 | **Effort:** 3 hours
**Category:** Content Quality

Each blog post should display:
- Author name with photo
- Title/role
- 1-2 sentence bio
- Link to About page or dedicated author page

---

### 7. Reposition trust signals above the fold
**Impact:** SXO +5, Conversion +10-15% | **Effort:** 2 hours
**Category:** SXO / Conversion

Move these to within the first two screen scrolls:
- Google 5.0 star rating badge
- "15 años de experiencia" as visible text (not just title tag)
- "30+ clientes" or 3-4 enterprise client logos
- "48h response" guarantee near hero CTA

---

### 8. Add inline source citations to blog statistics
**Impact:** AI Readiness +4 | **Effort:** 4-8 hours
**Category:** AI Search Readiness

Every statistic in blog posts needs a hyperlinked source:
- China USD 562B live shopping market → link to source report
- 95% Chilean online penetration → link to CCS data
- 70% of companies don't measure ROI → link to source
- 5-10x conversion lift → link to study

---

### 9. Expand case studies with quantified outcomes
**Impact:** Content +4, SXO +3 | **Effort:** 1-2 weeks (requires client collaboration)
**Category:** Content Quality

For each case study (CASTAÑO, Clínica Santa María), add:
- The client's stated problem/challenge
- Specific deliverables (formats, duration, channels)
- Measurable outcomes (views, engagement, internal adoption rate)
- Direct client quote
- Target: 800-1,200 words per case study

---

### 10. Pre-fill WhatsApp CTA with contextual message
**Impact:** Conversion +5-10% | **Effort:** 15 minutes
**Category:** SXO / Conversion

Change WhatsApp link from:
```
https://wa.me/56998433346?text=...
```
To:
```
https://wa.me/56998433346?text=Hola%20DAR2%2C%20me%20interesa%20cotizar%20un%20proyecto%20audiovisual.%20%C2%BFPodemos%20hablar%3F
```

---

## Medium Priority (Fix Within 1 Month)

### 11. Enhance llms.txt with full resource listing
**Impact:** AI Readiness +2 | **Effort:** 2 hours

Add to llms.txt:
- `# License` section with usage permissions
- `# Last Updated: 2026-05-25`
- `# Key Resources` with blog post and case study URLs
- `# People` section for Carlos Rios Guevara
- `# FAQ` with top 5 frequently asked questions

---

### 12. Expand Services Hub page from 800 to 1,400+ words
**Impact:** Content +2, On-Page +2 | **Effort:** 4 hours

Add 2-3 sentence descriptors per service, a "how to choose the right service" section, and a comparison table showing which service fits which need.

---

### 13. Add portfolio entry descriptions (150-200 words each)
**Impact:** Content +3 (thin content reduction) | **Effort:** 1 week

For each of the 19 portfolio entries, add:
- Client context (industry, size)
- Production challenge
- Deliverable type
- Technical approach
- Brief outcome

---

### 14. Create image sitemap
**Impact:** Images +3 | **Effort:** 2 hours

Add an image sitemap to sitemap-index.xml covering all portfolio images, service images, and blog hero images.

---

### 15. Add security.txt
**Impact:** Technical +1, Trust signal | **Effort:** 30 minutes

Create `/.well-known/security.txt` with contact email and preferred language.

---

### 16. Fix blog hero image alt text
**Impact:** Images +2, Accessibility | **Effort:** 1 hour

Ensure all blog post hero images have descriptive alt text, e.g.:
- "Sesión de live shopping en estudio con multicámara y pantalla de productos"

---

### 17. Add Review schema to homepage testimonials
**Impact:** Schema +2 | **Effort:** 1 hour

Wrap each testimonial in Review schema with author name, rating, and review body.

---

### 18. Embed showreel video on homepage with VideoObject schema
**Impact:** SXO +3, Schema +1, Content +2 | **Effort:** 1 week

Create a 60-90 second production reel and embed on homepage hero with full VideoObject schema including description, uploadDate, thumbnailUrl, and duration.

---

## Low Priority (Backlog)

### 19. Create industry vertical landing pages
**Impact:** Content strategy, new keyword targets | **Effort:** 2-4 weeks

Suggested pages:
- /industrias/mineria/ — "Producción audiovisual para minería en Chile"
- /industrias/salud/ — "Video corporativo para sector salud"
- /industrias/banca/ — "Producción audiovisual para banca y finanzas"

Leverage existing client relationships (Codelco, Clínica Santa María, Banco de Chile) as experiential foundation.

---

### 20. Create pricing transparency page or FAQ
**Impact:** Content gap closure, mid-funnel capture | **Effort:** 4 hours

A "Cómo cotizamos" page or "¿Cuánto cuesta?" FAQ section addressing pricing ranges and factors that affect cost.

---

### 21. Create YouTube channel with educational content
**Impact:** AI Readiness +8 (highest correlation: 0.737) | **Effort:** 6-10 weeks

Repurpose 8 blog posts as 5-8 minute explainer videos. Cross-link with VideoObject schema and transcripts.

---

### 22. Create Wikidata entity for DAR2
**Impact:** AI Readiness +3 (ChatGPT, Google Knowledge Panel) | **Effort:** 3-4 hours

Submit Wikidata entries for the company and Carlos Rios Guevara. Lower notability threshold than Wikipedia.

---

### 23. Add "Key Takeaways" blocks to blog posts
**Impact:** AI Readiness +2 | **Effort:** 4 hours

Add a 3-5 bullet point summary at the top or bottom of each blog post. These are high-value AI citation targets.

---

### 24. Create standalone author bio page
**Impact:** E-E-A-T +2 | **Effort:** 2 hours

Create `/equipo/carlos-rios-guevara/` with credentials, experience, client work, and sameAs links.

---

### 25. Develop 3-4 additional case studies
**Impact:** Content +3, SXO +2 | **Effort:** 4-6 weeks

Target industries: retail/live shopping, mining/energy, banking. Each with quantified outcomes.

---

## Impact Summary

| Priority | Items | Est. Score Gain | Total Effort |
|----------|-------|-----------------|--------------|
| Critical | 3 | +14 points | ~4 hours |
| High | 7 | +12 points | ~2 weeks |
| Medium | 7 | +8 points | ~2 weeks |
| Low | 7 | +10 points | ~3 months |

**Projected score after Critical + High fixes: ~83/100**
**Projected score after all fixes: ~88/100**

---

## Implementation Roadmap

### Week 1 (Critical)
- [ ] Add canonical URLs to all pages
- [ ] Write 5 missing meta descriptions
- [ ] Fix /sitemap.xml redirect
- [ ] Add aggregateRating schema
- [ ] Pre-fill WhatsApp CTA

### Week 2 (High)
- [ ] Add Person schema for Carlos Rios Guevara
- [ ] Add author bylines to blog posts
- [ ] Reposition trust signals above the fold
- [ ] Add source citations to blog statistics

### Weeks 3-4 (Medium)
- [ ] Expand services hub page
- [ ] Enhance llms.txt
- [ ] Create image sitemap
- [ ] Add security.txt
- [ ] Fix blog image alt text
- [ ] Add Review schema to testimonials

### Month 2-3 (Low + Content)
- [ ] Expand portfolio descriptions
- [ ] Expand case studies with metrics
- [ ] Create industry vertical pages
- [ ] Create pricing FAQ page
- [ ] Embed homepage showreel
- [ ] Add Key Takeaways to blog posts

### Ongoing (Long-term)
- [ ] Build YouTube channel
- [ ] Create Wikidata entity
- [ ] Develop additional case studies
- [ ] Seek industry press coverage
- [ ] Create author bio page

---

*Action Plan generated by Claude Code SEO Audit*
*Date: May 25, 2026*
