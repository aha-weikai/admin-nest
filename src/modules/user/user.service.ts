import { PrismaService } from '@/common/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getUserInfo(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
