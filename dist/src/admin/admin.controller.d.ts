import { AdminService } from './admin.service';
import { CreateRegionDto, CreateAreaDto, BulkAssignDto, CreateTerritoryDto, CreateDistributorDto } from './dto/admin.dto';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    createRegion(data: CreateRegionDto): Promise<{
        name: string;
        id: number;
    }>;
    createArea(data: CreateAreaDto): Promise<{
        name: string;
        regionId: number;
        id: number;
    }>;
    createTerritory(data: CreateTerritoryDto): Promise<{
        name: string;
        areaId: number;
        id: number;
    }>;
    createDistributor(data: CreateDistributorDto): Promise<{
        name: string;
        id: number;
    }>;
    importRetailers(file: Express.Multer.File): Promise<any[]>;
    bulkAssign(bulkAssignDto: BulkAssignDto): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
