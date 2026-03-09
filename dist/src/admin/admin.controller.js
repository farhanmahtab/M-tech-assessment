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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_guard_2 = require("../auth/roles.guard");
const client_1 = require("@prisma/client");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const admin_dto_1 = require("./dto/admin.dto");
let AdminController = class AdminController {
    adminService;
    constructor(adminService) {
        this.adminService = adminService;
    }
    async createRegion(data) {
        return this.adminService.createRegion(data);
    }
    async createArea(data) {
        return this.adminService.createArea(data);
    }
    async createTerritory(data) {
        return this.adminService.createTerritory(data);
    }
    async createDistributor(data) {
        return this.adminService.createDistributor(data);
    }
    async importRetailers(file) {
        return this.adminService.importRetailersContent(file.buffer);
    }
    async bulkAssign(bulkAssignDto) {
        return this.adminService.bulkAssign(bulkAssignDto.salesRepId, bulkAssignDto.retailerIds);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Post)('regions'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new region' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Region created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.CreateRegionDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createRegion", null);
__decorate([
    (0, common_1.Post)('areas'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new area' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Area created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.CreateAreaDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createArea", null);
__decorate([
    (0, common_1.Post)('territories'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new territory' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Territory created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.CreateTerritoryDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createTerritory", null);
__decorate([
    (0, common_1.Post)('distributors'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new distributor' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Distributor created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.CreateDistributorDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createDistributor", null);
__decorate([
    (0, common_1.Post)('retailers/import'),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk import retailers via CSV' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: { type: 'string', format: 'binary' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Retailers imported successfully' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "importRetailers", null);
__decorate([
    (0, common_1.Post)('assignments/bulk'),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk assign retailers to a sales rep' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Retailers assigned successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.BulkAssignDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "bulkAssign", null);
exports.AdminController = AdminController = __decorate([
    (0, swagger_1.ApiTags)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_guard_2.Roles)(client_1.Role.ADMIN),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map