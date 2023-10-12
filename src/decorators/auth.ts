import {
  ExecutionContext,
  UseGuards,
  applyDecorators,
  createParamDecorator,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User as UserData } from '@prisma/client';

/**
 * # 登录权限验证守卫
 */
export const Auth = () => {
  return applyDecorators(UseGuards(AuthGuard('jwt')));
};

/**
 * # 自定义参数装饰器（获取用户信息）
 */
export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    console.log(ctx);
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as UserEntity;
    Reflect.deleteProperty(user, 'saltId');
    Reflect.deleteProperty(user, 'password');
    return user;
  },
);

/**
 * # 用户信息实例（不能有saltId 和 password）
 */
export type UserEntity = Omit<UserData, 'saltId' | 'password'>;
