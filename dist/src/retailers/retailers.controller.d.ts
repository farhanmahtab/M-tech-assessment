import { RetailersService } from './retailers.service';
import { UpdateRetailerDto, RetailerQueryDto } from './dto/retailer.dto';
export declare class RetailersController {
    private retailersService;
    constructor(retailersService: RetailersService);
    findAll(req: any, query: RetailerQueryDto): Promise<{}>;
    findOne(uid: string): Promise<({
        area: {
            name: string;
            regionId: number;
            id: number;
        };
        territory: {
            name: string;
            areaId: number;
            id: number;
        };
        distributor: {
            name: string;
            id: number;
        };
    } & {
        name: string;
        regionId: number;
        areaId: number;
        points: number;
        routes: string | null;
        notes: string | null;
        distributorId: number;
        territoryId: number;
        id: number;
        uid: string;
        phone: string;
        updatedAt: Date;
    }) | null>;
    update(uid: string, data: UpdateRetailerDto): Promise<{
        salesRepRetailers: {
            salesRepId: number;
            retailerId: number;
            assignedAt: Date;
        }[];
    } & {
        name: string;
        regionId: number;
        areaId: number;
        points: number;
        routes: string | null;
        notes: string | null;
        distributorId: number;
        territoryId: number;
        id: number;
        uid: string;
        phone: string;
        updatedAt: Date;
    }>;
}
