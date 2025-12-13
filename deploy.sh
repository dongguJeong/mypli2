#!/bin/bash
set -e

PROJECT_DIR="/home/donggu/mypli2"
cd "$PROJECT_DIR"

echo "===== [0] Stop existing containers ====="
docker compose down --remove-orphans

echo "===== [1] Pull latest source ====="
git pull

echo "===== [2] Pull Docker images ====="
docker compose pull

echo "===== [3] Start essential services (DB, Redis) ====="
docker compose up -d db redis

echo "===== [4] Start API (for migrations) ====="
docker compose up -d api

echo "===== [5] Run DB migrations (production) ====="
docker compose exec api npm run migration:run:prod

echo "===== [6] Start all services ====="
docker compose up -d 

echo "===== Deployment Completed ====="
