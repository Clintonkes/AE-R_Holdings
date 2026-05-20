#!/bin/bash
# Monolithic startup:
#   - FastAPI runs on API_PORT (default 8001) — internal only.
#   - Next.js runs on PORT (Railway's public port) — externally exposed.
#   - Next.js rewrites /api/* → FastAPI internally, so only one port is public.

API_PORT=${API_PORT:-8001}
NEXT_PORT=${PORT:-3000}

echo "Starting AE\$R Holdings API on internal port $API_PORT..."
uvicorn api.main:app --host 0.0.0.0 --port "$API_PORT" &
API_PID=$!

trap 'kill "$API_PID" 2>/dev/null; wait "$API_PID" 2>/dev/null' EXIT TERM INT

echo "Starting AE\$R Holdings frontend on port $NEXT_PORT..."
API_PORT=$API_PORT HOSTNAME=0.0.0.0 PORT=$NEXT_PORT exec node server.js
