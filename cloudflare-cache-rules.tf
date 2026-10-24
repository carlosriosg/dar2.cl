# cloudflare-cache-rules.tf — Cache Rules de Cloudflare para dar2.cl
#
# Cachea el HTML estático en el edge de Cloudflare para reducir el TTFB
# (el "slow server response" que Ahrefs marca, sobre todo para crawlers de IA
# como GPTBot/ClaudeBot/PerplexityBot). El sitio es Astro SSG 100% estático,
# así que cachear el HTML es seguro (sin cookies de sesión ni contenido por
# usuario). El formulario de contacto es un fetch a Web3Forms desde el cliente,
# no una página dinámica.
#
# Uso:
#   1. Exporta CLOUDFLARE_API_TOKEN (token con permiso Zone > Cache Rules > Edit).
#   2. Define la variable: terraform plan -var "cloudflare_zone_id=TU_ZONE_ID"
#   3. terraform init && terraform plan && terraform apply
#
# Referencia oficial:
#   https://developers.cloudflare.com/cache/how-to/cache-rules/terraform-example/

terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }
}

variable "cloudflare_zone_id" {
  description = "Zone ID de dar2.cl (Cloudflare -> Overview -> API -> Zone ID)"
  type        = string
}

resource "cloudflare_ruleset" "cache_html_dar2" {
  zone_id     = var.cloudflare_zone_id
  name        = "Cache HTML estático dar2.cl"
  description = "Cachea el HTML estático en el edge para reducir TTFB"
  kind        = "zone"
  phase       = "http_request_cache_settings"

  rules = [
    {
      ref         = "cache_html_estatico"
      description = "GET de dar2.cl (HTML), sin wp- ni sitemap"
      expression  = "(http.host eq \"dar2.cl\" and http.request.method eq \"GET\" and not http.request.uri.path contains \"wp-\" and not http.request.uri.path contains \"sitemap\")"
      action      = "set_cache_settings"

      action_parameters = {
        cache = true
        edge_ttl = {
          mode    = "override_origin"
          default = 300 # 5 minutos de cache en el edge
        }
      }
    },
  ]
}
