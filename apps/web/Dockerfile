# -----------------------------
# 1) Builder Stage
# -----------------------------

FROM node:20-alpine AS builder

RUN corepack enable

# 작업 디렉토리 설정 (중요!)
WORKDIR /app

# web 폴더 안의 package.json / pnpm-lock.yaml 사용
COPY apps/web/package.json apps/web/pnpm-lock.yaml ./

# 의존성 설치
RUN pnpm install --frozen-lockfile

# 나머지 소스 복사
COPY apps/web .

# 빌드
RUN pnpm build

# -----------------------------
# 2) Nginx Runtime Stage
# -----------------------------
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]