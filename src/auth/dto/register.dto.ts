import { Length, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @Length(3, 20)
  @IsNotEmpty({ message: '用户名不能为空' })
  account: string;

  @Length(6, 20)
  @IsNotEmpty()
  password: string;
}
