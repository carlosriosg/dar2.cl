# Cloudflare Cache Rules — Reducir TTFB (usuarios y crawlers de IA)

> **Problema:** Ahrefs reporta "Slow page / Slow server response for AI
> crawlers" con TTFB > 500ms en algunas páginas. El HTML de dar2.cl es 100%
> estático (Astro SSG), así que el TTFB de origen es de milisegundos. La
> latencia está en la cadena `Cloudflare → Traefik (Coolify) → nginx` y en que
> el HTML no queda cacheado en el edge de Cloudflare: cada request (sobre todo
> de crawlers de IA como GPTBot, ClaudeBot, PerplexityBot, Google-Extended, que
> llegan por rutas "frías") hace el viaje completo hasta el VPS.
>
> **Solución:** cachear el HTML estático en el edge. No requiere tocar código
> ni redeploy: se configura en el dashboard de Cloudflare (zona `dar2.cl`).

---

## 1. Cache Rule para HTML estático (lo principal)

En Cloudflare → **Caching → Cache Rules → Create rule**:

| Campo | Valor |
| :--- | :--- |
| **Name** | `Cache HTML estático` |
| **When incoming requests match** | `Hostname` equals `dar2.cl` **AND** `Request Method` equals `GET` **AND** `URI Path` does not contain `wp-` |
| **Then → Cache eligibility** | `Eligible for cache` |
| **Then → Edge TTL** | `1 hour` (subir a `4 hours` si el contenido no cambia seguido) |

Opcional (recomendado): agregar una segunda condición `URI Path` does not
contain `.well-known` para no cachear `security.txt` ni `llms.txt` por si se
editan a mano (aunque esos ya los cachea la regla de assets, no está de más).

> **Por qué es seguro:** el sitio es 100% estático, sin cookies de sesión ni
> contenido dinámico por usuario. `GET /` y `GET /servicios/streaming/` devuelven
> siempre el mismo HTML. Cachéar en el edge no rompe nada. El formulario de
> contacto es un `fetch` a Web3Forms desde el cliente, no una página dinámica,
> así que tampoco hay riesgo de cachear respuestas de formulario.

## 2. Verificar que no se cachee lo que no debe

Asegurar que **NO** queden cacheados en edge:

- `POST` a `/contacto/` (el formulario). La regla ya exige `Request Method = GET`.
- `/sitemap-index.xml` y `/sitemap-0.xml` (mejor que pasen directo al origen para
  que siempre reflejen el último build). Si quieres blindarlo, agrega a la
  Cache Rule la condición `URI Path` does not contain `sitemap`.

## 3. TLS en origen (baja un salto)

Cadena actual: `Cloudflare (TLS) → Traefik (termina TLS) → nginx (:80, HTTP)`.

En Cloudflare → **SSL/TLS → Overview**, usar:

- **Encryption mode:** `Full (strict)` (certificado válido en Traefik).
- Evitar `Flexible` (rompe HSTS y re-negocia TLS).

Si Traefik ya termina TLS con un certificado válido, `Full (strict)` es lo
correcto y no añade latencia.

## 4. Bot Fight Mode (no desafiar a los crawlers de IA que queremos dejar pasar)

En Cloudflare → **Security → Bots**:

- `Bot Fight Mode` puede añadir desafíos/latencia a los bots. Los crawlers de IA
  que ya están permitidos en `robots.txt` (GPTBot, ClaudeBot, anthropic-ai,
  PerplexityBot, Google-Extended, ChatGPT-User, OAI-SearchBot, etc.) **no deben**
  ser desafiados. Verificar que Bot Fight Mode no los esté frenando; si alguno
  aparece con reto, agregarlo a la lista de "Verified bots" o a una WAF custom
  rule de bypass.

## 5. Cómo medir el resultado

Tras activar la Cache Rule, medir el TTFB real (no el de Ahrefs, que corre
cada varios días):

```powershell
# Desde PowerShell (Windows). Repetir 2 veces: la 2da debe salir de cache.
curl.exe -s -o NUL -w "TTFB: %{time_starttransfer}s | Total: %{time_total}s | %{http_code}`n" https://dar2.cl/
curl.exe -s -o NUL -w "TTFB: %{time_starttransfer}s | Total: %{time_total}s | %{http_code}`n" https://dar2.cl/
```

También revisar el header de respuesta:

```powershell
curl.exe -s -I https://dar2.cl/ | Select-String -Pattern "cf-cache-status|age:"
```

- `cf-cache-status: HIT` → la respuesta vino del edge (TTFB ~50ms). ✅
- `cf-cache-status: MISS/DYNAMIC` → sigue yendo a origen; revisar la Cache Rule.

> **Meta:** TTFB de edge < 100ms para HTML cacheado, incluso para los
> user-agents de IA (los bots se benefician igual: reciben el HTML desde el CDN
> sin esperar el viaje al VPS).

---

## 6. Aplicar por código (Terraform y API)

### 6.1 Terraform

El repo incluye [`cloudflare-cache-rules.tf`](cloudflare-cache-rules.tf) listo
para usar. Configura el provider (`CLOUDFLARE_API_TOKEN`), define
`cloudflare_zone_id` y corre:

```powershell
terraform init
terraform plan   -var "cloudflare_zone_id=TU_ZONE_ID"
terraform apply  -var "cloudflare_zone_id=TU_ZONE_ID"
```

### 6.2 API (curl desde PowerShell)

> ⚠️ El `PUT` al *entry point* **reemplaza todas las Cache Rules existentes** de
> la zona. Si ya tienes otras Cache Rules, primero listalas con `GET` y consolida
> la lista en un solo `PUT`. Para dar2.cl (sin Cache Rules previas) es seguro.

Token de API con permisos: **Zone → Cache Rules → Edit**, **Account Rulesets →
Edit**.

```powershell
$ZONE_ID = "TU_ZONE_ID"
$TOKEN   = "TU_API_TOKEN"

curl.exe "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/phases/http_request_cache_settings/entrypoint" `
  --request PUT `
  --header "Authorization: Bearer $TOKEN" `
  --header "Content-Type: application/json" `
  --data '{"rules":[{"expression":"(http.host eq \"dar2.cl\" and http.request.method eq \"GET\" and not http.request.uri.path contains \"wp-\" and not http.request.uri.path contains \"sitemap\")","description":"Cache HTML estatico dar2.cl","action":"set_cache_settings","action_parameters":{"cache":true,"edge_ttl":{"mode":"override_origin","default":3600}}}]}'
```

> **Si el expression editor rechaza `http.request.method`:** quitarlo y usar
> `(http.host eq "dar2.cl" and not http.request.uri.path contains "wp-" and not
> http.request.uri.path contains "sitemap")`. Cloudflare solo cachea GET/HEAD por
> defecto, así que `POST /contacto/` no se cachearía igual.

Referencias oficiales: [Cache Rules — Terraform example](https://developers.cloudflare.com/cache/how-to/cache-rules/terraform-example/) · [Create a cache rule via API](https://developers.cloudflare.com/cache/how-to/cache-rules/create-api/).
