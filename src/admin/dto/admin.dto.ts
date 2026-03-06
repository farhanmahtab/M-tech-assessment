import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsArray } from 'class-validator';

export class CreateRegionDto {
  @ApiProperty({ example: 'Dhaka', description: 'Name of the region' })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class CreateAreaDto {
  @ApiProperty({ example: 'Dhaka North', description: 'Name of the area' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 1, description: 'ID of the parent region' })
  @IsNumber()
  @IsNotEmpty()
  regionId: number;
}

export class CreateTerritoryDto {
  @ApiProperty({ example: 'Mirpur', description: 'Name of the territory' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 1, description: 'ID of the parent area' })
  @IsNumber()
  @IsNotEmpty()
  areaId: number;
}

export class CreateDistributorDto {
  @ApiProperty({
    example: 'Top Distributor',
    description: 'Name of the distributor',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class BulkAssignDto {
  @ApiProperty({ example: 2, description: 'ID of the Sales Representative' })
  @IsNumber()
  @IsNotEmpty()
  salesRepId: number;

  @ApiProperty({
    example: [1, 2, 3],
    description: 'List of Retailer IDs to assign',
  })
  @IsArray()
  @IsNotEmpty()
  retailerIds: number[];
}
