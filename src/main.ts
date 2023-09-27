import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './interceptors';
// import { ValidationPipe } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { CustomValidationPipe } from './pipes/custom-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 设置请求地址的前缀
  // localhost:3000/api/
  app.setGlobalPrefix('api');

  // 全局使用管道验证(请求参数验证)
  app.useGlobalPipes(
    new CustomValidationPipe({
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );

  app.useGlobalInterceptors(new TransformInterceptor());
  // app.useGlobalFilters(new ValidateExceptionFilter());
  // 处理跨域
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
