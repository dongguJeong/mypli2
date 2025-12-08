# -----------------------------
# 1) Builder Stage(ARM64-friendly)
# -----------------------------


FROM node:20-bullseye-slim AS builder

RUN corepack enable

# 작업 디렉토리 설정 (중요!)
WORKDIR /app

# web 폴더 안의 package.json / pnpm-lock.yaml 사용
COPY apps/web/package.json apps/web/pnpm-lock.yaml ./


# 의존성 설치
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# 나머지 소스 복사
COPY apps/web ./

# 빌드
RUN pnpm build

# -----------------------------
# 2) Nginx Runtime Stage
# -----------------------------
FROM nginx:alpine

# 우리가 만든 SPA용 설정으로 default.conf 덮어쓰기
COPY infra/nginx/conf.d/web.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]