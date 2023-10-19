import { ExtendedPrismaClient } from '@/common/prisma.service';
import { Inject, Injectable } from '@nestjs/common';
// import * as crypto from 'crypto-random-string';
import * as crypto from 'crypto';
import { CustomPrismaService } from 'nestjs-prisma';

@Injectable()
export class SaltService {
  constructor(
    @Inject('PrismaService')
    private readonly prisma: CustomPrismaService<ExtendedPrismaClient>,
  ) {}

  async createSalt() {
    const salt = createSalt();
    return await this.prisma.client.salt.create({
      data: { salt },
    });
  }

  async upDateSalt(id) {
    const salt = createSalt();
    return await this.prisma.client.salt.update({
      where: { id },
      data: { salt },
    });
  }

  async getSalt(id) {
    return this.prisma.client.salt.findUnique({
      where: { id },
    });
  }
}

// 在argon2中salt是这样生成的
function createSalt() {
  return crypto.randomBytes(16);
}
