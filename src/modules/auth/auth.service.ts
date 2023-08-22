import { PrismaService } from '@/common/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwt: JwtService,
  ) {}
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
    return {
      accessToken: this.getToken(user, '12h'),
      refreshToken: this.getToken(user, '7d'),
    };
  }

  refreshToken(user: User) {
    return {
      accessToken: this.getToken(user, '12h'),
    };
  }

  private getToken(user: User, expiresIn: string | number) {
    return this.jwt.sign({ id: user.id }, { expiresIn });
  }
}
