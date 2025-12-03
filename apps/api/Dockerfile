FROM node:20-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache python3 make g++ linux-headers
RUN corepack enable && corepack prepare pnpm@latest --activate

# api 폴더 안의 package.json / pnpm-lock.yaml 복사
COPY apps/api/package.json apps/api/pnpm-lock.yaml ./

# 의존성 설치
RUN pnpm install --frozen-lockfile

# Nest 소스 복사
COPY apps/api ./

# 빌드
RUN pnpm run build

# 앱 실행
CMD ["node", "dist/main.js"]
