import { ConfigModule } from '@nestjs/config';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { Global, Module } from '@nestjs/common';
import config from '../config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
  ],
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule {}
