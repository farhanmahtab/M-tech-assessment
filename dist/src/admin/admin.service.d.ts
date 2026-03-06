import { PrismaService } from '../prisma/prisma.service';
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    createRegion(data: {
        name: string;
    }): Promise<{
        name: string;
        id: number;
    }>;
    createArea(data: {
        name: string;
        regionId: number;
    }): Promise<{
        name: string;
        id: number;
        regionId: number;
    }>;
    createTerritory(data: {
        name: string;
        areaId: number;
    }): Promise<{
        name: string;
        id: number;
        areaId: number;
    }>;
    createDistributor(data: {
        name: string;
    }): Promise<{
        name: string;
        id: number;
    }>;
    importRetailersContent(fileBuffer: Buffer): Promise<any[]>;
    bulkAssign(salesRepId: number, retailerIds: number[]): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
