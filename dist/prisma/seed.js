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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    const passwordHash = await bcrypt.hash('password', 10);
    await prisma.user.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
            username: 'admin',
            passwordHash,
            name: 'System Admin',
            role: client_1.Role.ADMIN,
        },
    });
    await prisma.user.upsert({
        where: { username: 'sr1' },
        update: {},
        create: {
            username: 'sr1',
            passwordHash,
            name: 'Sales Rep 1',
            role: client_1.Role.SALES_REP,
        },
    });
    const region = await prisma.region.upsert({
        where: { name: 'Dhaka' },
        update: {},
        create: { name: 'Dhaka' },
    });
    const area = await prisma.area.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: 'Dhaka North',
            regionId: region.id,
        },
    });
    await prisma.territory.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: 'Mirpur',
            areaId: area.id,
        },
    });
    await prisma.distributor.upsert({
        where: { name: 'Top Distributor' },
        update: {},
        create: { name: 'Top Distributor' },
    });
    console.log('Seed completed.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map