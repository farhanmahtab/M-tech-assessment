import { Role } from '@prisma/client';
export declare class CreateRegionDto {
    name: string;
}
declare const UpdateRegionDto_base: import("@nestjs/common").Type<Partial<CreateRegionDto>>;
export declare class UpdateRegionDto extends UpdateRegionDto_base {
}
export declare class CreateAreaDto {
    name: string;
    regionId: number;
}
declare const UpdateAreaDto_base: import("@nestjs/common").Type<Partial<CreateAreaDto>>;
export declare class UpdateAreaDto extends UpdateAreaDto_base {
}
export declare class CreateTerritoryDto {
    name: string;
    areaId: number;
}
declare const UpdateTerritoryDto_base: import("@nestjs/common").Type<Partial<CreateTerritoryDto>>;
export declare class UpdateTerritoryDto extends UpdateTerritoryDto_base {
}
export declare class CreateDistributorDto {
    name: string;
}
declare const UpdateDistributorDto_base: import("@nestjs/common").Type<Partial<CreateDistributorDto>>;
export declare class UpdateDistributorDto extends UpdateDistributorDto_base {
}
export declare class CreateUserDto {
    username: string;
    password: string;
    name: string;
    phone?: string;
    role?: Role;
}
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
}
export declare class BulkAssignDto {
    salesRepId: number;
    retailerIds: number[];
}
export {};
