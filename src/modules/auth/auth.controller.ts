import { Auth } from '@/decorators/auth';
import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

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
  @Auth()
  async refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }

  @Get('public_key')
  async getPublicKey() {
    return this.authService.getPublicKey();
  }
}
