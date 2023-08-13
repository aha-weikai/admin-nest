import { registerAs } from '@nestjs/config';

// token：作为命名空间
// 通过这个api，返回的数据可以通过nest提供的工具获取数据类型
export default registerAs('app', () => ({
  name: 'kaixin',
  city: 'suqian',
}));
