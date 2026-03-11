import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('password', 10);

  // Create Admin
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      passwordHash,
      name: 'System Admin',
      role: Role.ADMIN,
    },
  });

  // Create Sales Rep
  await prisma.user.upsert({
    where: { username: 'sr1' },
    update: {},
    create: {
      username: 'sr1',
      passwordHash,
      name: 'Sales Rep 1',
      role: Role.SALES_REP,
    },
  });

  // Master Data
  const region = await prisma.region.upsert({
    where: { name: 'Dhaka' },
    update: {},
    create: { name: 'Dhaka' },
  });

  const area = await prisma.area.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Dhaka North',
      regionId: region.id,
    },
  });

  await prisma.territory.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Mirpur',
      areaId: area.id,
    },
  });

  await prisma.distributor.upsert({
    where: { name: 'Top Distributor' },
    update: {},
    create: { name: 'Top Distributor' },
  });

  console.log('Seed completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
