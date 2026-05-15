# DAR2.cl - Dockerfile multi-stage
# Build: Node 22 alpine + Astro -> dist/
# Serve: nginx alpine + nginx.conf custom (con reglas SEO 410/301/cache)

# ============================================
# Stage 1: Build del sitio Astro
# ============================================
FROM node:22-alpine AS builder
WORKDIR /app

# Instalar dependencias primero para aprovechar cache de Docker
COPY package.json package-lock.json ./
RUN npm ci

# Build del sitio
COPY . .
RUN npm run build

# ============================================
# Stage 2: nginx sirviendo dist/
# ============================================
FROM nginx:alpine

# Limpiar contenido default de nginx:alpine (index.html welcome, 50x.html)
# antes de copiar nuestro build, para evitar conflictos.
RUN rm -rf /usr/share/nginx/html/*

# Copiar SOLO el build (no el repo completo)
COPY --from=builder /app/dist /usr/share/nginx/html

# Reemplazar el default.conf con nuestra config (reglas SEO)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
