FROM node:20-bullseye-slim AS deps

WORKDIR /usr/src/app

# 빌드에 필요한 툴 설치
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# pnpm 활성화
RUN corepack enable && corepack prepare pnpm@latest --activate

# package.json과 lock 파일만 먼저 복사 (캐시 최적화)
COPY apps/api/package.json apps/api/pnpm-lock.yaml ./

# 의존성 설치 (lock 파일 변경시에만 재실행)
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# 빌드 스테이지
FROM node:20-bullseye-slim AS builder

WORKDIR /usr/src/app

RUN corepack enable

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

# 프로덕션 의존성만 재설치 (선택사항)
# RUN pnpm prune --prod

EXPOSE 3000

CMD ["node", "dist/main.js"]