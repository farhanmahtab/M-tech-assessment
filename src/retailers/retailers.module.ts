import { Module } from '@nestjs/common';
import { RetailersService } from './retailers.service';
import { RetailersController } from './retailers.controller';

@Module({
  providers: [RetailersService],
  controllers: [RetailersController],
})
export class RetailersModule {}
