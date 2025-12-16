# -----------------------------
# 1️⃣ Base (pnpm + build tools 캐시)
# -----------------------------
FROM node:20-bullseye-slim AS base

WORKDIR /usr/src/app

# 빌드에 필요한 툴 (거의 안 바뀜 → 캐시됨)
RUN apt-get update && \
    apt-get install -y python3 make g++ && \
    rm -rf /var/lib/apt/lists/*

# pnpm (버전 고정 권장)
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate


# -----------------------------
# 2️⃣ deps (의존성 캐시)
# -----------------------------
FROM base AS deps

# package.json / lockfile만 복사 (여기가 캐시 핵심)
COPY apps/api/package.json apps/api/pnpm-lock.yaml ./

# pnpm store 캐시
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile


# -----------------------------
# 3️⃣ build (소스 변경 시만 다시 빌드)
# -----------------------------
FROM base AS build

# node_modules 재사용
COPY --from=deps /usr/src/app/node_modules ./node_modules

# 소스 복사 (자주 바뀜)
COPY apps/api ./

# Nest build
RUN pnpm run build


# -----------------------------
# 4️⃣ runtime (가볍게)
# -----------------------------
FROM node:20-bullseye-slim AS runtime

WORKDIR /usr/src/app

# 런타임에 필요한 것만
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY apps/api/package.json ./

CMD ["node", "dist/main.js"]
