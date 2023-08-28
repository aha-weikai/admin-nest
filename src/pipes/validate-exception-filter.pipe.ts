import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class ValidateExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    //自定义异常处理
    if (exception instanceof BadRequestException) {
      // return response.json(exception.getResponse())
      return response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
    if (exception instanceof UnprocessableEntityException) {
      return response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
    return response.end();
  }
}
