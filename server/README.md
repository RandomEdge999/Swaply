# Swaply Backend

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Initialize Database (SQLite):
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

3. Run Server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`

### Listings
- `POST /api/listings` (Create)
- `GET /api/listings` (List all)
- `GET /api/listings/:id` (Get one)

### Rentals
- `POST /api/rentals/request`
- `POST /api/rentals/ship`
- `POST /api/rentals/receive`
- `POST /api/rentals/return`
- `POST /api/rentals/confirm`
- `GET /api/rentals/my-rentals`

## Background Jobs
- Late fee calculation runs every minute (for demo purposes).
