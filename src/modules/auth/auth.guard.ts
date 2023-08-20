import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class Auth implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const body = req.body;
    console.log('%cauth.guard.ts line:10 body', 'color: #007acc;', body);
    return true;
  }
}
