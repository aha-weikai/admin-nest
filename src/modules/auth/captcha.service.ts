import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';

@Injectable()
export class CaptchaService {
  constructor() {}

  getSvgCaptcha() {
    return svgCaptcha.createMathExpr();
  }
}
