import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import {
  CreateUserDto,
  UpdateUserDto,
  UpdateRegionDto,
  UpdateAreaDto,
  UpdateTerritoryDto,
  UpdateDistributorDto,
} from './dto/admin.dto';

interface RetailerRow {
  uid: string;
  name: string;
  phone: string;
  regionId: string;
  areaId: string;
  distributorId: string;
  territoryId: string;
  routes: string;
}

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  // Region CRUD
  async findAllRegions() {
    return this.prisma.region.findMany({ include: { areas: true } });
  }

  async findOneRegion(id: number) {
    const region = await this.prisma.region.findUnique({
      where: { id },
      include: { areas: true },
    });
    if (!region) throw new NotFoundException(`Region with ID ${id} not found`);
    return region;
  }

  async createRegion(data: { name: string }) {
    return this.prisma.region.create({ data });
  }

  async updateRegion(id: number, data: UpdateRegionDto) {
    return this.prisma.region.update({ where: { id }, data });
  }

  async deleteRegion(id: number) {
    return this.prisma.region.delete({ where: { id } });
  }

  // Area CRUD
  async findAllAreas() {
    return this.prisma.area.findMany({ include: { region: true } });
  }

  async findOneArea(id: number) {
    const area = await this.prisma.area.findUnique({
      where: { id },
      include: { region: true, territories: true },
    });
    if (!area) throw new NotFoundException(`Area with ID ${id} not found`);
    return area;
  }

  async createArea(data: { name: string; regionId: number }) {
    return this.prisma.area.create({
      data: {
        name: data.name,
        region: { connect: { id: data.regionId } },
      },
    });
  }

  async updateArea(id: number, data: UpdateAreaDto) {
    return this.prisma.area.update({ where: { id }, data });
  }

  async deleteArea(id: number) {
    return this.prisma.area.delete({ where: { id } });
  }

  // Territory CRUD
  async findAllTerritories() {
    return this.prisma.territory.findMany({ include: { area: true } });
  }

  async findOneTerritory(id: number) {
    const territory = await this.prisma.territory.findUnique({
      where: { id },
      include: { area: true, retailers: true },
    });
    if (!territory)
      throw new NotFoundException(`Territory with ID ${id} not found`);
    return territory;
  }

  async createTerritory(data: { name: string; areaId: number }) {
    return this.prisma.territory.create({
      data: {
        name: data.name,
        area: { connect: { id: data.areaId } },
      },
    });
  }

  async updateTerritory(id: number, data: UpdateTerritoryDto) {
    return this.prisma.territory.update({ where: { id }, data });
  }

  async deleteTerritory(id: number) {
    return this.prisma.territory.delete({ where: { id } });
  }

  // Distributor CRUD
  async findAllDistributors() {
    return this.prisma.distributor.findMany();
  }

  async findOneDistributor(id: number) {
    const distributor = await this.prisma.distributor.findUnique({
      where: { id },
    });
    if (!distributor)
      throw new NotFoundException(`Distributor with ID ${id} not found`);
    return distributor;
  }

  async createDistributor(data: { name: string }) {
    return this.prisma.distributor.create({ data });
  }

  async updateDistributor(id: number, data: UpdateDistributorDto) {
    return this.prisma.distributor.update({ where: { id }, data });
  }

  async deleteDistributor(id: number) {
    return this.prisma.distributor.delete({ where: { id } });
  }

  // User CRUD
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

  async findOneUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { salesRepRetailers: true },
    });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    const { passwordHash, ...rest } = user;
    return rest;
  }

  async createUser(data: CreateUserDto) {
    const { password, ...rest } = data;
    const passwordHash = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: { ...rest, passwordHash },
    });
  }

  async updateUser(id: number, data: UpdateUserDto) {
    const { password, ...rest } = data;
    const updateData: any = { ...rest };
    if (password) {
      updateData.passwordHash = await bcrypt.hash(password, 10);
    }
    return this.prisma.user.update({
      where: { id },
      data: updateData,
    });
  }

  async deleteUser(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }

  async importRetailersStream(
    fileStream: NodeJS.ReadableStream,
  ): Promise<any> {
    const csv = require('csv-parser');
    const retailers: any[] = [];

    return new Promise((resolve, reject) => {
      fileStream
        .pipe(csv())
        .on('data', (row: RetailerRow) => {
          retailers.push({
            uid: row.uid,
            name: row.name,
            phone: row.phone,
            regionId: parseInt(row.regionId, 10),
            areaId: parseInt(row.areaId, 10),
            distributorId: parseInt(row.distributorId, 10),
            territoryId: parseInt(row.territoryId, 10),
            routes: row.routes,
          });
        })
        .on('end', async () => {
          try {
            const result = await this.prisma.retailer.createMany({
              data: retailers,
              skipDuplicates: true,
            });
            resolve(result);
          } catch (error) {
            reject(error);
          }
        })
        .on('error', (error) => reject(error));
    });
  }

  async importRetailersContent(fileBuffer: Buffer): Promise<any> {
    const { Readable } = require('stream');
    return this.importRetailersStream(Readable.from(fileBuffer));
  }

  // Bulk Assignment
  async bulkAssign(salesRepId: number, retailerIds: number[]) {
    const data = retailerIds.map((retailerId) => ({
      salesRepId,
      retailerId,
    }));

    return this.prisma.salesRepRetailer.createMany({
      data,
      skipDuplicates: true,
    });
  }

  async bulkUnassign(salesRepId: number, retailerIds: number[]) {
    return this.prisma.salesRepRetailer.deleteMany({
      where: {
        salesRepId,
        retailerId: { in: retailerIds },
      },
    });
  }
}
