import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { message: string; time: string } {
    return {
      message: `Backend API for Retailer Management System is running!`,
      time: new Date().toISOString(),
    };
  }
}
