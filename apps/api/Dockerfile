FROM node:20-alpine

WORKDIR /usr/src/app

# pnpm 설치 (이미 쓰고 있으면)
RUN corepack enable

# 루트 package.json / pnpm-lock.yaml 복사
COPY package.json pnpm-lock.yaml ./

# 의존성 설치
RUN pnpm install --prod=false

# Nest 소스 복사
COPY . .

# 빌드
RUN pnpm run build

# 앱 실행
CMD ["node", "dist/main.js"]
