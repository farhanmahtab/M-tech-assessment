import { PrismaService } from '../prisma/prisma.service';
import type { Cache } from 'cache-manager';
export declare class RetailersService {
    private prisma;
    private cacheManager;
    constructor(prisma: PrismaService, cacheManager: Cache);
    findAllAssigned(salesRepId: number, query: {
        page?: number;
        limit?: number;
        search?: string;
        regionId?: number;
        areaId?: number;
        distributorId?: number;
        territoryId?: number;
    }): Promise<{}>;
    findOne(uid: string): Promise<({
        area: {
            id: number;
            name: string;
            regionId: number;
        };
        distributor: {
            id: number;
            name: string;
        };
        territory: {
            id: number;
            name: string;
            areaId: number;
        };
    } & {
        id: number;
        uid: string;
        name: string;
        phone: string;
        regionId: number;
        areaId: number;
        distributorId: number;
        territoryId: number;
        points: number;
        routes: string | null;
        notes: string | null;
        updatedAt: Date;
    }) | null>;
    update(uid: string, data: {
        points?: number;
        routes?: string;
        notes?: string;
    }): Promise<{
        salesRepRetailers: {
            salesRepId: number;
            retailerId: number;
            assignedAt: Date;
        }[];
    } & {
        id: number;
        uid: string;
        name: string;
        phone: string;
        regionId: number;
        areaId: number;
        distributorId: number;
        territoryId: number;
        points: number;
        routes: string | null;
        notes: string | null;
        updatedAt: Date;
    }>;
}
