#!/bin/sh

# Wait for DB to be ready
echo "Waiting for database to be ready..."
while ! nc -z db 5432; do
  sleep 1
done
echo "Database is up!"

# Sync database schema
echo "Syncing database schema..."
npx prisma db push --skip-generate

# Seed database (uncomment if you want to seed on every start or first start)
# echo "Seeding database..."
# npx prisma db seed

# Start the application
echo "Starting application..."
npm run start:prod
