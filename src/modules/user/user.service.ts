import { ExtendedPrismaClient } from '@/common/prisma.service';
import { Inject, Injectable } from '@nestjs/common';
import { CustomPrismaService } from 'nestjs-prisma';

@Injectable()
export class UserService {
  constructor(
    @Inject('PrismaService')
    private readonly prisma: CustomPrismaService<ExtendedPrismaClient>,
  ) {}

  getUserInfo(id: number) {
    return this.prisma.client.user.findUnique({ where: { id } });
  }
}
