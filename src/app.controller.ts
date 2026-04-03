import { AppService } from './app.service.js';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('app/health')
  get(): string {
    return this.appService.get();
  }
}
