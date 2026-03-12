import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class RetailersService implements OnModuleInit {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: any,
  ) {
    console.log('[RetailersService] Cache Manager injected');
  }

  async onModuleInit() {
    try {
        console.log('[RetailersService] Final verification starting...');
        const testKey = 'FINAL_HEARTBEAT';
        await this.cacheManager.set(testKey, 'SUCCESS', 60000);
        const val = await this.cacheManager.get(testKey);
        console.log(`[RetailersService] Final Read-back: ${val}`);
    } catch (e) {
        console.error('[RetailersService] Final test error:', e.message);
    }
  }

  async findAllAssigned(
    salesRepId: number,
    query: {
      page?: number;
      limit?: number;
      search?: string;
      regionId?: number;
      areaId?: number;
      distributorId?: number;
      territoryId?: number;
    },
  ) {
    const cacheKey = `sr:${salesRepId}:page:${query.page || 1}:limit:${query.limit || 10}:search:${query.search || 'none'}`;
    
    try {
      const cachedData = await this.cacheManager.get(cacheKey);
      if (cachedData) {
        console.log(`[Cache-Verified] Hit: ${cacheKey}`);
        return cachedData;
      }
    } catch (e) {
      console.error(`[Cache-Verified] Error reading: ${e.message}`);
    }

    console.log(`[Cache-Verified] Miss: ${cacheKey}`);

    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const where: Prisma.RetailerWhereInput = {
      salesRepRetailers: {
        some: { salesRepId },
      },
    };

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { uid: { contains: query.search, mode: 'insensitive' } },
        { phone: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    if (query.regionId) where.regionId = query.regionId;
    if (query.areaId) where.areaId = query.areaId;
    if (query.distributorId) where.distributorId = query.distributorId;
    if (query.territoryId) where.territoryId = query.territoryId;

    const [total, data] = await Promise.all([
      this.prisma.retailer.count({ where }),
      this.prisma.retailer.findMany({
        where,
        skip,
        take: limit,
        include: {
          area: true,
          territory: true,
          distributor: true,
        },
      }),
    ]);

    const result = {
      data,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };

    try {
      // Direct call to Keyv set
      await this.cacheManager.set(cacheKey, result, 60000); 
      console.log(`[Cache-Verified] SET confirmed in Redis: ${cacheKey}`);
    } catch (e) {
      console.error(`[Cache-Verified] SET error: ${e.message}`);
    }

    return result;
  }

  async findOne(uid: string) {
    return this.prisma.retailer.findUnique({
      where: { uid },
      include: {
        area: true,
        territory: true,
        distributor: true,
      },
    });
  }

  async update(
    uid: string,
    data: { points?: number; routes?: string; notes?: string },
  ) {
    const retailer = await this.prisma.retailer.update({
      where: { uid },
      data,
      include: { salesRepRetailers: true },
    });
    return retailer;
  }
}
