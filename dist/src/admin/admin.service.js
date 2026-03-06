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
let AdminService = class AdminService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createRegion(data) {
        return this.prisma.region.create({ data });
    }
    async createArea(data) {
        return this.prisma.area.create({
            data: {
                name: data.name,
                region: { connect: { id: data.regionId } },
            },
        });
    }
    async createTerritory(data) {
        return this.prisma.territory.create({
            data: {
                name: data.name,
                area: { connect: { id: data.areaId } },
            },
        });
    }
    async createDistributor(data) {
        return this.prisma.distributor.create({ data });
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