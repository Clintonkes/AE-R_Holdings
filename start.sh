#!/bin/bash
set -e

echo "=== AE\$R Holdings startup ==="
echo "  Working dir : $(pwd)"
echo "  Node        : $(node --version 2>/dev/null || echo 'NOT FOUND')"
echo "  Python      : $(python3 --version 2>/dev/null || echo 'NOT FOUND')"
echo "  PORT env    : ${PORT:-<not set>}"
echo "  DATABASE_URL: ${DATABASE_URL:0:30}..."
echo ""

# FastAPI runs on a fixed internal port (never conflicts with Railway PORT)
API_PORT=8001

# Next.js must listen on the port Railway exposes.
# Railway sets PORT; its networking is also configured to port 8000.
# Default to 8000 so we match Railway's setting even if PORT is unset.
NEXT_PORT=${PORT:-8000}

echo "--- Starting FastAPI on 0.0.0.0:$API_PORT ---"
uvicorn api.main:app --host 0.0.0.0 --port "$API_PORT" &
API_PID=$!

# Kill uvicorn when this script exits
trap 'echo "Shutting down..."; kill "$API_PID" 2>/dev/null; wait "$API_PID" 2>/dev/null' EXIT TERM INT

# Give uvicorn a moment to start before Next.js tries its first rewrite
sleep 2

echo "--- Starting Next.js on 0.0.0.0:$NEXT_PORT ---"
echo "  server.js exists: $(test -f server.js && echo YES || echo NO)"
echo "  .next dir exists: $(test -d .next && echo YES || echo NO)"

# Replace shell with node (foreground — container lives as long as Next.js lives)
HOSTNAME=0.0.0.0 PORT=$NEXT_PORT exec node server.js
