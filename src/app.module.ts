import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './common/common.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [CommonModule, AuthModule, UserModule],
})
export class AppModule {}
