import { PrismaService } from '../prisma/prisma.service';
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    createRegion(data: {
        name: string;
    }): Promise<{
        id: number;
        name: string;
    }>;
    createArea(data: {
        name: string;
        regionId: number;
    }): Promise<{
        id: number;
        name: string;
        regionId: number;
    }>;
    createTerritory(data: {
        name: string;
        areaId: number;
    }): Promise<{
        id: number;
        name: string;
        areaId: number;
    }>;
    createDistributor(data: {
        name: string;
    }): Promise<{
        id: number;
        name: string;
    }>;
    importRetailersContent(fileBuffer: Buffer): Promise<any[]>;
    bulkAssign(salesRepId: number, retailerIds: number[]): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
