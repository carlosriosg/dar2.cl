# Keywords y Posicionamiento — dar2.cl

**Fecha:** 2026-05-29
**Objetivo:** que cada servicio rankee por sí solo en Google Chile + mapa de cómo busca la gente cada servicio.

---

## PARTE 1 — Por qué hoy NO apareces (diagnóstico real)

Pusiste "streaming productora" / "streaming empresas" y no sales. La razón no es una sola. En orden de importancia:

### 1. Tus páginas de servicio NO están indexadas (causa #1)
Al buscar `site:dar2.cl` y `site:dar2.cl/servicios`, Google solo muestra la **home**. Las 8 páginas de servicio no aparecen en el índice. **Una página no indexada no puede rankear para nada.** Esto explica el 80% del problema.

> **Verificar YA:** Google Search Console → "Inspección de URLs" → pega `https://dar2.cl/servicios/streaming/` → ¿dice "La URL está en Google" o "no está indexada"? Si no está, click "Solicitar indexación". Repetir con las 8 páginas de servicio + blog + casos.

### 2. Subdominio `live.dar2.cl` — aclaración (NO es spam)
`live.dar2.cl` es la app de **Live Shopping de Radio Futuro** (cliente de DAR2), legítima y en producción. El spam del hackeo anterior (simuladores de vuelo) que Google llegó a indexar **ya da 404 — está muerto**, y las rutas internas de la app están en `noindex`. La app está aislada del dominio principal.

> **Acción:** NO eliminar el subdominio. Si `live.dar2.cl` está en Search Console como propiedad, usa "Retiradas" para acelerar la desindexación de las URLs spam viejas; si no, el 404 las limpia solo con el tiempo.

### 3. Autoridad de dominio = 0 (cero backlinks)
Ningún otro sitio enlaza a dar2.cl. Google usa los enlaces como "votos de confianza". Sin votos, no rankeas contra productoras con 10+ años. Esto se construye con tiempo (ver Parte 4).

### 4. Sitio nuevo en su forma actual
Recién migraste de Bluehost a VPS y reoptimizaste. Google tarda **semanas a meses** en confiar en un sitio renovado. Es normal. La indexación (#1) acelera esto.

**Conclusión:** El problema NO es principalmente la optimización on-page (que está bastante buena). Es **indexación + autoridad + tiempo + el subdominio spam**. La optimización de keywords ayuda, pero primero hay que estar en el índice.

---

## PARTE 2 — Cómo busca la gente cada servicio (keyword research)

> **Nota sobre volúmenes:** No tengo acceso a datos exactos de volumen de búsqueda (eso requiere Google Keyword Planner o DataForSEO — ver Parte 5). Las estimaciones de volumen y dificultad son cualitativas, basadas en el mercado chileno y el análisis de las SERPs reales de mayo 2026. Para cifras exactas, usa Keyword Planner (gratis).

Leyenda:
- **Vol** = volumen estimado (🔥 alto / 🟡 medio / 🔵 bajo-nicho)
- **Dif** = dificultad para rankear (🔴 alta / 🟡 media / 🟢 baja)
- **Intención** = qué quiere el que busca (Comercial = listo para contratar / Informativo = está aprendiendo)

---

### 01 · STREAMING — `/servicios/streaming/`
**Title actual:** "Streaming corporativo profesional en Chile" ✅ bueno

La gente NO solo busca "streaming corporativo". Busca muchas variantes:

| Keyword | Vol | Dif | Intención |
|---|---|---|---|
| **productora streaming** / productora de streaming | 🟡 | 🟡 | Comercial |
| **empresa de streaming** / empresas de streaming chile | 🟡 | 🟡 | Comercial |
| **transmisión de eventos en vivo** | 🔥 | 🔴 | Comercial |
| transmitir evento por internet | 🟡 | 🟡 | Comercial |
| streaming para empresas | 🟡 | 🟡 | Comercial |
| servicio de streaming santiago | 🔵 | 🟢 | Comercial |
| streaming junta de accionistas | 🔵 | 🟢 | Comercial |
| streaming seminario / congreso / webinar | 🔵 | 🟢 | Comercial |
| streaming híbrido evento | 🔵 | 🟢 | Comercial |

**Competidores que rankean:** streaminghd.cl (6.000+ eventos), istreaming.cl, tvenvivo.cl, endirecto.cl, ateproducciones.cl. Varios tienen el keyword en el dominio (ventaja difícil de superar).

**Qué hacer en tu página:**
- Tu H1 y title dicen "streaming corporativo". **Agrega las variantes "productora de streaming" y "transmisión de eventos en vivo"** en el H1, primer párrafo y un H2.
- Crea secciones con los long-tail fáciles: un H2 "Streaming para juntas de accionistas", otro "Streaming de seminarios y congresos". Esos términos tienen poca competencia y los puedes ganar primero.

---

### 02 · LIVE SHOPPING — `/servicios/live-shopping/`
**Title actual:** "Live Shopping en Chile — Ventas en vivo para retail" ✅ bueno

⚠️ **Ojo con la intención:** Cuando la gente busca "live shopping" o "qué es live shopping", la SERP está llena de **artículos informativos** (VTEX, IAB Chile, Diario Financiero, Emol). No buscan contratar — buscan entender. El lado comercial lo domina VTEX (plataforma).

| Keyword | Vol | Dif | Intención |
|---|---|---|---|
| qué es live shopping | 🔥 | 🔴 | Informativo |
| live shopping chile | 🔥 | 🔴 | Mixto |
| **productora live shopping** / quién hace live shopping | 🔵 | 🟢 | Comercial |
| **hacer live shopping** / cómo implementar live shopping | 🟡 | 🟡 | Comercial |
| live shopping para empresas / marcas | 🟡 | 🟡 | Comercial |
| venta en vivo / venta en directo retail | 🟡 | 🟡 | Comercial |
| live shopping retail / farmacia / supermercado | 🔵 | 🟢 | Comercial |

**Tu jugada:** No pelees el head term informativo contra los medios. **Gana el ángulo "productora/cómo implementar"** (comercial, poco competido). Tu blog post "Qué es Live Shopping" ya ataca el informativo — perfecto para captar al que aprende y mandarlo a tu página de servicio.

**Qué hacer:**
- En la página agrega H2: "¿Quién produce live shopping en Chile?" y "Cómo implementar live shopping en tu empresa".
- Enlaza desde el blog post hacia la página de servicio con texto ancla "producimos tu live shopping".

---

### 03 · CIRCUITO CERRADO — `/servicios/circuito-cerrado/`
**Title actual:** "Circuito cerrado CCTV para eventos corporativos" 🔴 **PROBLEMA GRAVE**

❌ **"Circuito cerrado" y "CCTV" en Chile = CÁMARAS DE SEGURIDAD/VIGILANCIA.** Quien busca eso quiere seguridad, no producción de eventos. Con este naming vas a:
1. Competir contra empresas de seguridad gigantes (imposible)
2. Atraer tráfico equivocado (gente que quiere cámaras de vigilancia, no eventos)

Lo que tú realmente ofreces es **multicámara para eventos con pantallas gigantes (IMAG)**. La gente lo busca así:

| Keyword | Vol | Dif | Intención |
|---|---|---|---|
| **pantallas led / gigantes para eventos** | 🟡 | 🟡 | Comercial |
| **multicámara eventos** / registro multicámara | 🔵 | 🟢 | Comercial |
| **IMAG eventos** / refuerzo de imagen evento | 🔵 | 🟢 | Comercial |
| cámaras PTZ robóticas eventos | 🔵 | 🟢 | Comercial |
| proyección pantallas congreso / seminario | 🔵 | 🟢 | Comercial |
| grabación congreso médico / académico | 🔵 | 🟢 | Comercial |

**Recomendación fuerte:** Renombra el servicio. En vez de "Circuito Cerrado CCTV" usa algo como **"Multicámara y Pantallas para Eventos"** o **"Registro Multicámara (IMAG)"**. El title debería ser "Multicámara y pantallas IMAG para eventos | DAR2". Quita "CCTV" del título y del heroEyebrow — te está trayendo el público equivocado y compitiendo en la categoría errónea.

> Cambiar el nombre visible NO obliga a cambiar el slug `/circuito-cerrado/` (cambiar slug rompe URLs). Pero sí cambia title, H1, eyebrow y contenido. Si decides cambiar el slug también, hay que poner un redirect 301.

---

### 04 · ESTUDIO VIRTUAL — `/servicios/estudio-virtual/`
**Title actual:** "Estudio virtual con green screen y escenografías 3D" ✅ bueno

| Keyword | Vol | Dif | Intención |
|---|---|---|---|
| **estudio virtual** / set virtual chile | 🟡 | 🟡 | Comercial |
| **croma / chroma key** profesional | 🟡 | 🟡 | Comercial |
| estudio con green screen / fondo verde | 🔵 | 🟢 | Comercial |
| plató virtual / set virtual | 🔵 | 🟢 | Comercial |
| arriendo estudio audiovisual santiago | 🟡 | 🟡 | Comercial |
| grabación croma empresas | 🔵 | 🟢 | Comercial |

**Qué hacer:**
- Agrega "croma" / "chroma key" / "fondo verde" explícitamente (la gente busca con esas palabras, no solo "estudio virtual").
- Long-tail ganable: "arriendo de estudio con croma en Providencia/Santiago".

---

### 05 · VIDEOS CORPORATIVOS — `/servicios/videos-corporativos/`
**Title actual:** "Videos corporativos e institucionales en Chile" ✅ bueno

🔥 **El servicio con MÁS volumen de búsqueda... y MÁS competencia.** Competidores con páginas dedicadas y dominios exactos: feriapixel.cl/videos-corporativos/, videocorporativo.cl, adaudiovisual.cl, picslab.cl, agenciakubo.cl.

| Keyword | Vol | Dif | Intención |
|---|---|---|---|
| **video corporativo** / videos corporativos | 🔥 | 🔴 | Comercial |
| **video corporativo empresas** | 🔥 | 🔴 | Comercial |
| productora video corporativo | 🟡 | 🟡 | Comercial |
| video institucional | 🟡 | 🟡 | Comercial |
| producción de videos corporativos chile | 🟡 | 🟡 | Comercial |
| video corporativo precio / valor / cuánto cuesta | 🟡 | 🟢 | Comercial |
| video de capacitación / inducción / RRHH | 🔵 | 🟢 | Comercial |
| video de proceso productivo / industrial | 🔵 | 🟢 | Comercial |

**Tu jugada:** El head term "video corporativo" es muy difícil (lo ganarás con tiempo + autoridad). **Empieza por los long-tail comerciales:** "video corporativo precio", "video de capacitación", "video de proceso productivo / industrial". Tienes clientes industriales (CMPC, Polpaico, Codelco) — un H2 "Video de procesos industriales y mineros" te diferencia y captura un nicho que casi nadie trabaja bien.

---

### 06 · ESTRATEGIAS DIGITALES — `/servicios/estrategias-digitales/`
**Title actual:** "Estrategia de contenido digital para marcas" 🟡 vago

⚠️ "Estrategia digital" compite contra **agencias de marketing** (sector saturadísimo) y no es tu core. Tu diferenciador real es que **produces** el contenido, no solo lo planeas.

| Keyword | Vol | Dif | Intención |
|---|---|---|---|
| agencia marketing digital | 🔥 | 🔴 | Comercial (no es tu pelea) |
| **marketing audiovisual** / estrategia de contenido audiovisual | 🔵 | 🟢 | Comercial |
| plan de contenido audiovisual para empresas | 🔵 | 🟢 | Comercial |
| productora de contenido marca | 🔵 | 🟢 | Comercial |

**Recomendación:** No intentes rankear como "agencia de marketing". Reposiciona hacia **"contenido audiovisual con estrategia"** — tu nicho. Title sugerido: "Estrategia y producción de contenido audiovisual | DAR2". Este servicio probablemente sea de los más difíciles de posicionar solo; considéralo apoyo de los demás más que un imán de tráfico.

---

### 07 · REDES SOCIALES — `/servicios/redes-sociales/`
**Title actual:** "Contenido para Instagram, TikTok y LinkedIn" ✅ bueno (enfoque correcto)

⚠️ "Redes sociales" / "community manager" compite con miles de agencias y freelancers. Pero tu enfoque (producción de contenido) es el ángulo correcto y menos saturado.

| Keyword | Vol | Dif | Intención |
|---|---|---|---|
| agencia redes sociales / community manager | 🔥 | 🔴 | Comercial (no es tu pelea) |
| **producción de contenido para redes sociales** | 🟡 | 🟡 | Comercial |
| **productora de reels** / videos para redes empresas | 🔵 | 🟢 | Comercial |
| producción reels / tiktok / shorts empresas | 🔵 | 🟢 | Comercial |
| videos verticales para marcas | 🔵 | 🟢 | Comercial |
| contenido audiovisual instagram empresa | 🔵 | 🟢 | Comercial |

**Qué hacer:** Mantén el enfoque "producción", no "gestión/community". Refuerza "productora de reels" y "videos verticales para empresas" — nichos ganables con poca competencia.

---

### 08 · FILTROS AR — `/servicios/filtros-ar/`
**Title actual:** "Filtros AR de marca para Instagram y TikTok" ✅ bueno

🎯 **Tu mayor OPORTUNIDAD de ranking rápido.** Nicho con poquísima competencia en Chile. Volumen bajo pero altamente comercial y específico. Puedes ser #1 relativamente rápido.

| Keyword | Vol | Dif | Intención |
|---|---|---|---|
| **filtros instagram personalizados** / para marca | 🔵 | 🟢 | Comercial |
| **filtros realidad aumentada marca** / empresa | 🔵 | 🟢 | Comercial |
| crear filtro instagram / tiktok empresa | 🔵 | 🟢 | Comercial |
| filtro AR para campaña / evento | 🔵 | 🟢 | Comercial |
| spark AR / effect house chile (servicio) | 🔵 | 🟢 | Comercial |
| branded filter / branded mask chile | 🔵 | 🟢 | Comercial |

**Qué hacer:** Esta página debería ser de las primeras en posicionar. Asegúrate que esté indexada. Long-tail ganables: "crear filtro de Instagram para empresa", "filtro AR para evento corporativo". Poca gente en Chile ofrece esto profesionalmente.

---

## PARTE 3 — Estrategia: que cada servicio rankee por sí solo

Para que una página de servicio rankee independiente, necesita 5 cosas. En orden:

1. **Estar indexada** (Parte 1, punto 1) — sin esto, nada más importa.
2. **Title + H1 con la keyword real** que usa la gente (Parte 2). Varios títulos ya están bien; los que hay que arreglar: Circuito Cerrado (urgente) y Estrategias Digitales.
3. **Contenido que cubra las variantes** — agregar H2 con los long-tail de cada servicio (ya los listé arriba). Google rankea una página por decenas de variantes si el contenido las menciona naturalmente.
4. **Enlaces internos con texto ancla correcto** — desde la home y el blog hacia cada servicio, usando el keyword como texto del enlace (ej: enlazar "productora de streaming" → /servicios/streaming/).
5. **Backlinks** (Parte 4) — para los head terms competitivos, sin enlaces externos no se gana.

### Prioridad por facilidad de victoria (dónde poner energía primero)

| Prioridad | Servicio | Por qué |
|---|---|---|
| 🥇 1 | **Filtros AR** | Casi sin competencia. Victoria rápida posible. |
| 🥇 2 | **Estudio Virtual** | Nicho técnico, competencia media, keywords claras. |
| 🥈 3 | **Streaming** (long-tail) | Head term difícil, pero "junta de accionistas / seminarios" ganables. |
| 🥈 4 | **Live Shopping** (ángulo productora) | El informativo lo tienes con el blog; el comercial poco competido. |
| 🥈 5 | **Circuito Cerrado → renombrar** | Primero arreglar el naming, después optimizar. |
| 🥉 6 | **Videos Corporativos** (long-tail) | Head term muy difícil; ganar por "capacitación / industrial / precio". |
| 🥉 7 | **Redes Sociales** (nicho producción) | Competido; ganar por "productora de reels". |
| 🥉 8 | **Estrategias Digitales** | El más difícil de posicionar solo; usar como apoyo. |

---

## PARTE 4 — Construir autoridad (backlinks) — lo que destraba todo

Sin enlaces externos, las páginas no rankean para términos competitivos. Fuentes realistas para DAR2:

1. **Páginas de proveedores de tus clientes** — pide a 5-10 clientes (Clínica Santa María, CMPC, etc.) que te listen en su página de "proveedores/partners". Son los enlaces más valiosos.
2. **Directorios de la industria chilena:** AVIA (Asociación de Productores Audiovisuales), ProChile, Cámara de Comercio de Santiago, Sortlist, Clutch.co, GoodFirms.
3. **Prensa/medios:** un pitch a Diario Financiero o Pulso sobre "live shopping en Chile" (eres experto, tienes casos).
4. **Tu propio Instagram/LinkedIn** con link a dar2.cl (señal de marca).
5. **Casos en sitios de clientes** — cuando produces algo, pide crédito con enlace.

Meta realista: 10+ dominios enlazando en 90 días.

---

## PARTE 5 — Cómo obtener datos de volumen REALES (gratis)

Para cifras exactas de búsqueda en Chile (no estimaciones):

1. **Google Keyword Planner** (gratis con cuenta Google Ads):
   - Crea cuenta en ads.google.com (no necesitas gastar)
   - Herramientas → Planificador de palabras clave → "Descubre nuevas palabras clave"
   - Pon: "video corporativo", "streaming empresas", etc. → filtra ubicación **Chile** e idioma **español**
   - Te da volumen mensual real + términos relacionados que no se me ocurrieron
2. **Google Search Console** (gratis, ya deberías tenerlo):
   - Una vez indexado, "Rendimiento" te muestra **las queries reales por las que apareces** y en qué posición. Oro puro: te dice exactamente cómo te encuentra la gente.
3. **Google Trends** (gratis): compara términos ("video corporativo" vs "video institucional") para ver cuál busca más la gente en Chile.

---

## RESUMEN — Qué hacer, en orden

> **Ola 2 (26-ago-2026):** se agregó la **PARTE 6** con las keywords nuevas desde exportaciones (P1 transaccional / P2 servicios sin keywords / P3 reposicionamiento). Primeros pasos ejecutados: 2 posts nuevos en el blog (`cuanto-cuesta-video-corporativo-chile` y `video-podcast-corporativo-que-es`), FAQs long-tail P1 en `servicios.js` (streaming y estudio virtual), y `llms.txt`/`llms-full.txt` sincronizados. Pendiente: verificar volúmenes en Keyword Planner y atacar el resto de la lista P1/P2 en siguientes sesiones.

**Esta semana (destraba todo):**
1. ✅ Verificar indexación de las 8 páginas de servicio en Search Console → solicitar indexación
2. ✅ `live.dar2.cl` aclarado: es la app de Radio Futuro (cliente), no spam. El spam viejo ya da 404. NO eliminar; opcional retirar URLs viejas en GSC.
3. ✅ Verificar que sitemap incluya todas las páginas (servicios, blog, casos)

**Próximas 2 semanas (optimización on-page):**
4. Renombrar "Circuito Cerrado CCTV" → "Multicámara y pantallas para eventos"
5. Agregar variantes de keyword + H2 long-tail en cada servicio (Parte 2)
6. Mejorar "Estrategias Digitales" hacia "contenido audiovisual con estrategia"
7. Enlaces internos con texto ancla correcto (home + blog → servicios)

**Próximos 90 días (autoridad):**
8. Campaña de reviews en Google (meta 40+)
9. Backlinks: proveedores de clientes + directorios industria (Parte 4)
10. Google Keyword Planner para volúmenes reales + ajustar

---

*Documento generado con análisis de SERPs reales (mayo 2026) + revisión del código de servicios.js. Volúmenes estimados cualitativamente; para cifras exactas usar Google Keyword Planner.*

---

## PARTE 6 — Ola 2: Keywords nuevas desde exportaciones (26-ago-2026)

**Fecha:** 2026-08-26
**Origen:** análisis de 3 exportaciones de keyword stats (CSV):

| CSV | Semilla/cobertura | Hallazgo |
|---|---|---|
| 10_56_17 | Identidad "productora audiovisual" + eventos + arriendo equipos | Top-of-funnel genérico |
| 11_01_55 | Video corporativo + postproducción/edición + streaming (leve) | Top-of-funnel + algo de video corporativo |
| 11_02_33 | Agencias de marketing digital | **Otro nicho** (agencias de marketing, no producción) — fuera de plan salvo vía "agencia de contenido" (P3) |

**Lectura general:** las 3 exportaciones son casi puro top-of-funnel. Los servicios que convierten y son el core de DAR2 (streaming, live shopping, estudio virtual, filtros AR, video podcast, multicámara) están **ausentes**. Estas listas llenan esos huecos. Se prioriza primero lo transaccional (intención de compra) y con geo-modifier.

---

### P1 · Transaccional + geo (prioridad alta — correr primero)

**Streaming** *(hueco más grave: casi no existe en las 3 exportaciones)*

| Keyword | Intención |
|---|---|
| streaming corporativo santiago | Comercial |
| transmisión en vivo santiago | Comercial |
| streaming de eventos santiago | Comercial |
| streaming de congresos | Comercial |
| streaming junta anual | Comercial |
| cuánto cuesta un streaming de evento | Comercial |
| precio streaming corporativo | Comercial |
| arriendo equipo streaming santiago | Comercial |
| webcast chile | Comercial |

**Video corporativo — completar parte transaccional**

| Keyword | Intención |
|---|---|
| cuánto cuesta un video corporativo | Comercial |
| precio video corporativo santiago | Comercial |
| video institucional chile | Comercial |
| filmación de empresa santiago | Comercial |
| video corporativo para pymes | Comercial |

**Estudio virtual / chroma** *(0 keywords hoy)*

| Keyword | Intención |
|---|---|
| estudio virtual santiago | Comercial |
| chroma key santiago | Comercial |
| arriendo estudio croma santiago | Comercial |
| grabación con chroma key | Comercial |
| estudio virtual corporativo | Comercial |
| set virtual / escenografía virtual | Comercial |

**Live shopping** *(0 keywords hoy)*

| Keyword | Intención |
|---|---|
| live shopping chile | Mixto |
| cuánto cuesta un live shopping | Comercial |
| venta en vivo / ventas en vivo | Comercial |
| live stream shopping | Comercial |
| producción live shopping santiago | Comercial |

**Transversal**

| Keyword | Intención |
|---|---|
| cotización video corporativo | Comercial |
| presupuesto producción audiovisual santiago | Comercial |
| productora audiovisual económica santiago | Comercial |
| arriendo estudio de grabación santiago | Comercial |

---

### P2 · Servicios sin ninguna keyword en las exportaciones

**Filtros AR** *(nicho con poca competencia en Chile — victoria rápida posible)*

| Keyword | Intención |
|---|---|
| filtros tiktok para empresas | Comercial |
| filtros snapchat de marca | Comercial |
| crear filtro de marca tiktok | Comercial |
| realidad aumentada para marcas chile | Comercial |
| cuánto cuesta un filtro tiktok | Comercial |
| effect house / lens studio | Comercial |

**Video Podcast** *(servicio 09 — no estaba en el doc de mayo, que contaba 8 servicios)*

| Keyword | Intención |
|---|---|
| videopodcast corporativo | Comercial |
| producción de podcast santiago | Comercial |
| estudio de podcast santiago | Comercial |
| podcast para empresas | Comercial |
| arriendo estudio podcast | Comercial |

**Redes Sociales / reels** *(parcial — falta el ángulo producción)*

| Keyword | Intención |
|---|---|
| productora de reels santiago | Comercial |
| cápsulas para redes sociales | Comercial |
| contenido tiktok para empresas | Comercial |
| videos para linkedin empresas | Comercial |
| paquete mensual de contenido audiovisual | Comercial |

**Multicámara / IMAG** *(0 keywords hoy)*

| Keyword | Intención |
|---|---|
| multicámara para congresos | Comercial |
| pantallas led evento santiago | Comercial |
| sistema multicámara santiago | Comercial |
| cámaras ptz santiago | Comercial |
| cobertura audiovisual de eventos corporativos | Comercial |

---

### P3 · Estrategias Digitales (reposicionar, NO pelear "marketing digital")

El CSV 3 (agencias de marketing digital) es otro sector, saturado y dominado por agencias de marketing. Si se quiere traccionar "Estrategias Digitales", el ángulo correcto es el de producción de contenido:

| Keyword | Intención |
|---|---|
| agencia de contenido audiovisual | Comercial |
| agencia de video marketing santiago | Comercial |
| producción de contenido para marcas | Comercial |
| plan de contenido con producción audiovisual | Comercial |

---

### Cómo usar esta lista

1. **Correr P1 primero:** son long-tails con intención de compra que ya tienen respaldo en el sitio (blog de costos, páginas de servicio). Con la autoridad actual rankean antes que el head term "productora audiovisual" genérico.
2. **Geo-modifiers:** cada keyword debe tener su variante `santiago` y `chile`.
3. **Verificar volúmenes** en Google Keyword Planner / DataForSEO filtrado a Chile antes de invertir contenido.
4. **GEO (IA):** si estas keywords se traducen en contenido nuevo visible (blog, servicios, casos), actualizar también `public/llms.txt` y `public/llms-full.txt` para mantener citabilidad de DAR2 en AI Overviews / ChatGPT / Perplexity.
