import { ConfigService } from '@/common/config.service';
import { Controller, Get } from '@nestjs/common';

@Controller('test')
export class TestController {
  constructor(private configService: ConfigService) {}

  @Get()
  async test() {
    console.log(this.configService.get('isDev'));
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1);
    });
    return this.configService.get('isDev');
  }

  @Get('sync')
  testSync() {
    let i = 1;
    while (true) {
      if (i < 10000) {
        i = i++;
      } else {
        break;
      }
    }
    return true;
  }
}
