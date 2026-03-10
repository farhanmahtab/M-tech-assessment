import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Role } from '@prisma/client';

export class CreateRegionDto {
  @ApiProperty({ example: 'Dhaka', description: 'Name of the region' })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateRegionDto extends PartialType(CreateRegionDto) {}

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

export class UpdateAreaDto extends PartialType(CreateAreaDto) {}

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

export class UpdateTerritoryDto extends PartialType(CreateTerritoryDto) {}

export class CreateDistributorDto {
  @ApiProperty({
    example: 'Top Distributor',
    description: 'Name of the distributor',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateDistributorDto extends PartialType(CreateDistributorDto) {}

export class CreateUserDto {
  @ApiProperty({ example: 'sr2', description: 'Username for the user' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'password', description: 'Password for the user' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'Sales Rep 2', description: 'Full name of the user' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    example: '01711000555',
    description: 'Phone number of the user',
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({
    enum: Role,
    default: Role.SALES_REP,
    description: 'Role of the user',
  })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

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
