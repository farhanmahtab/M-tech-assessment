import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto, UpdateRegionDto, UpdateAreaDto, UpdateTerritoryDto, UpdateDistributorDto } from './dto/admin.dto';
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    findAllRegions(): Promise<({
        areas: {
            id: number;
            name: string;
            regionId: number;
        }[];
    } & {
        id: number;
        name: string;
    })[]>;
    findOneRegion(id: number): Promise<{
        areas: {
            id: number;
            name: string;
            regionId: number;
        }[];
    } & {
        id: number;
        name: string;
    }>;
    createRegion(data: {
        name: string;
    }): Promise<{
        id: number;
        name: string;
    }>;
    updateRegion(id: number, data: UpdateRegionDto): Promise<{
        id: number;
        name: string;
    }>;
    deleteRegion(id: number): Promise<{
        id: number;
        name: string;
    }>;
    findAllAreas(): Promise<({
        region: {
            id: number;
            name: string;
        };
    } & {
        id: number;
        name: string;
        regionId: number;
    })[]>;
    findOneArea(id: number): Promise<{
        region: {
            id: number;
            name: string;
        };
        territories: {
            id: number;
            name: string;
            areaId: number;
        }[];
    } & {
        id: number;
        name: string;
        regionId: number;
    }>;
    createArea(data: {
        name: string;
        regionId: number;
    }): Promise<{
        id: number;
        name: string;
        regionId: number;
    }>;
    updateArea(id: number, data: UpdateAreaDto): Promise<{
        id: number;
        name: string;
        regionId: number;
    }>;
    deleteArea(id: number): Promise<{
        id: number;
        name: string;
        regionId: number;
    }>;
    findAllTerritories(): Promise<({
        area: {
            id: number;
            name: string;
            regionId: number;
        };
    } & {
        id: number;
        name: string;
        areaId: number;
    })[]>;
    findOneTerritory(id: number): Promise<{
        retailers: {
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
        }[];
        area: {
            id: number;
            name: string;
            regionId: number;
        };
    } & {
        id: number;
        name: string;
        areaId: number;
    }>;
    createTerritory(data: {
        name: string;
        areaId: number;
    }): Promise<{
        id: number;
        name: string;
        areaId: number;
    }>;
    updateTerritory(id: number, data: UpdateTerritoryDto): Promise<{
        id: number;
        name: string;
        areaId: number;
    }>;
    deleteTerritory(id: number): Promise<{
        id: number;
        name: string;
        areaId: number;
    }>;
    findAllDistributors(): Promise<{
        id: number;
        name: string;
    }[]>;
    findOneDistributor(id: number): Promise<{
        id: number;
        name: string;
    }>;
    createDistributor(data: {
        name: string;
    }): Promise<{
        id: number;
        name: string;
    }>;
    updateDistributor(id: number, data: UpdateDistributorDto): Promise<{
        id: number;
        name: string;
    }>;
    deleteDistributor(id: number): Promise<{
        id: number;
        name: string;
    }>;
    findAllUsers(): Promise<{
        id: number;
        username: string;
        name: string;
        phone: string | null;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
    }[]>;
    findOneUser(id: number): Promise<{
        salesRepRetailers: {
            assignedAt: Date;
            retailerId: number;
            salesRepId: number;
        }[];
        id: number;
        username: string;
        name: string;
        phone: string | null;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createUser(data: CreateUserDto): Promise<{
        id: number;
        username: string;
        passwordHash: string;
        name: string;
        phone: string | null;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateUser(id: number, data: UpdateUserDto): Promise<{
        id: number;
        username: string;
        passwordHash: string;
        name: string;
        phone: string | null;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteUser(id: number): Promise<{
        id: number;
        username: string;
        passwordHash: string;
        name: string;
        phone: string | null;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    importRetailersContent(fileBuffer: Buffer): Promise<any[]>;
    bulkAssign(salesRepId: number, retailerIds: number[]): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
