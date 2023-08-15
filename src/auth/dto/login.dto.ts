import { IsExists } from '@/validate/is-exists';
import { Length, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsExists('user', ['account'], { message: '该账号尚未注册' })
  @Length(3, 30)
  @IsNotEmpty()
  account: string;

  @Length(6, 20)
  @IsNotEmpty()
  password: string;
}
