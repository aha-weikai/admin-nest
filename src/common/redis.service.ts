import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  client: Redis;
  constructor() {
    this.client = new Redis({
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      username: '', // needs Redis >= 6
      password: '',
      db: 0, // Defaults to 0
    });
  }

  async set(key, value, ttl?, type = 'EX' as any) {
    return await this.client.set(key, value, type, ttl);
  }

  async get(key) {
    return await this.client.get(key);
  }
}
