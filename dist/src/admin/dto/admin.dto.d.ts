export declare class CreateRegionDto {
    name: string;
}
export declare class CreateAreaDto {
    name: string;
    regionId: number;
}
export declare class CreateTerritoryDto {
    name: string;
    areaId: number;
}
export declare class CreateDistributorDto {
    name: string;
}
export declare class BulkAssignDto {
    salesRepId: number;
    retailerIds: number[];
}
