# dar2.cl — DAR2 Servicios Audiovisuales

**Productora audiovisual B2B en Santiago de Chile.** Especialistas en streaming corporativo, live shopping, videos corporativos, video podcast, estudio virtual, multicámara para eventos, estrategias digitales, contenido para redes y filtros AR. 15+ años con clientes IPSA (Cencosud, ENAP, MetLife, Codelco, Banco de Chile, Clínica Santa María y más).

Sitio en producción: **https://dar2.cl/**

> 📘 **Documento de traspaso (handover):** [`CLAUDE.md`](./CLAUDE.md) es la guía definitiva de arquitectura, comandos, convenciones y estado del proyecto. Si algo en este README parece desactualizado, confía en el handover.

## Stack

- **Framework:** [Astro](https://astro.build/) v6 (SSG — salida 100 % estática, cero JS de framework en cliente)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/) v4 (vía `@tailwindcss/vite`, config en CSS)
- **Tipografía:** Inter variable self-hosted (`@fontsource-variable/inter`, con preload de woff2)
- **Imágenes:** `sharp` (pipeline build-time) → AVIF + WebP + fallback, con `<picture>` responsive
- **Sitemap:** `@astrojs/sitemap` (automático, siempre sincronizado)
- **Analytics:** Ahrefs Analytics (script directo; GTM fue eliminado)
- **Instagram:** Behold.so (feed auto-actualizable, carga diferida)
- **Leads:** Web3Forms API + WhatsApp
- **Infra:** `Cliente → Cloudflare (CDN/TLS) → Traefik (Coolify) → nginx → estáticos`

## Comandos

| Comando | Acción |
| :--- | :--- |
| `npm install` | Instala dependencias |
| `npm run dev` | Dev server en `http://localhost:4321` (HMR) |
| `npm run build` | Compila a `./dist/` (49 páginas a la fecha) |
| `npm run preview` | Sirve `./dist/` localmente |
| `npm run astro -- <cmd>` | CLI de Astro (ej. `astro check`) |

### Procesamiento de imágenes (build-time, `sharp`)

Pipeline típico: **resize → optimize → cards → responsive**.

| Comando | Acción |
| :--- | :--- |
| `npm run resize:images` | Reduce imágenes > 1200px |
| `npm run optimize:images` | Genera WebP + AVIF y cuantiza fallback PNG |
| `npm run generate:cards` | Variantes `-card` (730px) y `-card-sm` (365px) |
| `npm run generate:responsive` | Variantes hero `-480`/`-800`/`-1200` |
| `npm run generate:hashes` | Regenera `image-hashes.json` (cache busting) |
| `npm run generate:favicons` / `generate:ico` / `generate:og` | Favicons, `.ico` e imagen OG |

### Validación y mantenimiento

| Comando | Acción |
| :--- | :--- |
| `npm run validate:schema` | Valida el markup Schema.org JSON-LD |
| `npm run check:redirects` | Verifica reglas de redirect (nginx) |
| `npm run ping:sitemap` / `indexnow:post` | Notifica sitemap vía IndexNow |

> No hay tests ni linter configurados. La validación estándar antes de commit es **`npm run build`** sin errores.

## Deploy

No hay comando de deploy manual. **`git push origin main`** → Coolify reconstruye la imagen Docker (multi-stage: `node:22-alpine` build → `nginx:alpine` sirve `dist/`) y redeploya. Cloudflare delante como CDN (Brotli, cache, Bot Fight Mode). Cambios en [`nginx.conf`](./nginx.conf) también requieren push para tomar efecto.

## Estructura

```
/
├── public/
│   ├── images/{clientes,portafolio,servicios,galeria,blog,nosotros,casos,podcast}/
│   ├── videos/
│   ├── llms.txt + llms-full.txt     # índice para crawlers de IA (MANUAL, ver nota)
│   ├── robots.txt                   # permite todos los bots + AI crawlers
│   └── .well-known/security.txt
│   # sitemap-index.xml + sitemap-0.xml se generan en build (@astrojs/sitemap)
├── src/
│   ├── components/                  # Nav, Footer, Picture, VideoCard, Reveal,
│   │                                # TTSPlayer, CasosDestacados, BlogRelacionados,
│   │                                # EnlacesInternos, ScrollToTop
│   ├── content/portafolio/          # content collection (Zod en content.config.js)
│   ├── data/                        # FUENTE DE VERDAD: servicios.js (9), casos.js (10),
│   │                                # blog.js (20), enlaces-internos.js
│   ├── layouts/Base.astro           # layout único: <head> SEO, schema Org/WebSite
│   ├── pages/                       # index, contacto, nosotros, portafolio,
│   │                                # productora-audiovisual, privacidad, 404,
│   │                                # servicios/, casos/, blog/
│   └── styles/global.css
├── scripts/*.mjs                    # imágenes, favicons, OG, IndexNow, validación
├── astro.config.mjs                 # site, trailingSlash, sitemap, inlineStylesheets
├── nginx.conf                       # reglas SEO (301/410/cache/security)
├── Dockerfile                       # multi-stage build
└── *.md                             # README + documentos SEO de referencia
```

## SEO

El on-page, schema (LocalBusiness + Service + FAQPage + Article + BreadcrumbList + VideoObject + ItemList), performance (CSS inline, AVIF/WebP, fonts preload, `fetchpriority="high"` en heroes) y técnico (canonicals, redirects 301/410, sitemap automático, `robots.txt`, `llms.txt`) están implementados y validados. Documentos de referencia en el repo:

- [`FULL-AUDIT-REPORT.md`](./FULL-AUDIT-REPORT.md) / [`ACTION-PLAN.md`](./ACTION-PLAN.md)
- [`KEYWORDS-Y-POSICIONAMIENTO.md`](./KEYWORDS-Y-POSICIONAMIENTO.md)
- [`BACKLINKS-DIRECTORIOS.md`](./BACKLINKS-DIRECTORIOS.md)
- [`GEO-CITACION-IA.md`](./GEO-CITACION-IA.md)
- [`ESTRATEGIA-CONTENIDO-SEO.md`](./ESTRATEGIA-CONTENIDO-SEO.md)

## Nota: mantener `llms.txt` sincronizado

`public/llms.txt` y `public/llms-full.txt` son **manuales** (no se generan en build). Cada vez que cambie contenido visible del sitio (casos, blog, servicios, home), actualizarlos y refrescar el campo `Last updated`. Si no, las IAs (AI Overviews, ChatGPT, Perplexity) siguen citando contenido viejo.

## Contacto

- **Web:** https://dar2.cl/
- **Email:** dar2@dar2.cl
- **WhatsApp:** +56 9 9843 3346
- **Dirección:** Av. Holanda 099, Oficina 603, Providencia, Santiago, Chile
