#!/bin/bash

# Start Backend
echo "Starting Backend..."
cd server
npm run dev &
SERVER_PID=$!

# Wait a bit for backend to initialize
sleep 5

# Start Frontend
echo "Starting Frontend..."
cd ../client
npm run dev

# Cleanup on exit
trap "kill $SERVER_PID" EXIT
