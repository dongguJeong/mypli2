# -----------------------------
# 1) Dependencies Stage
# -----------------------------
FROM node:20-bullseye-slim AS deps

WORKDIR /app

# pnpm 활성화
RUN corepack enable && corepack prepare pnpm@latest --activate

# package.json과 lock 파일만 먼저 복사 (캐시 최적화)
COPY apps/web/package.json apps/web/pnpm-lock.yaml ./

# 의존성 설치 (lock 파일 변경시에만 재실행)
RUN pnpm install --frozen-lockfile

# -----------------------------
# 2) Builder Stage
# -----------------------------
FROM node:20-bullseye-slim AS builder

WORKDIR /app

RUN corepack enable

# deps 스테이지에서 node_modules 복사
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./

# 소스 코드 복사
COPY apps/web ./

# 빌드
RUN pnpm build

# -----------------------------
# 3) Nginx Runtime Stage
# -----------------------------
FROM nginx:alpine AS runner

# 우리가 만든 SPA용 설정으로 default.conf 덮어쓰기
COPY infra/nginx/web-conf/web.conf /etc/nginx/conf.d/default.conf

# 빌드된 정적 파일만 복사
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]