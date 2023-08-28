import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './common/common.module';
import { UserModule } from './modules/user/user.module';
import { CaptchaModule } from './modules/captcha/captcha.module';

@Module({
  imports: [CommonModule, AuthModule, UserModule, CaptchaModule],
})
export class AppModule {}
