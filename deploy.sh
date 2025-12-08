#!/bin/bash
set -e

PROJECT_DIR="/home/donggu/mypli2"
cd "$PROJECT_DIR"

echo "===== [1] Pull latest source ====="
git pull

echo "===== [2] Pull Docker images ====="
docker compose pull

echo "===== [3] Start essential services (DB, Redis) ====="
docker compose up -d db redis

echo "===== [4] Run DB migrations (production) ====="
docker compose run --rm api npm run migration:run:prod

echo "===== [5] Start all services ====="
docker compose up -d --remove-orphans

echo "===== Deployment Completed ====="
