# dar2.cl — DAR2 Servicios Audiovisuales

**Productora audiovisual en Santiago de Chile.** Especialistas en streaming corporativo, live shopping, videos corporativos, estudio virtual, filtros AR, circuito cerrado, estrategias digitales y contenido para redes sociales.

## Stack

- **Framework:** [Astro](https://astro.build/) v6.1.8 (static site generation)
- **Hosting:** Cloudflare CDN
- **Analytics:** Google Tag Manager
- **Fonts:** Inter (self-hosted, variable)
- **Images:** WebP + AVIF via `<picture>` component
- **Instagram Feed:** Behold.so (auto-updates from @dar2.cl)
- **Lead Capture:** Web3Forms API

## Project Structure

```
/
├── public/
│   ├── images/
│   │   ├── clientes/       # Client logos (marquee on homepage)
│   │   ├── portafolio/     # Portfolio project images
│   │   └── servicios/      # Service card images
│   ├── videos/             # Background videos
│   ├── llms.txt            # AI crawler index
│   ├── robots.txt          # Crawler rules
│   └── sitemap-manual.xml  # Legacy sitemap (to be retired)
├── src/
│   ├── components/         # Astro components
│   │   ├── Base.astro      # Layout wrapper
│   │   ├── Picture.astro   # Responsive <picture> with AVIF/WebP
│   │   ├── VideoCard.astro # Portfolio video card
│   │   ├── Reveal.astro    # Scroll reveal animation
│   │   ├── TTSPlayer.astro # Text-to-Speech player for blog
│   │   └── ScrollToTop.astro
│   ├── content/            # Astro content collections (portafolio)
│   ├── data/
│   │   └── servicios.js    # Service definitions
│   ├── layouts/
│   │   └── Base.astro      # Main layout with SEO, schema, GTM
│   ├── pages/
│   │   ├── index.astro     # Homepage
│   │   ├── contacto.astro  # Contact page
│   │   ├── nosotros.astro  # About page
│   │   ├── portafolio.astro# Portfolio hub
│   │   ├── servicios/      # Service pages (8 services)
│   │   └── blog/           # Blog posts (8 articles)
│   └── styles/
├── scripts/                # Build-time image processing
├── astro.config.mjs
├── nginx.conf
├── Dockerfile
└── package.json
```

## Commands

| Command                   | Action                                      |
| :------------------------ | :------------------------------------------ |
| `npm install`             | Install dependencies                        |
| `npm run dev`             | Start dev server at `localhost:4321`        |
| `npm run build`           | Build production site to `./dist/`          |
| `npm run preview`         | Preview build locally                       |
| `npm run astro ...`       | Run Astro CLI commands                      |

## SEO Status

- **Overall SEO Health Score:** 62/100 (as of 2026-05-26)
- Full audit report: [FULL-AUDIT-REPORT.md](./FULL-AUDIT-REPORT.md)
- Action plan: [ACTION-PLAN.md](./ACTION-PLAN.md)

### Recent Improvements (commit f531e61)

- ✅ Title tags truncated to <60 chars on all pages
- ✅ Removed broken SearchAction schema
- ✅ Fixed NAP consistency ("of 603" → "Oficina 603")
- ✅ Added preconnect hints for GTM, Behold.so, Web3Forms
- ✅ Added min-height to Behold Instagram widget (CLS fix)
- ✅ Added dateModified to BlogPosting schema
- ✅ Consistent title tag format across all pages

## Contact

- **Web:** https://dar2.cl/
- **Email:** dar2@dar2.cl
- **WhatsApp:** +56 9 9843 3346
- **Address:** Av. Holanda 099, Oficina 603, Providencia, Santiago, Chile
