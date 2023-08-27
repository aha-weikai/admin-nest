import { ConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service';
import { Global, Module } from '@nestjs/common';
import config from '../config';
import { PrismaService } from './prisma.service';
import { RedisService } from './redis.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
  ],
  controllers: [],
  providers: [ConfigService, PrismaService, RedisService],
  exports: [ConfigService, PrismaService, RedisService],
})
export class CommonModule {}
