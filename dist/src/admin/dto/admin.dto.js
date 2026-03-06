"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulkAssignDto = exports.CreateDistributorDto = exports.CreateTerritoryDto = exports.CreateAreaDto = exports.CreateRegionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateRegionDto {
    name;
}
exports.CreateRegionDto = CreateRegionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Dhaka', description: 'Name of the region' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateRegionDto.prototype, "name", void 0);
class CreateAreaDto {
    name;
    regionId;
}
exports.CreateAreaDto = CreateAreaDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Dhaka North', description: 'Name of the area' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAreaDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID of the parent region' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateAreaDto.prototype, "regionId", void 0);
class CreateTerritoryDto {
    name;
    areaId;
}
exports.CreateTerritoryDto = CreateTerritoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Mirpur', description: 'Name of the territory' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTerritoryDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID of the parent area' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateTerritoryDto.prototype, "areaId", void 0);
class CreateDistributorDto {
    name;
}
exports.CreateDistributorDto = CreateDistributorDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Top Distributor',
        description: 'Name of the distributor',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDistributorDto.prototype, "name", void 0);
class BulkAssignDto {
    salesRepId;
    retailerIds;
}
exports.BulkAssignDto = BulkAssignDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, description: 'ID of the Sales Representative' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], BulkAssignDto.prototype, "salesRepId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [1, 2, 3],
        description: 'List of Retailer IDs to assign',
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], BulkAssignDto.prototype, "retailerIds", void 0);
//# sourceMappingURL=admin.dto.js.map