import { IsNotExists } from '@/validations/is-not-exists';
import {
  Length,
  IsNotEmpty,
  IsOptional,
  IsAlphanumeric,
} from 'class-validator';

export class RegisterDto {
  @IsNotExists('User', ['account'], { message: '该账号已被注册' })
  @Length(3, 30)
  @IsAlphanumeric()
  @IsNotEmpty({ message: '注册账号不能为空' })
  account: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsNotEmpty()
  publicKey: string;
}
