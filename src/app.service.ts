import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // aqui tem os providers
  getHello(): string {
    return 'Hello World!';
  }
}
