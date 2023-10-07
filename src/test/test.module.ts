import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { CommonModule } from '@/common/common.module';

@Module({
  controllers: [TestController],
  providers: [],
  imports: [CommonModule],
})
export class TestModule {}
