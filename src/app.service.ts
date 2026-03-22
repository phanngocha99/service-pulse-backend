import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log('Start ServicePulse!');
    return 'Hello ServicePulse!';
  }
}
