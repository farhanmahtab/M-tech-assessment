import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Req,
  UseGuards, ParseIntPipe
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.guard';
import { Role } from '@prisma/client';
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
  UpdateRegionDto,
  CreateAreaDto,
  UpdateAreaDto,
  CreateTerritoryDto,
  UpdateTerritoryDto,
  CreateDistributorDto,
  UpdateDistributorDto,
  CreateUserDto,
  UpdateUserDto,
  BulkAssignDto,
} from './dto/admin.dto';

@ApiTags('admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  // Region Endpoints
  @Get('regions')
  @ApiOperation({ summary: 'Get all regions' })
  async findAllRegions() {
    return this.adminService.findAllRegions();
  }

  @Get('regions/:id')
  @ApiOperation({ summary: 'Get a region by ID' })
  async findOneRegion(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.findOneRegion(id);
  }

  @Post('regions')
  @ApiOperation({ summary: 'Create a new region' })
  @ApiResponse({ status: 201, description: 'Region created successfully' })
  async createRegion(@Body() data: CreateRegionDto) {
    return this.adminService.createRegion(data);
  }

  @Patch('regions/:id')
  @ApiOperation({ summary: 'Update a region' })
  async updateRegion(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateRegionDto,
  ) {
    return this.adminService.updateRegion(id, data);
  }

  @Delete('regions/:id')
  @ApiOperation({ summary: 'Delete a region' })
  async deleteRegion(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteRegion(id);
  }

  // Area Endpoints
  @Get('areas')
  @ApiOperation({ summary: 'Get all areas' })
  async findAllAreas() {
    return this.adminService.findAllAreas();
  }

  @Get('areas/:id')
  @ApiOperation({ summary: 'Get an area by ID' })
  async findOneArea(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.findOneArea(id);
  }

  @Post('areas')
  @ApiOperation({ summary: 'Create a new area' })
  @ApiResponse({ status: 201, description: 'Area created successfully' })
  async createArea(@Body() data: CreateAreaDto) {
    return this.adminService.createArea(data);
  }

  @Patch('areas/:id')
  @ApiOperation({ summary: 'Update an area' })
  async updateArea(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateAreaDto,
  ) {
    return this.adminService.updateArea(id, data);
  }

  @Delete('areas/:id')
  @ApiOperation({ summary: 'Delete an area' })
  async deleteArea(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteArea(id);
  }

  // Territory Endpoints
  @Get('territories')
  @ApiOperation({ summary: 'Get all territories' })
  async findAllTerritories() {
    return this.adminService.findAllTerritories();
  }

  @Get('territories/:id')
  @ApiOperation({ summary: 'Get a territory by ID' })
  async findOneTerritory(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.findOneTerritory(id);
  }

  @Post('territories')
  @ApiOperation({ summary: 'Create a new territory' })
  @ApiResponse({ status: 201, description: 'Territory created successfully' })
  async createTerritory(@Body() data: CreateTerritoryDto) {
    return this.adminService.createTerritory(data);
  }

  @Patch('territories/:id')
  @ApiOperation({ summary: 'Update a territory' })
  async updateTerritory(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateTerritoryDto,
  ) {
    return this.adminService.updateTerritory(id, data);
  }

  @Delete('territories/:id')
  @ApiOperation({ summary: 'Delete a territory' })
  async deleteTerritory(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteTerritory(id);
  }

  // Distributor Endpoints
  @Get('distributors')
  @ApiOperation({ summary: 'Get all distributors' })
  async findAllDistributors() {
    return this.adminService.findAllDistributors();
  }

  @Get('distributors/:id')
  @ApiOperation({ summary: 'Get a distributor by ID' })
  async findOneDistributor(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.findOneDistributor(id);
  }

  @Post('distributors')
  @ApiOperation({ summary: 'Create a new distributor' })
  @ApiResponse({ status: 201, description: 'Distributor created successfully' })
  async createDistributor(@Body() data: CreateDistributorDto) {
    return this.adminService.createDistributor(data);
  }

  @Patch('distributors/:id')
  @ApiOperation({ summary: 'Update a distributor' })
  async updateDistributor(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateDistributorDto,
  ) {
    return this.adminService.updateDistributor(id, data);
  }

  @Delete('distributors/:id')
  @ApiOperation({ summary: 'Delete a distributor' })
  async deleteDistributor(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteDistributor(id);
  }

  // User Endpoints
  @Get('users')
  @ApiOperation({ summary: 'Get all users' })
  async findAllUsers() {
    return this.adminService.findAllUsers();
  }

  @Get('users/:id')
  @ApiOperation({ summary: 'Get a user by ID' })
  async findOneUser(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.findOneUser(id);
  }

  @Post('users')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  async createUser(@Body() data: CreateUserDto) {
    return this.adminService.createUser(data);
  }

  @Patch('users/:id')
  @ApiOperation({ summary: 'Update a user' })
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDto,
  ) {
    return this.adminService.updateUser(id, data);
  }

  @Delete('users/:id')
  @ApiOperation({ summary: 'Delete a user' })
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteUser(id);
  }

  // Utility Endpoints
  @Post('retailers/import')
  @ApiOperation({ summary: 'Bulk import retailers via CSV (True Streaming)' })
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
  async importRetailers(@Req() req: any) {
    const Busboy = require('busboy');
    const bb = Busboy({ headers: req.headers });

    return new Promise((resolve, reject) => {
      bb.on('file', (name, file, info) => {
        if (name === 'file') {
          this.adminService
            .importRetailersStream(file)
            .then(resolve)
            .catch(reject);
        } else {
          file.resume();
        }
      });
      bb.on('error', reject);
      req.pipe(bb);
    });
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

  @Delete('assignments/bulk')
  @ApiOperation({ summary: 'Bulk unassign retailers from a sales rep' })
  @ApiResponse({
    status: 200,
    description: 'Retailers unassigned successfully',
  })
  async bulkUnassign(@Body() bulkAssignDto: BulkAssignDto) {
    return this.adminService.bulkUnassign(
      bulkAssignDto.salesRepId,
      bulkAssignDto.retailerIds,
    );
  }
}
