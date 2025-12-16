# Base 이미지 스테이지 추가
FROM node:20-bullseye-slim AS base

# 빌드 툴을 base 이미지에 설치
RUN apt-get update && \
    apt-get install -y python3 make g++ && \
    rm -rf /var/lib/apt/lists/*

RUN corepack enable && corepack prepare pnpm@latest --activate

# deps 스테이지에서 base 사용
FROM base AS deps

WORKDIR /usr/src/app

# package.json과 lock 파일만 먼저 복사 (캐시 최적화)
COPY apps/api/package.json apps/api/pnpm-lock.yaml ./

# Docker 레이어 캐시 활용
RUN pnpm install --frozen-lockfile

# 빌드 스테이지도 base 사용
FROM base AS builder

WORKDIR /usr/src/app

# deps 스테이지에서 node_modules 복사
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=deps /usr/src/app/package.json ./

# 소스 코드 복사
COPY apps/api ./

# 빌드
RUN pnpm run build

# 프로덕션 스테이지
FROM node:20-bullseye-slim AS runner

WORKDIR /usr/src/app

ENV NODE_ENV=production

RUN corepack enable

# 필요한 파일만 복사 (최소 이미지 크기)
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./

EXPOSE 3000

CMD ["node", "dist/main.js"]