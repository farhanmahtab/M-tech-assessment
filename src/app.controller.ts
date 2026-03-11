import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

interface RootAPIResponse {
  message: string;
  time?: string;
  [key: string]: any;
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): RootAPIResponse {
    return this.appService.getHello();
  }
}
