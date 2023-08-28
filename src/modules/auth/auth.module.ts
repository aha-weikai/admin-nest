import { ConfigService } from '@/common/config.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { SaltService } from './salt.service';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          secret: config.get('app_key'),
          signOptions: { expiresIn: '30d' },
        };
      },
    }),
    NestjsFormDataModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, SaltService],
})
export class AuthModule {}
