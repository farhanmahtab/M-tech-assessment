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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetailersController = void 0;
const common_1 = require("@nestjs/common");
const retailers_service_1 = require("./retailers.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_guard_2 = require("../auth/roles.guard");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
const retailer_dto_1 = require("./dto/retailer.dto");
let RetailersController = class RetailersController {
    retailersService;
    constructor(retailersService) {
        this.retailersService = retailersService;
    }
    async findAll(req, query) {
        const filters = {
            ...query,
            page: query.page ? Number(query.page) : 1,
            limit: query.limit ? Number(query.limit) : 10,
            regionId: query.regionId ? Number(query.regionId) : undefined,
            areaId: query.areaId ? Number(query.areaId) : undefined,
            distributorId: query.distributorId
                ? Number(query.distributorId)
                : undefined,
            territoryId: query.territoryId ? Number(query.territoryId) : undefined,
        };
        return this.retailersService.findAllAssigned(req.user.userId, filters);
    }
    async findOne(uid) {
        return this.retailersService.findOne(uid);
    }
    async update(uid, data) {
        return this.retailersService.update(uid, data);
    }
};
exports.RetailersController = RetailersController;
__decorate([
    (0, roles_guard_2.Roles)(client_1.Role.SALES_REP),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get paginated assigned retailers for the current SR',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of assigned retailers returned successfully',
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, retailer_dto_1.RetailerQueryDto]),
    __metadata("design:returntype", Promise)
], RetailersController.prototype, "findAll", null);
__decorate([
    (0, roles_guard_2.Roles)(client_1.Role.SALES_REP, client_1.Role.ADMIN),
    (0, common_1.Get)(':uid'),
    (0, swagger_1.ApiOperation)({ summary: 'Get retailer details by UID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Retailer details returned successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Retailer not found' }),
    __param(0, (0, common_1.Param)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RetailersController.prototype, "findOne", null);
__decorate([
    (0, roles_guard_2.Roles)(client_1.Role.SALES_REP),
    (0, common_1.Patch)(':uid'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update allowed fields for a retailer (Points, Routes, Notes)',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retailer updated successfully' }),
    __param(0, (0, common_1.Param)('uid')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, retailer_dto_1.UpdateRetailerDto]),
    __metadata("design:returntype", Promise)
], RetailersController.prototype, "update", null);
exports.RetailersController = RetailersController = __decorate([
    (0, swagger_1.ApiTags)('retailers'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('retailers'),
    __metadata("design:paramtypes", [retailers_service_1.RetailersService])
], RetailersController);
//# sourceMappingURL=retailers.controller.js.map