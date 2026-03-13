import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateRetailerDto {
  @ApiPropertyOptional({
    example: 100,
    description: 'Reward points for the retailer',
  })
  @IsNumber()
  @IsOptional()
  points?: number;

  @ApiPropertyOptional({
    example: 'Route A, Route B',
    description: 'Assigned routes',
  })
  @IsString()
  @IsOptional()
  routes?: string;

  @ApiPropertyOptional({
    example: 'Busy during mornings',
    description: 'Notes about the retailer',
  })
  @IsString()
  @IsOptional()
  notes?: string;
}

export class RetailerQueryDto {
  @ApiPropertyOptional({ example: 1, description: 'Page number' })
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ example: 10, description: 'Items per page' })
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({
    example: 'search term',
    description: 'Search by name, UID, or phone',
  })
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({ example: 1, description: 'Filter by Region ID' })
  @IsOptional()
  regionId?: number;

  @ApiPropertyOptional({ example: 1, description: 'Filter by Area ID' })
  @IsOptional()
  areaId?: number;

  @ApiPropertyOptional({ example: 1, description: 'Filter by Distributor ID' })
  @IsOptional()
  distributorId?: number;

  @ApiPropertyOptional({ example: 1, description: 'Filter by Territory ID' })
  @IsOptional()
  territoryId?: number;
}
