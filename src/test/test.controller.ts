import { ConfigService } from '@/common/config.service';
import { Controller, Get } from '@nestjs/common';

@Controller('test')
export class TestController {
  constructor(private configService: ConfigService) {}

  @Get()
  test() {
    console.log(this.configService.get('isDev'));
    return this.configService.get('isDev');
  }
}
