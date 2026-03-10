"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const Papa = __importStar(require("papaparse"));
const bcrypt = __importStar(require("bcrypt"));
let AdminService = class AdminService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAllRegions() {
        return this.prisma.region.findMany({ include: { areas: true } });
    }
    async findOneRegion(id) {
        const region = await this.prisma.region.findUnique({
            where: { id },
            include: { areas: true },
        });
        if (!region)
            throw new common_1.NotFoundException(`Region with ID ${id} not found`);
        return region;
    }
    async createRegion(data) {
        return this.prisma.region.create({ data });
    }
    async updateRegion(id, data) {
        return this.prisma.region.update({ where: { id }, data });
    }
    async deleteRegion(id) {
        return this.prisma.region.delete({ where: { id } });
    }
    async findAllAreas() {
        return this.prisma.area.findMany({ include: { region: true } });
    }
    async findOneArea(id) {
        const area = await this.prisma.area.findUnique({
            where: { id },
            include: { region: true, territories: true },
        });
        if (!area)
            throw new common_1.NotFoundException(`Area with ID ${id} not found`);
        return area;
    }
    async createArea(data) {
        return this.prisma.area.create({
            data: {
                name: data.name,
                region: { connect: { id: data.regionId } },
            },
        });
    }
    async updateArea(id, data) {
        return this.prisma.area.update({ where: { id }, data });
    }
    async deleteArea(id) {
        return this.prisma.area.delete({ where: { id } });
    }
    async findAllTerritories() {
        return this.prisma.territory.findMany({ include: { area: true } });
    }
    async findOneTerritory(id) {
        const territory = await this.prisma.territory.findUnique({
            where: { id },
            include: { area: true, retailers: true },
        });
        if (!territory)
            throw new common_1.NotFoundException(`Territory with ID ${id} not found`);
        return territory;
    }
    async createTerritory(data) {
        return this.prisma.territory.create({
            data: {
                name: data.name,
                area: { connect: { id: data.areaId } },
            },
        });
    }
    async updateTerritory(id, data) {
        return this.prisma.territory.update({ where: { id }, data });
    }
    async deleteTerritory(id) {
        return this.prisma.territory.delete({ where: { id } });
    }
    async findAllDistributors() {
        return this.prisma.distributor.findMany();
    }
    async findOneDistributor(id) {
        const distributor = await this.prisma.distributor.findUnique({
            where: { id },
        });
        if (!distributor)
            throw new common_1.NotFoundException(`Distributor with ID ${id} not found`);
        return distributor;
    }
    async createDistributor(data) {
        return this.prisma.distributor.create({ data });
    }
    async updateDistributor(id, data) {
        return this.prisma.distributor.update({ where: { id }, data });
    }
    async deleteDistributor(id) {
        return this.prisma.distributor.delete({ where: { id } });
    }
    async findAllUsers() {
        return this.prisma.user.findMany({
            select: {
                id: true,
                username: true,
                name: true,
                phone: true,
                role: true,
                createdAt: true,
            },
        });
    }
    async findOneUser(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: { salesRepRetailers: true },
        });
        if (!user)
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        const { passwordHash, ...rest } = user;
        return rest;
    }
    async createUser(data) {
        const { password, ...rest } = data;
        const passwordHash = await bcrypt.hash(password, 10);
        return this.prisma.user.create({
            data: { ...rest, passwordHash },
        });
    }
    async updateUser(id, data) {
        const { password, ...rest } = data;
        const updateData = { ...rest };
        if (password) {
            updateData.passwordHash = await bcrypt.hash(password, 10);
        }
        return this.prisma.user.update({
            where: { id },
            data: updateData,
        });
    }
    async deleteUser(id) {
        return this.prisma.user.delete({ where: { id } });
    }
    async importRetailersContent(fileBuffer) {
        const csvString = fileBuffer.toString('utf-8');
        const parseResult = Papa.parse(csvString, {
            header: true,
            skipEmptyLines: true,
        });
        const retailers = parseResult.data;
        const results = [];
        for (const row of retailers) {
            const retailer = await this.prisma.retailer.upsert({
                where: { uid: row.uid },
                update: {
                    name: row.name,
                    phone: row.phone,
                    regionId: parseInt(row.regionId, 10),
                    areaId: parseInt(row.areaId, 10),
                    distributorId: parseInt(row.distributorId, 10),
                    territoryId: parseInt(row.territoryId, 10),
                    routes: row.routes,
                },
                create: {
                    uid: row.uid,
                    name: row.name,
                    phone: row.phone,
                    regionId: parseInt(row.regionId, 10),
                    areaId: parseInt(row.areaId, 10),
                    distributorId: parseInt(row.distributorId, 10),
                    territoryId: parseInt(row.territoryId, 10),
                    routes: row.routes,
                },
            });
            results.push(retailer);
        }
        return results;
    }
    async bulkAssign(salesRepId, retailerIds) {
        const data = retailerIds.map((retailerId) => ({
            salesRepId,
            retailerId,
        }));
        return this.prisma.salesRepRetailer.createMany({
            data,
            skipDuplicates: true,
        });
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map