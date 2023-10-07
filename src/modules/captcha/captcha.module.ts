import { Module } from '@nestjs/common';
import { CaptchaService } from './captcha.service';
import { CaptchaController } from './captcha.controller';
import { CommonModule } from '@/common/common.module';

@Module({
  controllers: [CaptchaController],
  providers: [CaptchaService],
  imports: [CommonModule],
})
export class CaptchaModule {}
