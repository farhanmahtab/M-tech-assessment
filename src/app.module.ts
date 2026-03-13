import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { RetailersModule } from './retailers/retailers.module';
import { GlobalCacheModule } from './cache/cache.module';

@Module({
  imports: [
    GlobalCacheModule,
    PrismaModule,
    AuthModule,
    UsersModule,
    AdminModule,
    RetailersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
