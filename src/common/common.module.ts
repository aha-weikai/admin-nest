import { ConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service';
import { Global, Module } from '@nestjs/common';
import config from '../config';
import { PrismaService } from './prisma.service';
import { RedisService } from './redis.service';
import { CustomPrismaModule } from 'nestjs-prisma';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    CustomPrismaModule.forRootAsync({
      name: 'PrismaService',
      useClass: PrismaService,
    }),
  ],
  controllers: [],
  providers: [ConfigService, PrismaService, RedisService],
  exports: [
    ConfigService,
    CustomPrismaModule.forRootAsync({
      name: 'PrismaService',
      useClass: PrismaService,
    }),
    RedisService,
  ],
})
export class CommonModule {}
