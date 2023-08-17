import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get(':id')
  getUserInfo(@Param() id) {
    console.log(`output-id`, id);
    console.log(typeof id.id);
    return id;
  }

  @Post('/update')
  updateUserInfo(data) {
    console.log(data);
  }
}
