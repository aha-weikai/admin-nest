import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get('user_info')
  getUserInfo(@Request() req) {
    return req.user;
  }

  @Post('update')
  updateUserInfo(data) {
    console.log(data);
  }
}
