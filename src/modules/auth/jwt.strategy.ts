import { ConfigService } from '@/common/config.service';
import { PrismaService } from '@/common/prisma.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

/**
 * @description jwt的校验策略，需要配合 @UseGuards(AuthGuard('jwt')) 使用
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      // 提供从请求中提取jwt 的方法
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 是否忽略过期：否
      // password 会处理jwt的过期情况
      ignoreExpiration: false,
      // 加密的密钥
      secretOrKey: config.get('app_key'),
    });
  }

  /**
   * @description 验证jwt，和准备一些数据
   * @param 参数为jwt加密的 payload
   * @returns 返回的数据，默认放在request.user
   */
  async validate(payload: any) {
    const user = this.prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });
    return user;
  }
}
