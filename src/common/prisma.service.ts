import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      // log: ['query'],
    });
    console.log(this);
    this.$extends({
      model: {
        $allModels: {
          async $create(this, data) {
            // Get the current model at runtime
            console.log(this, '--------');
            const context = Prisma.getExtensionContext(this);
            console.log(data, 'data');
            const result = await (context as any).create({ data });
            return result;
          },
        },
      },
    });
    console.log(this);
  }
}
