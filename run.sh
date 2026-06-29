#!/usr/bin/env bash
set -e

echo "[run.sh] Starting fintech full-stack environment with docker-compose..."
cd /root/task

docker-compose -f docker-compose.yml up -d

echo "[run.sh] Waiting for MongoDB to be ready on port 27017..."
until nc -z localhost 27017 >/dev/null 2>&1; do
  echo "[run.sh] MongoDB not ready yet, retrying in 3 seconds..."
  sleep 3
done

echo "[run.sh] MongoDB is accepting connections. Waiting a bit for initialization scripts..."
sleep 10

echo "[run.sh] Waiting for backend service on http://localhost:5000/health ..."
until curl -sSf http://localhost:5000/health >/dev/null 2>&1; do
  echo "[run.sh] Backend not ready yet, retrying in 3 seconds..."
  sleep 3
done

echo "[run.sh] Backend is healthy. Waiting for frontend service on http://localhost:3000 ..."
until curl -sSf http://localhost:3000 >/dev/null 2>&1; do
  echo "[run.sh] Frontend not ready yet, retrying in 3 seconds..."
  sleep 5
done

echo "[run.sh] All services are up and responding. Fintech MERN environment is ready."
