import { ConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service';
import { Global, Module } from '@nestjs/common';
import config from '../config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
  ],
  controllers: [],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class CommonModule {}
