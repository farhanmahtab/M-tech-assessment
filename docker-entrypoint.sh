#!/bin/sh

# wait loop removed, handled by docker-compose healthchecks

# Sync database schema
echo "Syncing database schema..."
npx prisma db push --skip-generate

# Seed database (uncomment if you want to seed on every start or first start)
# echo "Seeding database..."
# npx prisma db seed

# Start the application
echo "Starting application..."
npm run start:prod
