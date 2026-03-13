import { RetailersService } from './retailers.service';
import { UpdateRetailerDto, RetailerQueryDto } from './dto/retailer.dto';
export declare class RetailersController {
    private retailersService;
    constructor(retailersService: RetailersService);
    findAll(req: any, query: RetailerQueryDto): Promise<any>;
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
    update(uid: string, data: UpdateRetailerDto): Promise<{
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
