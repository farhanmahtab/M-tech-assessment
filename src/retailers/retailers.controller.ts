import {
  Controller,
  Get,
  Patch,
  Param,
  Query,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RetailersService } from './retailers.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.guard';
import { Role } from '@prisma/client';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { UpdateRetailerDto, RetailerQueryDto } from './dto/retailer.dto';

@ApiTags('retailers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('retailers')
export class RetailersController {
  constructor(private retailersService: RetailersService) {}

  @Roles(Role.SALES_REP)
  @Get()
  @ApiOperation({
    summary: 'Get paginated assigned retailers for the current SR',
  })
  @ApiResponse({
    status: 200,
    description: 'List of assigned retailers returned successfully',
  })
  async findAll(@Request() req, @Query() query: RetailerQueryDto) {
    const filters = {
      ...query,
      page: query.page ? Number(query.page) : 1,
      limit: query.limit ? Number(query.limit) : 10,
      regionId: query.regionId ? Number(query.regionId) : undefined,
      areaId: query.areaId ? Number(query.areaId) : undefined,
      distributorId: query.distributorId
        ? Number(query.distributorId)
        : undefined,
      territoryId: query.territoryId ? Number(query.territoryId) : undefined,
    };
    return this.retailersService.findAllAssigned(req.user.userId, filters);
  }

  @Roles(Role.SALES_REP, Role.ADMIN)
  @Get(':uid')
  @ApiOperation({ summary: 'Get retailer details by UID' })
  @ApiResponse({
    status: 200,
    description: 'Retailer details returned successfully',
  })
  @ApiResponse({ status: 404, description: 'Retailer not found' })
  async findOne(@Param('uid') uid: string) {
    return this.retailersService.findOne(uid);
  }

  @Roles(Role.SALES_REP)
  @Patch(':uid')
  @ApiOperation({
    summary: 'Update allowed fields for a retailer (Points, Routes, Notes)',
  })
  @ApiResponse({ status: 200, description: 'Retailer updated successfully' })
  async update(@Param('uid') uid: string, @Body() data: UpdateRetailerDto) {
    return this.retailersService.update(uid, data);
  }
}
