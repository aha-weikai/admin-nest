import { PrismaService } from '@/common/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as argon2 from 'argon2';
import { SaltService } from './salt.service';
import NodeRSA from 'node-rsa';
import { RedisService } from '@/common/redis.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwt: JwtService,
    private saltService: SaltService,
    private redis: RedisService,
  ) {}
  async register(data: RegisterDto) {
    const salt = await this.saltService.createSalt();
    data.password = await this.hashPassword(data.password, salt.salt);

    const user = await this.prisma.user.create({
      data: { ...data, saltId: salt.id },
    });
    return user;
  }

  async login(data: LoginDto) {
    let password;
    try {
      password = await this.getPassword(data.publicKey, data.password);
      console.log(password);
    } catch (error) {
      throw new BadRequestException('密码不正确，请重新输入');
    }

    const user = await this.prisma.user.findFirst({
      where: { account: data.account },
    });

    const { salt } = await this.saltService.getSalt(user.saltId);
    const res = await this.verifyPassword(user.password, password, salt);

    if (res) {
      const newSalt = await this.saltService.upDateSalt(user.saltId);
      const newPassword = await this.hashPassword(password, newSalt.salt);
      await this.prisma.user.update({
        where: { id: user.id },
        data: { password: newPassword },
      });
    } else {
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

  async getPublicKey() {
    const key = getSecretKey();
    await this.redis.client.set(`publicKey:${key.publicKey}`, key.privateKey);
    return key.publicKey;
  }
  async getPassword(publicKey, hashPassword) {
    const privateKey = await this.redis.client.get(`publicKey:${publicKey}`);
    const decrypt = new NodeRSA(privateKey);
    decrypt.setOptions({ encryptionScheme: 'pkcs1' });
    try {
      const password = decrypt.decrypt(hashPassword, 'utf8');
      return password;
    } catch (error) {
      new BadRequestException({
        error: 'Bad Request',
        message: '密码错误',
        statusCode: 400,
      });
    }
  }

  private getToken(user: User, expiresIn: string | number) {
    return this.jwt.sign({ id: user.id }, { expiresIn });
  }

  private async hashPassword(password, salt) {
    return await argon2.hash(password, getSaltOptions(salt));
  }

  private async verifyPassword(innerPassword, password, salt) {
    try {
      if (await argon2.verify(innerPassword, password, getSaltOptions(salt))) {
        // password match
        return true;
      } else {
        // password did not match
        return false;
      }
    } catch (err) {
      // internal failure
      console.log(err);
      return false;
    }
  }
}

function getSaltOptions(salt) {
  return {
    type: argon2.argon2i,
    hashLength: 32, // 哈希函数输出的字节长度(请注意，生成的哈希是使用Base64编码的，因此长度将增加约1/3)
    timeCost: 3, // 时间成本是哈希函数使用的通过次数（迭代次数）
    memoryCost: 2 ** 16, // 默认 4096（单位 KB，即 4MB）
    parallelism: 1, //用于计算哈希值的线程数量。每个线程都有一个具有memoryCost大小的内存池
    salt: Buffer.from(salt),
  };
}

// argon2 内部代码
// 自己生成一份salt
// salt = salt || (await generateSalt(options.saltLength));
// 也可以自己传入salt

function getSecretKey() {
  const key = new NodeRSA({ b: 512 });
  const publicKey = key.exportKey('public');
  const privateKey = key.exportKey('private');
  return {
    publicKey,
    privateKey,
  };
}
