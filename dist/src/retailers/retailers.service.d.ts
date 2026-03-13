import { PrismaService } from '../prisma/prisma.service';
export declare class RetailersService {
    private prisma;
    private cacheManager;
    constructor(prisma: PrismaService, cacheManager: any);
    findAllAssigned(salesRepId: number, query: {
        page?: number;
        limit?: number;
        search?: string;
        regionId?: number;
        areaId?: number;
        distributorId?: number;
        territoryId?: number;
    }): Promise<any>;
    findOne(uid: string): Promise<({
        area: {
            id: number;
            name: string;
            regionId: number;
        };
        territory: {
            id: number;
            name: string;
            areaId: number;
        };
        distributor: {
            id: number;
            name: string;
        };
    } & {
        id: number;
        name: string;
        phone: string;
        updatedAt: Date;
        regionId: number;
        areaId: number;
        uid: string;
        distributorId: number;
        territoryId: number;
        points: number;
        routes: string | null;
        notes: string | null;
    }) | null>;
    update(uid: string, data: {
        points?: number;
        routes?: string;
        notes?: string;
    }): Promise<{
        salesRepRetailers: {
            assignedAt: Date;
            retailerId: number;
            salesRepId: number;
        }[];
    } & {
        id: number;
        name: string;
        phone: string;
        updatedAt: Date;
        regionId: number;
        areaId: number;
        uid: string;
        distributorId: number;
        territoryId: number;
        points: number;
        routes: string | null;
        notes: string | null;
    }>;
}
