import { IsExists } from '@/validations/is-exists';
import { Length, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsExists('user', ['account'], { message: '该账号尚未注册' })
  @Length(3, 30)
  @IsNotEmpty()
  account: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  publicKey: string;
}
