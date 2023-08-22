import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

// 没啥用，被 dto 和 service替代掉了
/**
 * @description 账号密码的校验策略，需要配合 @UseGuards(AuthGuard('local')) 使用
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor() {
    super();
  }
  /**
   * @description 校验账号和密码，做一些处理
   * @param 参数为自定义的账号密码字段
   * @returns 返回的数据，默认放在 request.user
   */
  async validate(account: string, password: string): Promise<any> {
    console.log(`output-password`, password);
    return password;
  }
}
