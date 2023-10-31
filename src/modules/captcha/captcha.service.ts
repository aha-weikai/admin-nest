import { ConfigService } from '@/common/config.service';
import { RedisService } from '@/common/redis.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { now } from 'lodash';
import md5 from 'md5';
import * as svgCaptcha from 'svg-captcha-fixed';
import { devSvgCaptchaData } from './data';

@Injectable()
export class CaptchaService {
  constructor(
    private redis: RedisService,
    private config: ConfigService,
  ) {}
  async create() {
    let data;
    if (this.config.get('isDev') === 'true') {
      data = devSvgCaptchaData;
    } else {
      data = svgCaptcha.createMathExpr({
        mathMax: 9,
        mathMin: 0,
        mathOperator: '+-',
        size: 6,
        noise: 3,
        color: true,
        height: 32,
      });
    }

    const captchaKey = md5('' + now());
    await this.redis.set(`captcha:${captchaKey}`, data.text);

    return {
      captchaKey,
      data: data.data,
    };
  }

  async verify(captchaKey, answer) {
    const correctAnswer = await this.redis.get(`captcha:${captchaKey}`);
    if (correctAnswer !== answer) {
      throw new BadRequestException('密码不正确，请重新输入');
    }
  }
}
