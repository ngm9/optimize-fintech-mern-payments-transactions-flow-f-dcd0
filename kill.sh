#!/usr/bin/env bash
set -e

echo "[kill.sh] Starting full cleanup of fintech task environment..."

# Stop and remove containers, networks, and named volumes for this compose project
echo "[kill.sh] Stopping and removing docker-compose resources..."
docker-compose -f /root/task/docker-compose.yml down --volumes --remove-orphans || true

# Remove any images related to this task (best-effort)
echo "[kill.sh] Attempting to remove fintech-related Docker images..."
for image in fintech-backend fintech-frontend fintech-mongo; do
  docker rmi "$image" -f || true
done

# Global prune (dangling containers, images, networks, volumes)
echo "[kill.sh] Running docker system prune (this may take a while)..."
docker system prune -a --volumes -f || true

# Remove task directory
echo "[kill.sh] Removing /root/task directory..."
rm -rf /root/task || true

echo "[kill.sh] Cleanup completed successfully! Droplet is now clean."
