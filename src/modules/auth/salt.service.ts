import { PrismaService } from '@/common/prisma.service';
import { Injectable } from '@nestjs/common';
// import * as crypto from 'crypto-random-string';
import * as crypto from 'crypto';

@Injectable()
export class SaltService {
  constructor(private readonly prisma: PrismaService) {}

  async createSalt() {
    const salt = await createSalt();
    return this.prisma.salt.create({
      data: { salt },
    });
  }

  async upDateSalt(id) {
    const salt = createSalt();
    console.log(id);
    return await this.prisma.salt.update({
      where: { id },
      data: { salt },
    });
  }

  async getSalt(id) {
    return this.prisma.salt.findUnique({
      where: { id },
    });
  }
}

// 在argon2中salt是这样生成的
function createSalt() {
  return crypto.randomBytes(16);
}
