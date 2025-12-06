FROM node:20-bullseye-slim

WORKDIR /usr/src/app

# 빌드에 필요한 툴 설치
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# pnpm 활성화
RUN corepack enable && corepack prepare pnpm@latest --activate

# api 폴더 안의 package.json / pnpm-lock.yaml 복사
COPY apps/api/package.json apps/api/pnpm-lock.yaml ./

# 의존성 설치
# 의존성 설치 (pnpm store를 캐시로 사용)
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile


# Nest 소스 복사
COPY apps/api ./

# 빌드
RUN pnpm run build

# 앱 실행
CMD ["node", "dist/main.js"]
