import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() data: RegisterDto) {
    const user = await this.authService.register(data);
    Reflect.deleteProperty(user, 'password');
    return user;
  }

  @Post('/login')
  async login(@Body() data: LoginDto) {
    const user = await this.authService.login(data);
    return user;
  }
}
