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
exports.RetailerQueryDto = exports.UpdateRetailerDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateRetailerDto {
    points;
    routes;
    notes;
}
exports.UpdateRetailerDto = UpdateRetailerDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 100,
        description: 'Reward points for the retailer',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateRetailerDto.prototype, "points", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Route A, Route B',
        description: 'Assigned routes',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateRetailerDto.prototype, "routes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Busy during mornings',
        description: 'Notes about the retailer',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateRetailerDto.prototype, "notes", void 0);
class RetailerQueryDto {
    page;
    limit;
    search;
    regionId;
    areaId;
    distributorId;
    territoryId;
}
exports.RetailerQueryDto = RetailerQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: 'Page number' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], RetailerQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 10, description: 'Items per page' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], RetailerQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'search term',
        description: 'Search by name, UID, or phone',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RetailerQueryDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: 'Filter by Region ID' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], RetailerQueryDto.prototype, "regionId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: 'Filter by Area ID' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], RetailerQueryDto.prototype, "areaId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: 'Filter by Distributor ID' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], RetailerQueryDto.prototype, "distributorId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: 'Filter by Territory ID' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], RetailerQueryDto.prototype, "territoryId", void 0);
//# sourceMappingURL=retailer.dto.js.map