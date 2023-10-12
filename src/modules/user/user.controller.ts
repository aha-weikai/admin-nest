import { Auth, User, UserEntity } from '@/decorators/auth';
import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user_info')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth()
  @Get()
  getUserInfo(@User() user: UserEntity) {
    return user;
  }

  @Post('update')
  updateUserInfo(data) {
    console.log(data);
  }
}
