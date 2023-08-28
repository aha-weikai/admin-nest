import { RedisService } from '@/common/redis.service';
import { Injectable } from '@nestjs/common';
import { now } from 'lodash';
import md5 from 'md5';
import * as svgCaptcha from 'svg-captcha-fixed';

@Injectable()
export class CaptchaService {
  constructor(private redis: RedisService) {}
  async create() {
    const data = svgCaptcha.createMathExpr({
      mathMax: 9,
      mathMin: 0,
      mathOperator: '+-',
      size: 6,
      noise: 3,
      color: true,
    });

    const captchaKey = md5('' + now());
    await this.redis.set(`captcha:${captchaKey}`, data.text);

    return data.data;
  }

  async verify(captchaKey, answer) {
    const correctAnswer = await this.redis.get(captchaKey);
    if (correctAnswer === answer) {
      return true;
    } else {
      return false;
    }
  }
}
