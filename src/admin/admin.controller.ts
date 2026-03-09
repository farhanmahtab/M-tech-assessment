import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.guard';
import { Role } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import {
  CreateRegionDto,
  CreateAreaDto,
  BulkAssignDto,
  CreateTerritoryDto,
  CreateDistributorDto,
} from './dto/admin.dto';

@ApiTags('admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('regions')
  @ApiOperation({ summary: 'Create a new region' })
  @ApiResponse({ status: 201, description: 'Region created successfully' })
  async createRegion(@Body() data: CreateRegionDto) {
    return this.adminService.createRegion(data);
  }

  @Post('areas')
  @ApiOperation({ summary: 'Create a new area' })
  @ApiResponse({ status: 201, description: 'Area created successfully' })
  async createArea(@Body() data: CreateAreaDto) {
    return this.adminService.createArea(data);
  }

  @Post('territories')
  @ApiOperation({ summary: 'Create a new territory' })
  @ApiResponse({ status: 201, description: 'Territory created successfully' })
  async createTerritory(@Body() data: CreateTerritoryDto) {
    return this.adminService.createTerritory(data);
  }

  @Post('distributors')
  @ApiOperation({ summary: 'Create a new distributor' })
  @ApiResponse({ status: 201, description: 'Distributor created successfully' })
  async createDistributor(@Body() data: CreateDistributorDto) {
    return this.adminService.createDistributor(data);
  }

  @Post('retailers/import')
  @ApiOperation({ summary: 'Bulk import retailers via CSV' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Retailers imported successfully' })
  @UseInterceptors(FileInterceptor('file'))
  async importRetailers(
    @UploadedFile(
      new ParseFilePipe({
        validators: [],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.adminService.importRetailersContent(file.buffer);
  }

  @Post('assignments/bulk')
  @ApiOperation({ summary: 'Bulk assign retailers to a sales rep' })
  @ApiResponse({ status: 201, description: 'Retailers assigned successfully' })
  async bulkAssign(@Body() bulkAssignDto: BulkAssignDto) {
    return this.adminService.bulkAssign(
      bulkAssignDto.salesRepId,
      bulkAssignDto.retailerIds,
    );
  }
}
