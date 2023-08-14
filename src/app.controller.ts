import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from './common/config.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly config: ConfigService,
  ) {}

  @Get('/test')
  getHello(): string {
    console.log(this.appService);
    console.log(this.config);
    return this.config.get('name');
    // return this.appService.getHello();
  }
}
