#!/bin/sh
# Monolithic startup — runs FastAPI backend and Next.js frontend in parallel.
# In production (Railway), set PORT for Next.js; backend always on 8000.

NEXT_PORT=${PORT:-3000}
API_PORT=8000

echo "Starting AE\$R Holdings API on port $API_PORT..."
uvicorn api.main:app --host 0.0.0.0 --port $API_PORT &
API_PID=$!

echo "Starting AE\$R Holdings frontend on port $NEXT_PORT..."
PORT=$NEXT_PORT node server.js &
FRONTEND_PID=$!

# Exit if either process dies
wait -n $API_PID $FRONTEND_PID
exit $?
