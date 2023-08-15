import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from '@/common/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  async register(data: RegisterDto) {
    const userData: Record<string, any> = {};

    const fields = ['account', 'password', 'name'];
    for (const field of fields) {
      userData[field] = data[field];
    }

    const user = await this.prisma.user.create({
      data: { ...(userData as RegisterDto) },
    });
    return user;
  }

  async login(data: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        account: data.account,
      },
    });
    if (user.password !== data.password) {
      throw new BadRequestException('密码不正确，请重新输入');
    }
    return user;
  }
}
