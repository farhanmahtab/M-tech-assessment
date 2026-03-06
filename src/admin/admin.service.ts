import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
// import csv from 'csv-parser';
// import { Readable } from 'stream';

import * as Papa from 'papaparse';

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

  // Master Data CRUD
  async createRegion(data: { name: string }) {
    return this.prisma.region.create({ data });
  }

  async createArea(data: { name: string; regionId: number }) {
    return this.prisma.area.create({
      data: {
        name: data.name,
        region: { connect: { id: data.regionId } },
      },
    });
  }

  async createTerritory(data: { name: string; areaId: number }) {
    return this.prisma.territory.create({
      data: {
        name: data.name,
        area: { connect: { id: data.areaId } },
      },
    });
  }

  async createDistributor(data: { name: string }) {
    return this.prisma.distributor.create({ data });
  }

  // // Bulk Import
  // async importRetailersContent(fileBuffer: Buffer) {
  //   const retailers: any[] = [];
  //   const stream = Readable.from(fileBuffer);

  //   return new Promise((resolve, reject) => {
  //     stream
  //       .pipe(csv())
  //       .on('data', (data) => retailers.push(data))
  //       .on('end', async () => {
  //         try {
  //           const results: any[] = [];
  //           for (const row of retailers) {
  //             const retailer = await this.prisma.retailer.upsert({
  //               where: { uid: row.uid },
  //               update: {
  //                 name: row.name,
  //                 phone: row.phone,
  //                 regionId: parseInt(row.regionId),
  //                 areaId: parseInt(row.areaId),
  //                 distributorId: parseInt(row.distributorId),
  //                 territoryId: parseInt(row.territoryId),
  //                 routes: row.routes,
  //               },
  //               create: {
  //                 uid: row.uid,
  //                 name: row.name,
  //                 phone: row.phone,
  //                 regionId: parseInt(row.regionId),
  //                 areaId: parseInt(row.areaId),
  //                 distributorId: parseInt(row.distributorId),
  //                 territoryId: parseInt(row.territoryId),
  //                 routes: row.routes,
  //               },
  //             });
  //             results.push(retailer);
  //           }
  //           resolve(results);
  //         } catch (error) {
  //           reject(error);
  //         }
  //       });
  //   });
  // }

  async importRetailersContent(fileBuffer: Buffer): Promise<any[]> {
    const csvString = fileBuffer.toString('utf-8');
    const parseResult: Papa.ParseResult<RetailerRow> = Papa.parse<RetailerRow>(
      csvString,
      {
        header: true,
        skipEmptyLines: true,
      },
    );
    const retailers: RetailerRow[] = parseResult.data;

    const results: any[] = [];
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
}
