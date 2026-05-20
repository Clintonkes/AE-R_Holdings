#!/bin/bash
# Monolithic startup — runs FastAPI (port 8000) and Next.js (PORT) in parallel.
# Uses bash so process-management builtins work on Debian-based runners.

NEXT_PORT=${PORT:-3000}
API_PORT=8000

echo "Starting AE\$R Holdings API on port $API_PORT..."
uvicorn api.main:app --host 0.0.0.0 --port "$API_PORT" &
API_PID=$!

echo "Starting AE\$R Holdings frontend on port $NEXT_PORT..."
PORT=$NEXT_PORT node server.js &
FRONTEND_PID=$!

# Trap SIGTERM/SIGINT and forward to both children
cleanup() {
  kill "$API_PID" "$FRONTEND_PID" 2>/dev/null
  wait "$API_PID" "$FRONTEND_PID" 2>/dev/null
}
trap cleanup TERM INT

# Wait for either process to exit; restart container if either dies
wait "$API_PID" "$FRONTEND_PID"
