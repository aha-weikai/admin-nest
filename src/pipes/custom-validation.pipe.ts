import { Injectable, ValidationError, ValidationPipe } from '@nestjs/common';

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
  // 必须重写此方法才能，实现自定义验证
  protected flattenValidationErrors(
    validationErrors: ValidationError[],
  ): any[] {
    return validationErrors.map((err) => ({
      field: err.property,
      // message: err.constraints[Object.keys(err.constraints)[0]],
      message: Object.values(err.constraints)[0],
    }));
  }
}

/*
 validationErrors
 [
   ValidationError {
     target: RegisterDto { account: '1', password: '111' },
     value: '1',
     property: 'account',
     children: [],
     constraints: {
       isNotEmpty: '用户名不能为空',
       isLength: 'account must be longer than or equal to 3 characters'
     }
   },
   ValidationError {
     target: RegisterDto { account: '1', password: '111' },
     value: '111',
     property: 'password',
     children: [],
     constraints: {
       isLength: 'password must be longer than or equal to 6 characters'
     }
  }
 ]
 从上面格式转为下面的格式
 [
   {
     field: 'account',
     message: '账号不能为空',
   },
   {
     field: 'password',
     message: '密码不能为空',
   },
 ];
 */
