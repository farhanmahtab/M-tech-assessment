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
exports.RetailersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const cache_manager_1 = require("@nestjs/cache-manager");
let RetailersService = class RetailersService {
    prisma;
    cacheManager;
    constructor(prisma, cacheManager) {
        this.prisma = prisma;
        this.cacheManager = cacheManager;
    }
    async findAllAssigned(salesRepId, query) {
        const cacheKey = `retailers:sr:${salesRepId}:page:${query.page}:limit:${query.limit}:search:${query.search}:region:${query.regionId}:area:${query.areaId}:dist:${query.distributorId}:terr:${query.territoryId}`;
        const cachedData = await this.cacheManager.get(cacheKey);
        if (cachedData)
            return cachedData;
        const page = query.page || 1;
        const limit = query.limit || 10;
        const skip = (page - 1) * limit;
        const where = {
            salesRepRetailers: {
                some: { salesRepId },
            },
        };
        if (query.search) {
            where.OR = [
                { name: { contains: query.search, mode: 'insensitive' } },
                { uid: { contains: query.search, mode: 'insensitive' } },
                { phone: { contains: query.search, mode: 'insensitive' } },
            ];
        }
        if (query.regionId)
            where.regionId = query.regionId;
        if (query.areaId)
            where.areaId = query.areaId;
        if (query.distributorId)
            where.distributorId = query.distributorId;
        if (query.territoryId)
            where.territoryId = query.territoryId;
        const [total, data] = await Promise.all([
            this.prisma.retailer.count({ where }),
            this.prisma.retailer.findMany({
                where,
                skip,
                take: limit,
                include: {
                    area: true,
                    territory: true,
                    distributor: true,
                },
            }),
        ]);
        const result = {
            data,
            meta: {
                total,
                page,
                lastPage: Math.ceil(total / limit),
            },
        };
        await this.cacheManager.set(cacheKey, result, 60000);
        return result;
    }
    async findOne(uid) {
        return this.prisma.retailer.findUnique({
            where: { uid },
            include: {
                area: true,
                territory: true,
                distributor: true,
            },
        });
    }
    async update(uid, data) {
        const retailer = await this.prisma.retailer.update({
            where: { uid },
            data,
            include: { salesRepRetailers: true },
        });
        for (const sr of retailer.salesRepRetailers) {
            const pattern = `retailers:sr:${sr.salesRepId}*`;
        }
        return retailer;
    }
};
exports.RetailersService = RetailersService;
exports.RetailersService = RetailersService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, Object])
], RetailersService);
//# sourceMappingURL=retailers.service.js.map