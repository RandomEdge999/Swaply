# Start Backend in a new window
Start-Process powershell -ArgumentList "cd server; npm run dev"

# Start Frontend in the current window
cd client
npm run dev
