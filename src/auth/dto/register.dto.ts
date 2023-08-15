import { IsNotExists } from '@/validate/is-not-exists';
import { Length, IsNotEmpty, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsNotExists('User', ['account'], { message: '该账号已被注册' })
  @Length(3, 30)
  @IsNotEmpty({ message: '注册账号不能为空' })
  account: string;

  @Length(6, 20)
  @IsNotEmpty()
  password: string;

  @Length(3, 20)
  @IsNotEmpty()
  @IsOptional()
  name: string;
}
