import { Controller, Get } from '@nestjs/common';
import { CaptchaService } from './captcha.service';
import { Auth } from '@/decorators/auth';

@Controller('captcha')
export class CaptchaController {
  constructor(private readonly captchaService: CaptchaService) {}

  @Get()
  @Auth()
  async getCaptcha() {
    return this.captchaService.create();
  }
}
