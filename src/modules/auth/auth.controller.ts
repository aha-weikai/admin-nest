import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { FormDataRequest } from 'nestjs-form-data';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() data: RegisterDto) {
    const user = await this.authService.register(data);
    Reflect.deleteProperty(user, 'password');
    return {};
  }

  @Post('login')
  @FormDataRequest()
  async login(@Body() data: LoginDto) {
    const token = await this.authService.login(data);
    return token;
  }

  @Get('refresh_token')
  @UseGuards(AuthGuard('jwt'))
  refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }

  @Get('public_key')
  getPublicKey() {
    return this.authService.getPublicKey();
  }

  @Get('svg_captcha')
  getSvgCaptcha() {}
}
