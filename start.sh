#!/bin/bash
# Monolithic startup — FastAPI in background, Next.js in foreground.
# Container lifecycle is tied to Next.js (the foreground process).

API_PORT=8000
NEXT_PORT=${PORT:-3000}

# Start FastAPI in the background
echo "Starting AE\$R Holdings API on port $API_PORT..."
uvicorn api.main:app --host 0.0.0.0 --port "$API_PORT" &
API_PID=$!

# Kill uvicorn when this script exits (Next.js died or SIGTERM received)
trap 'kill "$API_PID" 2>/dev/null; wait "$API_PID" 2>/dev/null' EXIT TERM INT

# Start Next.js in the foreground — binding explicitly to 0.0.0.0
echo "Starting AE\$R Holdings frontend on port $NEXT_PORT..."
HOSTNAME=0.0.0.0 PORT=$NEXT_PORT exec node server.js
