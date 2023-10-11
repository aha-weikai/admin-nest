import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';

/**
 * # 处理响应的数据格式，统一返回为{ data: , message:  }
 */
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => {
        const keys = Object.keys(data);
        // data 中key > 1 个的情况
        if (keys.length > 1) {
          if (keys.includes('message') && keys.includes('data')) return data;
          return { data };
        }

        // data 中 key <= 1 的情况
        // 如果 data={data: } return data
        // 如果 data = {} , [] ,string, 等 return { data }
        return data?.data ? data : { data };
      }),
    );
  }
}
