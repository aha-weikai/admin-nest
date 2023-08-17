import { PrismaClient } from '@prisma/client';
import { registerDecorator, ValidationOptions } from 'class-validator';

// 自定义 dto 的校验规则
/**
 * @description 判断字段的值在数据库中是否---不存在
 * @param table 数据库表名
 * @param field 校验的字段名
 * @param validationOptions 校验的信息说明
 * @returns boolean
 */
export function IsExists(
  table: string,
  fields: string[],
  validationOptions?: ValidationOptions,
) {
  // object = new Dto()
  // propertyName: Dto中的属性名
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsExists',
      target: object.constructor, //class Dto,
      propertyName: propertyName,
      // constraints: ,约束条件,@Length(3,6); 3,6就是约束条件
      options: validationOptions,
      validator: {
        // value: any, args: ValidationArguments
        async validate(value: any) {
          const prisma = new PrismaClient();
          const data = await prisma[table].findFirst({
            where: {
              OR: fields.map((field) => ({ [field]: value })),
            },
          });
          return Boolean(data); // you can return a Promise<boolean> here as well, if you want to make async validation
        },
      },
    });
  };
}
