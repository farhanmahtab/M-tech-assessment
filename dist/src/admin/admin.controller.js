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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_guard_2 = require("../auth/roles.guard");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
const admin_dto_1 = require("./dto/admin.dto");
const busboy_1 = __importDefault(require("busboy"));
let AdminController = class AdminController {
    adminService;
    constructor(adminService) {
        this.adminService = adminService;
    }
    async findAllRegions() {
        return this.adminService.findAllRegions();
    }
    async findOneRegion(id) {
        return this.adminService.findOneRegion(id);
    }
    async createRegion(data) {
        return this.adminService.createRegion(data);
    }
    async updateRegion(id, data) {
        return this.adminService.updateRegion(id, data);
    }
    async deleteRegion(id) {
        return this.adminService.deleteRegion(id);
    }
    async findAllAreas() {
        return this.adminService.findAllAreas();
    }
    async findOneArea(id) {
        return this.adminService.findOneArea(id);
    }
    async createArea(data) {
        return this.adminService.createArea(data);
    }
    async updateArea(id, data) {
        return this.adminService.updateArea(id, data);
    }
    async deleteArea(id) {
        return this.adminService.deleteArea(id);
    }
    async findAllTerritories() {
        return this.adminService.findAllTerritories();
    }
    async findOneTerritory(id) {
        return this.adminService.findOneTerritory(id);
    }
    async createTerritory(data) {
        return this.adminService.createTerritory(data);
    }
    async updateTerritory(id, data) {
        return this.adminService.updateTerritory(id, data);
    }
    async deleteTerritory(id) {
        return this.adminService.deleteTerritory(id);
    }
    async findAllDistributors() {
        return this.adminService.findAllDistributors();
    }
    async findOneDistributor(id) {
        return this.adminService.findOneDistributor(id);
    }
    async createDistributor(data) {
        return this.adminService.createDistributor(data);
    }
    async updateDistributor(id, data) {
        return this.adminService.updateDistributor(id, data);
    }
    async deleteDistributor(id) {
        return this.adminService.deleteDistributor(id);
    }
    async findAllUsers() {
        return this.adminService.findAllUsers();
    }
    async findOneUser(id) {
        return this.adminService.findOneUser(id);
    }
    async createUser(data) {
        return this.adminService.createUser(data);
    }
    async updateUser(id, data) {
        return this.adminService.updateUser(id, data);
    }
    async deleteUser(id) {
        return this.adminService.deleteUser(id);
    }
    async importRetailers(req) {
        const bb = (0, busboy_1.default)({ headers: req.headers });
        return new Promise((resolve, reject) => {
            bb.on('file', (name, file) => {
                if (name === 'file') {
                    this.adminService
                        .importRetailersStream(file)
                        .then(resolve)
                        .catch(reject);
                }
                else {
                    file.resume();
                }
            });
            bb.on('error', reject);
            req.pipe(bb);
        });
    }
    async bulkAssign(bulkAssignDto) {
        return this.adminService.bulkAssign(bulkAssignDto.salesRepId, bulkAssignDto.retailerIds);
    }
    async bulkUnassign(bulkAssignDto) {
        return this.adminService.bulkUnassign(bulkAssignDto.salesRepId, bulkAssignDto.retailerIds);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('regions'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all regions' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "findAllRegions", null);
__decorate([
    (0, common_1.Get)('regions/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a region by ID' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "findOneRegion", null);
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
    (0, common_1.Patch)('regions/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a region' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, admin_dto_1.UpdateRegionDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateRegion", null);
__decorate([
    (0, common_1.Delete)('regions/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a region' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteRegion", null);
__decorate([
    (0, common_1.Get)('areas'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all areas' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "findAllAreas", null);
__decorate([
    (0, common_1.Get)('areas/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get an area by ID' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "findOneArea", null);
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
    (0, common_1.Patch)('areas/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an area' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, admin_dto_1.UpdateAreaDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateArea", null);
__decorate([
    (0, common_1.Delete)('areas/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an area' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteArea", null);
__decorate([
    (0, common_1.Get)('territories'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all territories' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "findAllTerritories", null);
__decorate([
    (0, common_1.Get)('territories/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a territory by ID' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "findOneTerritory", null);
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
    (0, common_1.Patch)('territories/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a territory' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, admin_dto_1.UpdateTerritoryDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateTerritory", null);
__decorate([
    (0, common_1.Delete)('territories/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a territory' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteTerritory", null);
__decorate([
    (0, common_1.Get)('distributors'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all distributors' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "findAllDistributors", null);
__decorate([
    (0, common_1.Get)('distributors/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a distributor by ID' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "findOneDistributor", null);
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
    (0, common_1.Patch)('distributors/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a distributor' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, admin_dto_1.UpdateDistributorDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateDistributor", null);
__decorate([
    (0, common_1.Delete)('distributors/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a distributor' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteDistributor", null);
__decorate([
    (0, common_1.Get)('users'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all users' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "findAllUsers", null);
__decorate([
    (0, common_1.Get)('users/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a user by ID' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "findOneUser", null);
__decorate([
    (0, common_1.Post)('users'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new user' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'User created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createUser", null);
__decorate([
    (0, common_1.Patch)('users/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a user' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, admin_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)('users/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a user' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Post)('retailers/import'),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk import retailers via CSV (True Streaming)' }),
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
    __param(0, (0, common_1.Req)()),
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
__decorate([
    (0, common_1.Delete)('assignments/bulk'),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk unassign retailers from a sales rep' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Retailers unassigned successfully',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.BulkAssignDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "bulkUnassign", null);
exports.AdminController = AdminController = __decorate([
    (0, swagger_1.ApiTags)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_guard_2.Roles)(client_1.Role.ADMIN),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map