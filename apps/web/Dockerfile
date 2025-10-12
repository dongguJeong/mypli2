# 1단계: React 빌드
FROM node:20 AS build

WORKDIR /app
COPY package*.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install

COPY . .
RUN pnpm build

# 2단계: Nginx로 정적 파일 제공
FROM nginx:1.25-alpine

COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
