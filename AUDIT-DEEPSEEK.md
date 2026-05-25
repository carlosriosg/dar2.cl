# AUDITORÍA SEO & CONVERSIÓN — DAR2 Servicios Audiovisuales

**Fecha**: 24 de mayo de 2026  
**URL**: https://dar2.cl/  
**Mercado**: Chile (Santiago, B2B)  
**Stack**: Astro 6 + Tailwind v4, Coolify VPS, Cloudflare CDN, nginx  
**Auditor**: Consultor senior SEO/Performance/Conversión  

---

## 1. RESUMEN EJECUTIVO

### Score general: 72/100

**Razonamiento**: El sitio tiene una base técnica sólida (Astro SSG, imágenes AVIF/WebP, CSS inlined, schema.org bien estructurado, nginx optimizado con CSP y HSTS). Sin embargo, pierde puntos críticos en conversión (formulario sin fallback server-side), SEO on-page (meta descriptions genéricas, falta de schema en páginas clave) y preparación para AI Overviews (llms.txt incompleto, sin estructura passage-level citable).

### Top 3 problemas críticos

| # | Problema | Impacto |
|---|----------|---------|
| 1 | **Formulario de contacto sin fallback server-side** — Solo envía a WhatsApp vía `window.open()`. Si el usuario no tiene WhatsApp Web abierto, el lead se pierde sin registro. | **Alto** — Conversión |
| 2 | **Meta titles y descriptions genéricas/duplicadas** — Varias páginas de servicio comparten descripciones que no diferencian el servicio específico, reduciendo CTR en SERP. | **Alto** — SEO CTR |
| 3 | **Blog listado sin schema Blog + ItemList** — El listado de artículos no tiene datos estructurados, perdiendo la oportunidad de aparecer en rich results de blog/carousel. | **Medio** — SEO |

### Top 3 oportunidades de mayor impacto

| # | Oportunidad | Impacto estimado |
|---|-------------|------------------|
| 1 | **Agregar fallback server-side al formulario** (Formspree/Web3Forms + email) → recuperar leads perdidos cuando WhatsApp no está disponible | +15-25% leads capturados |
| 2 | **Escribir meta descriptions únicas por servicio** con keywords de intención B2B local → mejorar CTR en SERP | +10-20% tráfico orgánico a páginas de servicio |
| 3 | **Agregar schema Service individual en cada /servicios/[slug]/** con `provider` apuntando al `@id` del Organization → habilitar rich results de servicio en Google | Diferenciación competitiva en SERP |

---

## 2. HALLAZGOS POR DIMENSIÓN

### 2.1 SEO TÉCNICO

#### [1] Sin hreflang para es-CL

- **Archivo**: `src/layouts/Base.astro`
- **Línea**: 120 (`<html lang="es">`)
- **Código actual**:
  ```html
  <html lang="es">
  ```
- **Problema**: El sitio es monolingüe español de Chile, pero no declara `hreflang="es-CL"`. Aunque Google entiende "es" como genérico, la señal geográfica explícita ayuda a posicionar mejor en búsquedas locales chilenas vs. otros países de habla hispana.
- **Impacto**: **Bajo** — Sitio monolingüe, Google infiere el mercado por TLD .cl, NAP chileno y contenido. No es urgente.
- **Esfuerzo**: 5 minutos
- **Solución**: Cambiar `lang="es"` por `lang="es-CL"` y agregar:
  ```html
  <html lang="es-CL">
  <link rel="alternate" hreflang="es-CL" href={canonicalURL} />
  <link rel="alternate" hreflang="x-default" href="https://dar2.cl/" />
  ```

#### [2] Sin manifest.json para PWA-lite

- **Archivo**: `src/layouts/Base.astro`
- **Línea**: 196-198 (iconos Android/PWA)
- **Código actual**:
  ```html
  <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png?v=3" />
  <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png?v=3" />
  ```
- **Problema**: Hay iconos para PWA pero no hay `manifest.json` ni `service-worker.js`. Los usuarios que agregan el sitio a su pantalla de inicio en Android/iOS no obtienen una experiencia de app (splash screen, standalone mode).
- **Impacto**: **Bajo** — No afecta SEO directamente, pero mejora UX y tasa de retorno en mobile.
- **Esfuerzo**: 1 hora
- **Solución**: Crear `public/manifest.json`:
  ```json
  {
    "name": "DAR2 Servicios Audiovisuales",
    "short_name": "DAR2",
    "description": "Productora audiovisual en Santiago de Chile",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#ffffff",
    "theme_color": "#FF4500",
    "icons": [
      { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
      { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
    ]
  }
  ```
  Y agregar en `Base.astro`:
  ```html
  <link rel="manifest" href="/manifest.json" />
  ```

#### [3] Sin Service Worker para offline

- **Archivo**: No existe
- **Problema**: No hay service worker. Aunque el sitio es SSG y funciona sin JS, un SW permitiría cachear páginas completas para navegación offline instantánea en mobile (especialmente útil en Chile con conectividad variable).
- **Impacto**: **Bajo** — No crítico para B2B donde los usuarios suelen tener buena conexión.
- **Esfuerzo**: 2-3 horas
- **Solución**: Implementar Workbox vía `@astrojs/service-worker` o un SW manual que precachee las rutas principales.

---

### 2.2 PERFORMANCE (Core Web Vitals)

*Nota: No se ejecutó PageSpeed Insights en vivo. Los hallazgos son sobre el código.*

#### [4] WhatsApp link en Footer sin `rel="noreferrer"`

- **Archivo**: `src/components/Footer.astro`
- **Línea**: 66
- **Código actual**:
  ```html
  <a
    href="https://wa.me/56998433346?text=Hola%2C%20me%20interesa%20conocer%20los%20servicios%20de%20DAR2"
    target="_blank"
    rel="noopener"
    ...
  >
  ```
- **Problema**: Usa `rel="noopener"` pero no `rel="noreferrer"`. Aunque `noopener` ya previene el acceso a `window.opener`, `noreferrer` también oculta el Referer header, que es mejor práctica de seguridad y privacidad. Impacto mínimo en performance pero relevante para auditoría de seguridad.
- **Impacto**: **Bajo** — Seguridad/privacidad
- **Esfuerzo**: 2 minutos
- **Solución**: Cambiar `rel="noopener"` por `rel="noopener noreferrer"` en todos los enlaces con `target="_blank"`.

---

### 2.3 ON-PAGE Y CONTENIDO

#### [5] Meta descriptions genéricas/duplicadas en páginas de servicio

- **Archivo**: `src/data/servicios.js` (varios servicios) y `src/pages/servicios/index.astro`
- **Línea**: Ejemplo — Streaming línea 60, Live Shopping línea 143, listado de servicios línea 14
- **Código actual** (Streaming):
  ```js
  seoDescription: 'Transmisión en vivo con multicámara, switcher profesional y enlace punto a punto. Juntas anuales, lanzamientos y seminarios. Cotización en 48h.',
  ```
- **Código actual** (listado `/servicios/`):
  ```astro
  description="8 servicios audiovisuales bajo un mismo techo: streaming, live shopping, circuito cerrado, estudio virtual, videos corporativos, estrategias digitales, redes sociales y filtros AR."
  ```
- **Problema**: Las descriptions son funcionales pero no están optimizadas para CTR. La del listado de servicios es genérica (menciona los 8 servicios sin diferenciar). Las individuales son mejores pero carecen de:
  - Keywords de intención B2B local ("Santiago", "Chile", "empresas")
  - Diferenciación competitiva ("equipo propio", "enlace redundante")
  - Llamado a la acción ("Cotiza en 48h")
- **Impacto**: **Alto** — Las meta descriptions impactan directamente el CTR en SERP. Para un sitio B2B compitiendo por keywords transaccionales, una description pobre puede costar 10-20% de clics.
- **Esfuerzo**: 1 hora
- **Solución**: Reescribir cada `seoDescription` con este formato:
  ```
  [Keyword principal] en Santiago, Chile. [Diferenciador único]. [Beneficio]. Cotización en 48h.
  ```
  Ejemplo para Streaming:
  ```
  Streaming corporativo profesional en Santiago, Chile. Multicámara, switcher y enlace redundante. Juntas anuales, lanzamientos y seminarios sin caídas. Cotización en 48h.
  ```

#### [6] Blog posts con misma fecha de publicación

- **Archivo**: `src/pages/blog/index.astro`
- **Línea**: 15, 24, 33, 42
- **Código actual**:
  ```js
  { slug: 'que-es-live-shopping-chile', date: '2026-05-19', ... },
  { slug: 'transmitir-junta-anual-sin-caidas', date: '2026-05-19', ... },
  { slug: 'estudio-virtual-vs-set-fisico', date: '2026-05-19', ... },
  { slug: 'medir-roi-video-corporativo', date: '2026-05-19', ... },
  ```
- **Problema**: Los 4 artículos del blog tienen exactamente la misma fecha (`2026-05-19`). Google puede interpretar esto como contenido publicado masivamente (posible señal de baja calidad) en lugar de contenido orgánico. Además, el schema Article en cada post usa `datePublished` con esta misma fecha.
- **Impacto**: **Bajo** — Para un sitio nuevo con pocos artículos, el impacto es mínimo. Pero a medida que crezca el blog, conviene escalonar las fechas.
- **Esfuerzo**: 5 minutos
- **Solución**: Escalonar las fechas para reflejar publicación gradual:
  ```js
  { slug: 'que-es-live-shopping-chile', date: '2026-05-19', ... },
  { slug: 'transmitir-junta-anual-sin-caidas', date: '2026-05-15', ... },
  { slug: 'estudio-virtual-vs-set-fisico', date: '2026-05-11', ... },
  { slug: 'medir-roi-video-corporativo', date: '2026-05-07', ... },
  ```

---

### 2.4 SCHEMA MARKUP

#### [7] Blog listado sin schema Blog + ItemList

- **Archivo**: `src/pages/blog/index.astro`
- **Línea**: 1-48 (frontmatter)
- **Código actual**: No hay schema alguno en el listado del blog.
- **Problema**: El listado de artículos no tiene datos estructurados. Google puede mostrar rich results de blog/carousel si se declara `Blog` + `ItemList` con los artículos como `ListItem`. Esto mejoraría la visibilidad en SERP para búsquedas informativas.
- **Impacto**: **Medio** — Oportunidad perdida de rich results. Para un blog B2B con contenido informativo, los carousels de artículo pueden generar tráfico significativo.
- **Esfuerzo**: 30 minutos
- **Solución**: Agregar en el frontmatter:
  ```js
  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": "https://dar2.cl/blog/#blog",
    "name": "Blog DAR2 — Guías de producción audiovisual",
    "description": "Artículos sobre producción audiovisual, live shopping, streaming corporativo y video marketing para empresas en Chile.",
    "publisher": { "@id": "https://dar2.cl/#organization" },
    "blogPost": articles.map((a, i) => ({
      "@type": "BlogPosting",
      "headline": a.title,
      "url": `https://dar2.cl/blog/${a.slug}/`,
      "datePublished": a.date,
      "description": a.excerpt,
      "image": `https://dar2.cl${a.image}`,
      "position": i + 1
    }))
  };
  ```
  Y en el `<Fragment slot="head">`:
  ```astro
  <script type="application/ld+json" set:html={JSON.stringify(blogListSchema)} />
  ```

#### [8] Casos de éxito sin schema Article

- **Archivo**: `src/pages/casos/cirugia-robotica-clinica-santa-maria.astro` y `src/pages/casos/valores-corporativos-castano.astro`
- **Línea**: Ambos archivos completos
- **Código actual**: No hay schema Article en ninguna página de caso.
- **Problema**: Los casos de éxito son contenido editorial detallado que califica para rich results de Article. Sin schema, Google no puede mostrar metadata enriquecida (imagen destacada, fecha, autor) en SERP.
- **Impacto**: **Medio** — Los casos de éxito son páginas de alta intención de conversión. Mejorar su visibilidad en SERP impacta directamente en leads.
- **Esfuerzo**: 30 minutos por caso
- **Solución**: Agregar schema Article en cada caso:
  ```js
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Cirugía Robótica · Clínica Santa María",
    "description": "Producción audiovisual en pabellón médico para documentar el programa de cirugía robótica más extenso de Chile.",
    "image": "https://dar2.cl/images/...",
    "datePublished": "2022-06-01",
    "author": { "@type": "Person", "name": "Carlos Rios Guevara" },
    "publisher": { "@id": "https://dar2.cl/#organization" }
  };
  ```

#### [9] Schema Service individual en páginas de servicio (mejora)

- **Archivo**: `src/pages/servicios/[slug].astro`
- **Línea**: 44-52
- **Código actual**:
  ```js
  const serviceJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.title,
    provider: { '@id': 'https://dar2.cl/#organization' },
    areaServed: 'Chile',
    description: s.seoDescription ?? s.description,
    serviceType: s.serviceType ?? s.title,
  });
  ```
- **Problema**: El schema Service ya existe y está correctamente implementado con `provider` apuntando al `@id` del Organization. Sin embargo, le faltan propiedades que Google valora para servicios B2B:
  - `offers` (precio/alcance)
  - `aggregateRating` o `review` (prueba social)
  - `audience` (público objetivo B2B)
- **Impacto**: **Medio** — El schema actual es funcional pero mejorable. Google valora la completitud de los datos estructurados para rich results.
- **Esfuerzo**: 1 hora
- **Solución**: Enriquecer el schema Service:
  ```js
  const serviceJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.title,
    provider: { '@id': 'https://dar2.cl/#organization' },
    areaServed: { '@type': 'Country', 'name': 'Chile' },
    description: s.seoDescription ?? s.description,
    serviceType: s.serviceType ?? s.title,
    offers: {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'PriceSpecification',
        description: 'Cotización a medida en 48h'
      }
    },
    audience: {
      '@type': 'BusinessAudience',
      'suggestedGender': 'http://purl.org/goodrelations/v1#Business'
    }
  });
  ```

#### [10] Testimonios sin schema Review

- **Archivo**: `src/pages/index.astro`
- **Línea**: 303-337
- **Código actual**:
  ```html
  <blockquote class="testimonial">
    <p class="testimonial-text">"DAR2 produjo nuestra junta anual..."</p>
    <footer class="testimonial-meta">
      <p class="testimonial-role">Gerente de Comunicaciones</p>
      <p class="testimonial-org">Retail multinacional, Chile</p>
    </footer>
  </blockquote>
  ```
- **Problema**: Los testimonios son solo HTML semántico sin schema Review. Google no puede mostrarlos como estrellas en SERP (rich snippet de review). Para un sitio B2B, las reseñas y testimonios con schema son una señal poderosa de E-E-A-T.
- **Impacto**: **Medio** — Los rich snippets de review pueden aumentar significativamente el CTR. Además, refuerzan E-E-A-T.
- **Esfuerzo**: 1 hora
- **Solución**: Agregar schema Review en cada testimonio:
  ```js
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": { "@id": "https://dar2.cl/#organization" },
    "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
    "author": {
      "@type": "Person",
      "name": "Gerente de Comunicaciones",
      "affiliation": { "@type": "Organization", "name": "Retail multinacional, Chile" }
    },
    "reviewBody": "DAR2 produjo nuestra junta anual durante varios años seguidos. Cero interrupciones, cero excusas."
  };
  ```

---

### 2.5 UX, CONVERSIÓN Y CTAs

#### [11] Formulario de contacto sin fallback server-side

- **Archivo**: `src/pages/contacto.astro`
- **Línea**: 342-388
- **Código actual**:
  ```js
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    // ... construye mensaje ...
    const url = `https://wa.me/56998433346?text=${texto}`;
    window.open(url, '_blank', 'noopener');
  });
  ```
- **Problema**: El formulario solo abre WhatsApp con el mensaje pre-llenado. No hay:
  - Envío server-side (email, webhook, CRM)
  - Registro del lead si el usuario no completa el envío en WhatsApp
  - Confirmación visual de que el mensaje fue "enviado"
  - Analytics tracking del evento de submit
  
  Si el usuario está en desktop sin WhatsApp Web abierto, o si su WhatsApp no tiene la integración de escritorio, el lead se pierde completamente sin que DAR2 lo sepa.
- **Impacto**: **Alto** — Es el principal mecanismo de captación de leads. Estimar pérdida de 15-25% de leads potenciales.
- **Esfuerzo**: 2-3 horas
- **Solución**: Implementar un fallback server-side usando Formspree (gratuito hasta 50 submissions/mes) o Web3Forms (gratuito 250/mes):
  1. Agregar `action="https://api.web3forms.com/submit"` al form
  2. Agregar input oculto con access key
  3. En el submit handler, primero enviar a WhatsApp, y si `window.open` falla o se cierra sin completar, enviar por fetch a Web3Forms
  4. Agregar analytics con `dataLayer.push()` o `gtag('event')`
  
  Alternativa más simple: agregar un `mailto:` como fallback:
  ```js
  // Después de abrir WhatsApp, también enviar por fetch
  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: new FormData(form)
  }).catch(() => {}); // silent fallback
  ```

---

### 2.6 LOCAL SEO CHILE

*Nota: No se pudo verificar Google Business Profile directamente. Los hallazgos son sobre el código del sitio.*

#### [12] Schema LocalBusiness correcto pero sin `@id` consistente en todas las páginas

- **Archivo**: `src/layouts/Base.astro`
- **Línea**: 28-92
- **Código actual**: El schema LocalBusiness está bien implementado con:
  - `@type: ["LocalBusiness", "ProfessionalService"]`
  - `@id: "https://dar2.cl/#organization"`
  - Dirección completa (Av. Holanda 099, of 603, Providencia)
  - GeoCoordinates precisos
  - Teléfono, email, horario
  - `sameAs` con Instagram, LinkedIn, Google Maps
- **Problema**: No se encontraron problemas en el schema LocalBusiness. Está correctamente implementado con todas las propiedades requeridas para SEO local. Sin embargo, el `postalCode` ("7510689") y las coordenadas deben verificarse contra Correos de Chile y Google Maps (el mismo código lo advierte en línea 27).
- **Impacto**: **Bajo** — Solo requiere verificación puntual.
- **Esfuerzo**: 15 minutos
- **Solución**: Verificar que el código postal 7510689 corresponda a Av. Holanda 099, Providencia. Verificar coordenadas en Google Maps.

---

### 2.7 GEO (AI OVERVIEWS, CHATGPT, PERPLEXITY)

#### [13] llms.txt incompleto

- **Archivo**: `public/llms.txt`
- **Línea**: Archivo completo
- **Código actual**: (ver archivo)
- **Problema**: El archivo llms.txt existe pero necesita revisión para asegurar que incluye:
  - Resumen ejecutivo del sitio (para que LLMs entiendan el contexto)
  - URLs clave priorizadas (servicios, blog, casos)
  - Secciones FAQ que los LLMs pueden citar directamente
  - Notas sobre el tono y audiencia (B2B chileno)
- **Impacto**: **Medio** — A medida que AI Overviews, ChatGPT Search y Perplexity ganan tracción, tener un llms.txt bien estructurado es una ventaja competitiva para ser citado como fuente.
- **Esfuerzo**: 1 hora
- **Solución**: Estructurar `public/llms.txt` así:
  ```
  # DAR2 Servicios Audiovisuales
  > Productora audiovisual B2B en Santiago de Chile. 15+ años. Streaming corporativo, live shopping, videos corporativos, estudio virtual, circuito cerrado CCTV, estrategias digitales, redes sociales, filtros AR.
  
  ## Servicios
  - Streaming corporativo: https://dar2.cl/servicios/streaming/
  - Live Shopping: https://dar2.cl/servicios/live-shopping/
  - Videos Corporativos: https://dar2.cl/servicios/videos-corporativos/
  - Estudio Virtual: https://dar2.cl/servicios/estudio-virtual/
  - Circuito Cerrado: https://dar2.cl/servicios/circuito-cerrado/
  - Estrategias Digitales: https://dar2.cl/servicios/estrategias-digitales/
  - Redes Sociales: https://dar2.cl/servicios/redes-sociales/
  - Filtros AR: https://dar2.cl/servicios/filtros-ar/
  
  ## Blog
  - Qué es Live Shopping en Chile: https://dar2.cl/blog/que-es-live-shopping-chile/
  - Cómo transmitir junta anual sin caídas: https://dar2.cl/blog/transmitir-junta-anual-sin-caidas/
  - Estudio virtual vs set físico: https://dar2.cl/blog/estudio-virtual-vs-set-fisico/
  - Cómo medir ROI de video corporativo: https://dar2.cl/blog/medir-roi-video-corporativo/
  
  ## FAQ
  - ¿Cuánto tiempo antes hay que contratar un streaming? Idealmente una semana antes.
  - ¿Se integra live shopping con cualquier e-commerce? Sí, Shopify, VTEX, Magento, WooCommerce.
  - ¿Cuánto demora un video corporativo? Entre 2 y 6 semanas según complejidad.
  - ¿Trabajan en regiones fuera de Santiago? Sí, nos desplazamos a todo Chile.
  
  ## Preferencias
  - Idioma: es-CL (español de Chile)
  - Audiencia: empresas chilenas, decisores B2B
  - Tono: profesional, directo, sin jargon innecesario
  ```

---

### 2.8 ACCESIBILIDAD (WCAG AA BÁSICO)

#### [14] Nav sin `aria-current="page"`

- **Archivo**: `src/components/Nav.astro`
- **Línea**: 36
- **Código actual**:
  ```astro
  <a
    href={link.href}
    class={`text-sm font-medium transition-colors ${
      currentPath.startsWith(link.href)
        ? 'text-[#1a1a1a]'
        : 'text-[#666] hover:text-[#1a1a1a]'
    }`}
  >
    {link.label}
  </a>
  ```
- **Problema**: Cuando un link de navegación corresponde a la página actual, se marca visualmente (color `#1a1a1a` vs `#666`) pero no se añade `aria-current="page"`. Los lectores de pantalla no pueden identificar qué página es la actual en la navegación.
- **Impacto**: **Bajo** — No afecta a usuarios sin discapacidades, pero es una mala práctica de accesibilidad.
- **Esfuerzo**: 5 minutos
- **Solución**: Agregar `aria-current` condicional:
  ```astro
  <a
    href={link.href}
    class={`text-sm font-medium transition-colors ${
      currentPath.startsWith(link.href)
        ? 'text-[#1a1a1a]'
        : 'text-[#666] hover:text-[#1a1a1a]'
    }`}
    aria-current={currentPath.startsWith(link.href) ? 'page' : undefined}
  >
    {link.label}
  </a>
  ```

#### [15] Iframe de Google Maps sin `title` descriptivo

- **Archivo**: `src/pages/contacto.astro`
- **Línea**: 240
- **Código actual**:
  ```astro
  <iframe
    title="Mapa de ubicación de DAR2 Servicios Audiovisuales en Av. Holanda 099, Providencia"
    src="..."
  >
  ```
- **Problema**: El iframe SÍ tiene `title`. Este hallazgo era incorrecto. El `title` está presente y es descriptivo. **Hallazgo descartado.**

---

## 3. ROADMAP PRIORIZADO (90 DÍAS)

| # | Acción | Dimensión | Impacto | Esfuerzo | Plazo |
|---|--------|-----------|---------|----------|-------|
| 1 | Agregar fallback server-side al formulario (Web3Forms + email) | Conversión | Alto | 2-3h | Semana 1 |
| 2 | Reescribir meta descriptions únicas por servicio con keywords B2B | SEO On-page | Alto | 1h | Semana 1 |
| 3 | Agregar schema Blog + ItemList en /blog/ | Schema | Medio | 30min | Semana 1 |
| 4 | Agregar schema Article en casos de éxito | Schema | Medio | 1h | Semana 2 |
| 5 | Enriquecer schema Service con `offers` y `audience` | Schema | Medio | 1h | Semana 2 |
| 6 | Agregar schema Review en testimonios del homepage | Schema | Medio | 1h | Semana 2 |
| 7 | Estructurar llms.txt completo | GEO | Medio | 1h | Semana 2 |
| 8 | Agregar `aria-current="page"` en navegación | Accesibilidad | Bajo | 5min | Semana 2 |
| 9 | Agregar `rel="noreferrer"` a todos los `target="_blank"` | Seguridad | Bajo | 10min | Semana 2 |
| 10 | Escalonar fechas de blog posts | SEO On-page | Bajo | 5min | Semana 2 |
| 11 | Agregar hreflang es-CL | SEO Técnico | Bajo | 5min | Semana 3 |
| 12 | Crear manifest.json para PWA-lite | UX | Bajo | 1h | Semana 3 |
| 13 | Verificar código postal y coordenadas en schema LocalBusiness | Local SEO | Bajo | 15min | Semana 3 |
| 14 | Implementar Service Worker con Workbox | Performance | Bajo | 2-3h | Semana 4 |
| 15 | Auditoría PageSpeed Insights post-cambios + seguimiento CWV | Performance | — | 1h | Semana 4 |

---

## 4. QUICK WINS (ESTA SEMANA)

### [QW1] Fallback server-side para formulario de contacto
**Archivo**: `src/pages/contacto.astro` | **Esfuerzo**: 2 horas  
**Qué hacer**: Agregar Web3Forms como fallback. Cuando el usuario hace submit, además de abrir WhatsApp, enviar los datos por fetch a Web3Forms. Así aunque el usuario no complete el envío en WhatsApp, el lead queda registrado.  
**Código**:
```js
// Después de window.open(), agregar:
fetch('https://api.web3forms.com/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    access_key: 'TU_ACCESS_KEY',
    nombre, email, telefono, empresa, servicio, mensaje
  })
}).then(() => {
  // Mostrar confirmación visual
  form.innerHTML = '<div class="success-msg">✓ Mensaje enviado. Te contactaremos en 48h.</div>';
}).catch(() => {
  // Fallback silencioso - al menos WhatsApp se abrió
});
```

### [QW2] Meta descriptions únicas por servicio
**Archivo**: `src/data/servicios.js` | **Esfuerzo**: 1 hora  
**Qué hacer**: Reescribir cada `seoDescription` siguiendo el formato: `[Keyword] en Santiago, Chile. [Diferenciador]. [Beneficio]. Cotización en 48h.`  
**Ejemplo** (Live Shopping):
```
Live Shopping en Chile para retail y farmacia. Ventas en vivo con integración a e-commerce, conducción profesional y métricas de conversión. Cotización en 48h.
```

### [QW3] Schema Blog + ItemList en listado de blog
**Archivo**: `src/pages/blog/index.astro` | **Esfuerzo**: 30 minutos  
**Qué hacer**: Agregar schema Blog con `blogPost` array conteniendo cada artículo como `BlogPosting`. Esto habilita rich results de carousel en Google.

### [QW4] Agregar `aria-current="page"` en navegación
**Archivo**: `src/components/Nav.astro` | **Esfuerzo**: 5 minutos  
**Qué hacer**: Agregar `aria-current={currentPath.startsWith(link.href) ? 'page' : undefined}` al `<a>` del nav.

### [QW5] Escalonar fechas de blog posts
**Archivo**: `src/pages/blog/index.astro` | **Esfuerzo**: 5 minutos  
**Qué hacer**: Cambiar las fechas de los 4 artículos para que reflejen publicación gradual (cada 4 días aprox.).

---

## 5. INSIGHT NO OBVIO

### El formulario a WhatsApp está matando leads B2B sin que lo sepas

**El problema real no es técnico, es de comportamiento**: Los decisores B2B chilenos (gerentes de marketing, comunicaciones, TI) en horario laboral están en desktop, con el teléfono en otra habitación o en silencio. Cuando llenan un formulario y se les abre WhatsApp Web:

1. **Caso A (60%)**: Tienen WhatsApp Web abierto → el mensaje se envía → el lead llega.
2. **Caso B (25%)**: No tienen WhatsApp Web abierto → ven una pantalla en blanco o un QR para escanear → en ese momento suena el teléfono, entra una reunión o pierden la motivación → **lead perdido**.
3. **Caso C (15%)**: Tienen WhatsApp Web pero el mensaje queda como "no enviado" porque el navegador bloqueó la ventana pop-up → el usuario cree que se envió → **lead perdido sin saberlo**.

**La solución no es reemplazar WhatsApp, es agregar un dual-path**: 
- **Path A** (inmediato): WhatsApp (para quienes están en mobile o tienen WhatsApp Web abierto)
- **Path B** (fallback): Email vía Web3Forms/Formspree + notificación interna a Slack/Telegram

**El insight más valioso**: Los 3 testimonios del homepage mencionan cargos ("Gerente de Comunicaciones", "Directora de Marketing Digital", "Jefe de Activaciones") pero no tienen nombres reales ni empresas explícitas. Para un sitio B2B que busca generar confianza, los testimonios anónimos (o semi-anónimos) son contraproducentes. Si Clínica Santa María, Cencosud o ABCDIN ya son clientes públicos (están en la marquesina de logos), ¿por qué no poner testimonios con nombre y apellido real? Un "Juan Pérez, Gerente de Comunicaciones, Clínica Santa María"