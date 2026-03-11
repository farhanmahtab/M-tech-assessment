# Startup Guide - Retailer Sales Representative App

This document provides step-by-step instructions to get the backend application up and running from scratch.

## 1. Prerequisites
Ensure you have the following installed on your machine:
- **Node.js**: Version 18 or higher (using `node -v` to check).
- **Docker & Docker Compose**: To run PostgreSQL and Redis.
- **npm**: Node package manager.

## 2. Initial Setup

### Step 1: Clone and Install
```bash
git clone <repository-url>
cd retailer-sales-rep-backend
npm install
```

### Step 2: Environment Configuration
Create a `.env` file in the root directory. You can use the following template:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/retailer_db?schema=public"
REDIS_HOST="localhost"
REDIS_PORT=6379
JWT_SECRET="your-super-secret-key"
PORT=3000
```

### Step 3: Start Infrastructure
Launch the database and caching services using Docker:
```bash
docker-compose up -d
```

## 3. Database Initialization

### Step 1: Run Migrations
Synchronize the database schema with the Prisma model:
```bash
npx prisma migrate dev --name init
```

### Step 2: Seed the Database
Populate the database with initial master data and test users:
```bash
npx prisma db seed
```
This will create:
- **Admin**: username `admin`, password `password`
- **Sales Rep**: username `sr1`, password `password`
- Sample Region, Area, Territory, and Distributor.

## 4. Running the Application

### Development Mode (with hot-reload)
```bash
npm run start:dev
```

### Production Mode
```bash
npm run build
npm run start:prod
```

## 5. Verification
- **API Docs**: Open `http://localhost:3000/api/docs` in your browser.
- **Health Check**: Try logging in via the `/auth/login` endpoint to get a JWT token.

## Troubleshooting
- **Docker Issues**: If containers fail to start, ensure no other service is using ports `5432` (Postgres) or `6379` (Redis).
- **Prisma Issues**: If you change the `schema.prisma` file, run `npx prisma generate` to update the client.
