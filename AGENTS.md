# CLAUDE.md — Documento de Traspaso (Handover) · dar2.cl

> **Propósito:** este archivo es la guía definitiva para cualquier asistente de IA (Claude Code, OpenCode, etc.) que trabaje en este repositorio. Resume comandos, arquitectura, convenciones y el estado de migración del proyecto.
>
> **Proyecto:** sitio web de **DAR2 Servicios Audiovisuales** — productora audiovisual B2B en Santiago de Chile (streaming, live shopping, video corporativo, estudio virtual, etc.).
> **Sitio en producción:** https://dar2.cl/
> **Última actualización del handover:** 2026-06-10
> **Idioma del proyecto:** español de Chile (es-CL). Todo el contenido, comentarios y nombres de dominio están en español.

---

## 1. COMANDOS DE DESARROLLO

**Runtime requerido:** Node.js `>=22.12.0`. Gestor: `npm` (hay `package-lock.json`; el Docker usa `npm ci`).

### Comandos principales (Astro)

| Comando | Acción |
| :--- | :--- |
| `npm install` | Instala dependencias |
| `npm run dev` | Servidor de desarrollo en **http://localhost:4321** (con HMR) |
| `npm run build` | Compila el sitio estático a `./dist/` |
| `npm run preview` | Sirve localmente el `./dist/` ya compilado |
| `npm run astro -- <cmd>` | Ejecuta el CLI de Astro (ej. `npm run astro -- check`) |

### Scripts de procesamiento de imágenes (build-time, con `sharp`)

Se corren manualmente cuando se agregan imágenes nuevas. Pipeline típico: **resize → optimize → cards**.

| Comando | Acción |
| :--- | :--- |
| `npm run resize:images` | Reduce imágenes > 1200px a máx 1200px (in-place, vía archivo temporal) |
| `npm run optimize:images` | Genera variantes **WebP + AVIF** de los PNG/JPG |
| `npm run generate:cards` | Genera versiones `-card` (730px) y `-card-sm` (365px) para srcset |
| `npm run generate:favicons` | Regenera favicons (cuadrado naranja #FF4500 + cámara, vía SVG inline) |
| `npm run generate:og` | Genera la imagen Open Graph social |
| `npm run generate:ico` | Genera `favicon.ico` (con `png-to-ico`) |

### Testing, Linting y Formateo

> ⚠️ **NO hay framework de tests, ni ESLint, ni Prettier configurados.** No existen scripts `test`/`lint`/`format`.
> - La única validación de tipos es vía `tsconfig.json` (`astro/tsconfigs/strict`). Para chequear tipos: `npm run astro -- check`.
> - La "prueba" estándar antes de un commit es: **`npm run build`** debe completar sin errores (28 páginas generadas a la fecha).

### Despliegue (Deploy)

**No hay comando de deploy manual.** El despliegue es **automático por git push**:

1. El sitio se hostea en un **VPS con Coolify** (no Vercel/Netlify).
2. **`git push origin main`** dispara que Coolify reconstruya la imagen Docker y redespliegue.
3. El build se hace dentro del `Dockerfile` (multi-stage): `node:22-alpine` compila Astro → `nginx:alpine` sirve `dist/` con `nginx.conf`.
4. **Cloudflare** está delante como CDN (termina HTTPS, cachea, Bot Fight Mode).
5. Cambios en **`nginx.conf`** (reglas SEO) también requieren `git push` → redeploy de Coolify para tomar efecto (no necesitan `npm run build`).

> **Rama de producción:** `main`. Todo lo que entra a `main` se despliega. No hay staging.

---

## 2. ARQUITECTURA Y TECNOLOGÍAS

### Stack principal

- **Framework:** [Astro](https://astro.build/) `^6.1.8` en modo **SSG (static site generation)**. Output 100% estático, cero JS de framework en cliente.
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/) `^4.2.4` vía plugin `@tailwindcss/vite` (Tailwind v4, **sin `tailwind.config.js`** — se configura en CSS). Complementado con bloques `<style>` scoped por componente.
- **Tipografía:** `@fontsource-variable/inter` `^5.2.8` (Inter variable, self-hosted, con preload de woff2 normal + italic).
- **Imágenes:** `sharp` `^0.34.5` (devDep) para el pipeline de optimización. Servidas con `<picture>` (AVIF → WebP → fallback).
- **Favicon .ico:** `png-to-ico` `^3.0.1` (devDep).
- **Dependencia instalada pero NO usada:** `@astrojs/sitemap` `^3.7.2` está en `dependencies` pero **NO está en `astro.config.mjs`** (`integrations: []`). El sitemap se mantiene a mano (ver Deudas Técnicas).

### Infraestructura

`Cliente → Cloudflare (CDN/TLS) → Traefik (Coolify, termina TLS) → nginx (:80, HTTP) → archivos estáticos`

- **`Dockerfile`:** multi-stage. Stage 1 (`node:22-alpine`) hace `npm ci` + `npm run build`. Stage 2 (`nginx:alpine`) copia `dist/` a `/usr/share/nginx/html` y `nginx.conf` a `/etc/nginx/conf.d/default.conf`.
- **`nginx.conf`:** contiene la lógica SEO crítica. Reglas clave:
  - 301 `www.dar2.cl` → `dar2.cl` (apex).
  - `listen 80 default_server` (CRÍTICO: sin esto, las requests a `dar2.cl` caen en el server block de www y crean loop infinito).
  - 301 trailing-slash canónico (`/ruta` → `/ruta/`).
  - **410 Gone** para spam legacy de WordPress (`/wp-*`) y del hackeo de Bluehost (`*.html`, `/products/`).
  - 301 `/sitemap.xml` → `/sitemap-manual.xml`.
  - Cache headers (1 año immutable para assets `_astro/` e imágenes).
  - Security headers (HSTS, CSP, X-Frame-Options, etc.).

### Patrón de diseño

No es Clean Architecture ni MVC. Es el patrón idiomático de **Astro: content-driven + componentes**:

- **Datos centralizados en `src/data/servicios.js`:** un array de objetos JS, uno por servicio (8 servicios). Cada objeto define `slug`, `title`, `seoTitle`, `seoDescription`, `tagline` (HTML del H1), `heroEyebrow`, `description`, `longDescription[]`, `process[]`, `forWhom`, `bullets[]`, `benefits[]`, `cases[]`, `faqs[]`, etc. **Es la fuente de verdad de los servicios.**
- **Páginas de servicio generadas dinámicamente:** `src/pages/servicios/[slug].astro` usa `getStaticPaths()` sobre `servicios.js`. **Excepción:** `filtros-ar` está excluido del template dinámico y tiene su propia página `src/pages/servicios/filtros-ar.astro` (pero también lee de `servicios.js`).
- **Content Collections para el portafolio:** `src/content/portafolio/*.md` validados por Zod schema en `src/content.config.js` (campos: `titulo`, `cliente`, `sector`, `descripcion`, `anio`, `tipo` [enum], `youtube_url?`, `thumbnail?`, `destacado`).
- **JS de cliente = vanilla** dentro de bloques `<script>` en los `.astro` (no hay React/Vue/Svelte). Ejemplos: lightbox de video, slider de Instagram, validación del formulario, shuffle del portafolio.
- **Schema.org JSON-LD inline:** cada página inyecta su structured data como `<script type="application/ld+json">` (LocalBusiness, Service, FAQPage, Article/BlogPosting, BreadcrumbList, VideoObject, etc.).

### Estructura de carpetas (real, en `main`)

```
/
├── public/
│   ├── images/{clientes,portafolio,servicios,galeria,blog,nosotros}/  # AVIF+WebP+fallback
│   ├── videos/
│   ├── llms.txt                 # índice para crawlers de IA (+ /.well-known/llms.txt)
│   ├── robots.txt               # permite todos los bots + AI crawlers; apunta al sitemap
│   ├── sitemap-manual.xml       # SITEMAP ACTIVO, mantenido a mano (27 URLs)
│   └── .well-known/security.txt
├── src/
│   ├── components/              # 7 componentes Astro
│   │   ├── Nav.astro            # header sticky + menú mobile (aria-current)
│   │   ├── Footer.astro         # footer 4 columnas + Instagram + WhatsApp
│   │   ├── Picture.astro        # <picture> responsive AVIF/WebP/fallback (props: responsive, sizes)
│   │   ├── VideoCard.astro      # card de video YouTube del portafolio
│   │   ├── Reveal.astro         # animación scroll-reveal (prop: delay)
│   │   ├── TTSPlayer.astro      # reproductor Text-to-Speech para blog posts
│   │   └── ScrollToTop.astro
│   ├── content/portafolio/*.md  # 20 proyectos del portafolio (content collection)
│   ├── content.config.js        # Zod schema de la colección portafolio
│   ├── data/servicios.js        # FUENTE DE VERDAD de los 8 servicios
│   ├── layouts/Base.astro       # layout único: <head> SEO, schema Org/WebSite, GTM, fonts, slots
│   ├── pages/
│   │   ├── index.astro          # home (hero, servicios, portafolio, clientes, cifras, Instagram)
│   │   ├── contacto.astro       # formulario (Web3Forms + WhatsApp) + mapa
│   │   ├── nosotros.astro
│   │   ├── portafolio.astro
│   │   ├── privacidad.astro
│   │   ├── 404.astro            # única página con <meta robots noindex>
│   │   ├── servicios/{index,[slug],filtros-ar}.astro
│   │   ├── casos/{index, ...}.astro      # 2 casos de éxito detallados
│   │   └── blog/{index, ...}.astro       # 9 blog posts (índice + artículos)
│   └── styles/global.css
├── scripts/*.mjs                # 6 scripts de imágenes/favicons (sharp)
├── astro.config.mjs             # site=dar2.cl, inlineStylesheets:'always', integrations:[]
├── nginx.conf                   # reglas SEO (301/410/cache/security)
├── Dockerfile                   # multi-stage build
├── tsconfig.json                # extends astro/tsconfigs/strict
└── *.md                         # README + documentos SEO de referencia (ver sección 4)
```

---

## 3. GUÍA DE ESTILO DE CÓDIGO

Reglas detectadas en el código existente. **Respetarlas para mantener consistencia.**

### Idioma

- **Todo en español:** contenido visible, comentarios, slugs de URL (`/servicios/estudio-virtual/`), nombres de campos de datos (`titulo`, `cliente`, `tagline`), claves de objetos.
- Las **keywords del lenguaje** (JS/TS) son inglés obviamente (`const`, `function`). Los nombres de variables internas mezclan: la mayoría en español/spanglish (`servicio`, `relacionados`, `logosDir`).
- Comentarios: en español, explicativos del **porqué** (no del qué). A veces **sin tildes** (estilo del repo, ej. `// Multicamara...`). No es obligatorio quitar tildes, pero no sorprenderse.

### TypeScript / JavaScript

- `tsconfig.json` extiende **`astro/tsconfigs/strict`** (modo estricto).
- La mayor parte del código es **JS plano dentro de `.astro`** (frontmatter `---`). Los scripts de cliente (`<script>`) a veces usan anotaciones TS (ej. `const form = document.getElementById('contact-form') as HTMLFormElement | null`).
- Los datos (`servicios.js`) y scripts de build (`scripts/*.mjs`) son **JS puro (ESM)**, sin tipos.
- **ESM en todo el proyecto** (`"type": "module"` en package.json). Imports con `import`, no `require`.
- Manejo de errores: defensivo y silencioso en cliente (ej. `fetch(...).catch(() => {})` en el formulario para no bloquear el flujo a WhatsApp). Guard clauses con optional chaining (`el?.addEventListener`).

### Convenciones de nombres

- **Componentes Astro:** `PascalCase.astro` (`Nav.astro`, `VideoCard.astro`).
- **Páginas:** `kebab-case.astro` o el slug del contenido. Rutas dinámicas con `[slug].astro`.
- **Slugs y archivos de contenido:** `kebab-case` en español (`cirugia-robotica-clinica-santa-maria.md`).
- **Datos/variables:** `camelCase` (`seoTitle`, `heroEyebrow`, `logosDir`).
- **Clases CSS scoped:** estilo BEM-light con prefijo de sección (`.footer-col`, `.blog-card`, `.ig-card-overlay`, `.svc-process-step`).

### Estilos (CSS / Tailwind)

- **Tailwind utility-first** inline en el markup para layout/espaciado.
- Bloques **`<style>` scoped** por componente para lo complejo (animaciones, hovers, gradientes), usando **CSS custom properties** y los colores de marca hardcodeados.
- `astro.config.mjs` tiene **`inlineStylesheets: 'always'`** → todo el CSS va inline en el `<head>` (decisión de performance: elimina render-blocking; el HTML pesa ~10KB más pero gana ~460ms de FCP/LCP, y Cloudflare lo comprime con Brotli).

### Paleta y tipografía — **FIJAS, NO CAMBIAR**

| Token | Valor | Uso |
| :--- | :--- | :--- |
| Naranja primario | `#FF4500` | Acentos, CTAs, favicon |
| Naranja contraste | `#E63E00`, `#C53700` | Texto pequeño naranja (cumple WCAG AA) |
| Texto/negro | `#1a1a1a` | Titulares, texto principal |
| Grises de texto | `#666`, `#555` | Texto secundario (cumplen 4.5:1 sobre blanco) |
| Tipografía | **Inter** (variable) | Toda la tipografía |

> Se hizo un trabajo deliberado de **contraste WCAG AA**: no usar `#888`/`#999` para texto pequeño (no pasan 4.5:1). Mantener `#666`/`#555`.

### Reglas estrictas del proyecto (impuestas por el dueño)

1. ⛔ **NO modificar el flujo del formulario de contacto ni el parámetro `?servicio=<slug>`.** El `value` de cada `<option>` (ej. `circuito-cerrado`) es parte del flujo y NO debe cambiar aunque el texto visible se renombre.
2. ⛔ **NO agregar dependencias** a `package.json` salvo que sea estrictamente necesario y se justifique.
3. ⛔ **NO cambiar la paleta de colores ni la tipografía.**
4. ⛔ **NO romper el SEO que ya funciona** (schemas, canonicals, redirects, sitemap).
5. 💻 **Entorno de desarrollo: Windows + PowerShell.** No asumir bash/Unix por defecto (aunque hay bash disponible). Cuidado con `/dev/null` (usar `$null`), variables de entorno (`$env:VAR`), etc.

---

## 4. ESTADO DE TRASPASO (MIGRACIÓN)

### 4.1 Últimas funcionalidades completadas con éxito

Trabajo reciente (todo desplegado en producción, `main`):

- ✅ **Favicon "app icon":** cuadrado naranja `#FF4500` + cámara blanca, visible en light/dark (se eliminaron las variantes `-dark` vacías). Generado vía `scripts/generate-favicons.mjs`.
- ✅ **Footer rediseñado** a 4 columnas + bloque "Síguenos" con link a Instagram (`@dar2.cl`).
- ✅ **Sección de Instagram en la home** con el web component de **Behold.so** (`feed-id="L5VGbKK8n3XzIZpmneCs"`) — auto-actualiza cuando se publica en Instagram. Cero mantenimiento.
- ✅ **Formulario de contacto con doble captura:** `await fetch` a **Web3Forms** (captura server-side garantizada, llega a carlos@dar2.cl) + apertura de WhatsApp. Incluye `replyto` al email del cliente, `from_name` y feedback visual (loading/success/error). El auto-reply al cliente quedó descartado (es feature de pago de Web3Forms).
- ✅ **SEO on-page por servicio:** `seoTitle` con la keyword real al frente (ej. "Productora de streaming corporativo en Santiago"), `seoDescription` con variantes + geo. Sufijo de marca global acortado a `| DAR2` (vía `fullTitle` en `Base.astro`).
- ✅ **Renombre de servicio:** "Circuito Cerrado CCTV" → **"Multicámara para Eventos"** (atraía público de seguridad). Renombrado en nav, footer, schema, contacto, home, llms.txt. **El slug `/circuito-cerrado/` se mantuvo intacto** (no rompe URLs ni el flujo del formulario). El blog post educativo "circuito-cerrado-vs-streaming" se conservó (captura esa búsqueda informativa).
- ✅ **Quick wins SEO:** `aria-current="page"` en Nav, fechas de blog escalonadas, `hreflang="es-CL"` + `x-default`, schema `Blog`+`ItemList` en `/blog/`, `rel="noopener noreferrer"` en links externos.
- ✅ **Limpieza de spam del hackeo (Bluehost):** reglas **410 Gone** en `nginx.conf` para URLs de spam (`*.html`, `/products/`) que Google aún recordaba.
- ✅ **(Sesión previa con otro asistente)** 5 blog posts nuevos, componentes `Reveal.astro` y `TTSPlayer.astro`, security headers, sitemap manual completo (27 URLs), NAP consistente.

### 4.2 Estado actual del código

**El sitio está técnicamente completo y estable.** El on-page, schema, performance (CSS inline, imágenes AVIF, fonts preload) y técnico (canonicals, redirects, sitemap, robots) están en muy buen estado — mejor que la competencia directa. `npm run build` genera 28 páginas sin errores.

### 4.3 Deudas técnicas y errores conocidos (de CÓDIGO)

| Item | Detalle | Acción sugerida |
| :--- | :--- | :--- |
| **`@astrojs/sitemap` huérfano** | Está en `dependencies` pero NO se usa (`integrations: []`). El sitemap es manual. | Decidir: migrar a sitemap automático (elimina mantenimiento a mano) **o** quitar la dependencia. |
| **Sitemap manual** | `public/sitemap-manual.xml` se mantiene a mano (27 URLs). Riesgo de desactualizarse al agregar páginas. | Idealmente migrar a `@astrojs/sitemap` (requiere actualizar `robots.txt` y el redirect de `nginx.conf`). |
| **GTM posible peso muerto** | `GTM-5NBSGWM5` carga en cada visita. No se confirmó que dispare nada (Analytics, etc.). | Verificar en el contenedor de GTM si hay tags activos; si está vacío, quitarlo (gana performance). |
| **VideoObject `uploadDate`** | El audit sospecha fechas placeholder (2022/2023) en el schema VideoObject de home/portafolio. | Verificar y poner fechas reales (o el `anio` del proyecto), o Google ignora el rich result. |
| **Testimonios sin Review schema** | Los testimonios del home son anónimos, sin schema `Review`. | Agregar `Review` schema **solo** con nombres/empresas reales y con permiso del cliente. |
| **README desactualizado** | Dice `Base.astro` en components (está en `layouts/`), score SEO viejo (62), sitemap "to be retired". | Actualizar o deferir al presente CLAUDE.md. |

### 4.4 NO son bugs de código — SEO operativo (tareas del dueño del sitio)

El sitio no aparece bien posicionado en Google **no por el código** (que está completo), sino por **falta de autoridad de dominio**. Estado en Search Console (2026-06): **15 páginas indexadas / 19 "rastreada: actualmente sin indexar"**. Eso = Google las leyó pero el dominio aún no le da confianza suficiente.

- ⏳ **Indexación pendiente** de ~19 páginas → se resuelve con autoridad (backlinks) + tiempo, NO con código.
- ⏳ **Subdominio spam `live.dar2.cl`** → eliminar registro en Cloudflare DNS (tarea manual).
- ⏳ **Reviews en Google:** 12 actuales → meta 40+.

### 4.5 Próximos pasos (Next Steps) inmediatos

**Prioridad 1 — construir autoridad (lo único que destraba la indexación):**
1. Registrar el negocio en directorios de alta autoridad. Ver **`BACKLINKS-DIRECTORIOS.md`** (incluye NAP exacto). Empezar por **Film Commission Chile** (`.gob.cl`), **Clutch.co**, **ineventos.cl**.
2. En **Google Search Console** → solicitar indexación de las páginas "rastreada/descubierta sin indexar" + confirmar que el sitemap (`sitemap-manual.xml`) siga "Correcto".
3. **Eliminar `live.dar2.cl`** en Cloudflare DNS.
4. **Campaña de reviews** en Google (12 → 40). Link directo: `g.page/r/CWmX_YPPJ4VcEBM/review`.

**Prioridad 2 — deuda técnica (de código, opcional):**
5. Resolver el `@astrojs/sitemap` huérfano (migrar a automático o quitar dep).
6. Verificar/limpiar GTM si está vacío.
7. Corregir `uploadDate` en VideoObject schema.

### 4.6 Documentos de referencia en el repo

| Archivo | Contenido |
| :--- | :--- |
| `KEYWORDS-Y-POSICIONAMIENTO.md` | Keyword research por servicio (cómo busca la gente cada uno) + diagnóstico de indexación |
| `BACKLINKS-DIRECTORIOS.md` | Guía de link building: directorios priorizados + datos NAP exactos para citaciones |
| `FULL-AUDIT-REPORT.md` / `ACTION-PLAN.md` | Auditoría SEO completa (algo desactualizada, pre-mejoras recientes) |
| `AUDIT-DEEPSEEK.md` | Auditoría secundaria con hallazgos verificados contra código |

---

## Apéndice: datos operativos y claves públicas

> Estas claves son **públicas por diseño** (van en el frontend). Documentadas para referencia operativa.

- **NAP oficial:** DAR2 Servicios Audiovisuales · Av. Holanda 099, Oficina 603, Providencia, Santiago, Chile · +56 9 9843 3346 · dar2@dar2.cl
- **Web3Forms access key** (en `contacto.astro`): `8786a10e-33d3-40a3-9f1b-6570a3a3db0c` (los leads llegan a carlos@dar2.cl)
- **Behold.so feed-id** (en `index.astro`): `L5VGbKK8n3XzIZpmneCs`
- **Google Tag Manager:** `GTM-5NBSGWM5`
- **Google review link:** `https://g.page/r/CWmX_YPPJ4VcEBM/review`
- **CSP nota:** si se agregan scripts externos (analytics, píxeles, etc.), hay que añadir sus dominios a la `Content-Security-Policy` en `nginx.conf`.

> **Nota para OpenCode:** OpenCode lee por defecto `AGENTS.md`. Si quieres que tome estas instrucciones automáticamente, crea un `AGENTS.md` con el mismo contenido (o un symlink/copia de este archivo).
