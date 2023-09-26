import { IsNotExists } from '@/validations/is-not-exists';
import { Expose } from 'class-transformer';
import {
  IsAlphanumeric,
  IsNotEmpty,
  IsOptional,
  Length,
} from 'class-validator';

export class RegisterDto {
  @IsNotExists('User', ['account'], { message: '该账号已被注册' })
  @Length(3, 30)
  @IsAlphanumeric()
  @IsNotEmpty({ message: '注册账号不能为空' })
  @Expose()
  account: string;

  @IsNotEmpty()
  @Expose()
  password: string;

  @IsNotEmpty()
  confirmedPassword: string;

  @IsNotEmpty()
  @IsOptional()
  @Expose()
  name: string;

  @IsNotEmpty()
  publicKey: string;
}
