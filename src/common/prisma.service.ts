import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { CustomPrismaClientFactory } from 'nestjs-prisma';

// @Injectable()
// export class PrismaService extends PrismaClient {
//   aa: any;
//   constructor() {
//     super({
//       // log: ['query'],
//     });
//   }
//   async onModuleInit() {
//     await this.$connect();
//   }
// }

export const extendedPrismaClient = new PrismaClient().$extends({
  /* extension */
  model: {
    $allModels: {
      // eslint-disable-next-line prettier/prettier
      async createData(this, data) {
        // Get the current model at runtime
        const context = Prisma.getExtensionContext(this);
        console.log(context);
        const result = await context.create({ data });
        return result;
      },
    },
  },
});

export type ExtendedPrismaClient = typeof extendedPrismaClient;

@Injectable()
export class PrismaService
  implements CustomPrismaClientFactory<ExtendedPrismaClient>
{
  constructor() {
    // TODO inject any other service here like the `ConfigService`
  }

  createPrismaClient(): ExtendedPrismaClient {
    // you could pass options to your `PrismaClient` instance here
    return extendedPrismaClient;
  }
}

// @Injectable()
// export class PrismaService extends PrismaClient {
//   constructor() {
//     super({
//       // log: ['query'],
//     });
//   }
// }
