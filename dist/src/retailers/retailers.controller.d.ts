import { RetailersService } from './retailers.service';
import { UpdateRetailerDto, RetailerQueryDto } from './dto/retailer.dto';
export declare class RetailersController {
    private retailersService;
    constructor(retailersService: RetailersService);
    findAll(req: any, query: RetailerQueryDto): Promise<{}>;
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
    update(uid: string, data: UpdateRetailerDto): Promise<{
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
