# ── Stage 1: Build Next.js frontend ──────────────────────────────────────────
FROM node:20-alpine AS frontend-builder
WORKDIR /build

COPY package.json package-lock.json ./
RUN npm ci

COPY app ./app
COPY components ./components
COPY lib ./lib
COPY public ./public
COPY next.config.mjs tailwind.config.ts tsconfig.json postcss.config.mjs .eslintrc.json ./

ARG NEXT_PUBLIC_API_URL=http://localhost:8000
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ── Stage 2: Final monolithic image ──────────────────────────────────────────
FROM python:3.11-slim AS runner

# Install bash, Node.js 20
RUN apt-get update && apt-get install -y curl bash && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Python deps
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Python source
COPY api ./api
COPY seed.py .

# Built Next.js (standalone output)
COPY --from=frontend-builder /build/.next/standalone ./
COPY --from=frontend-builder /build/.next/static ./.next/static
COPY --from=frontend-builder /build/public ./public

# Startup script
COPY start.sh .
RUN chmod +x start.sh

EXPOSE 3000 8000

CMD ["./start.sh"]
