import { UsersService } from './../users/users.service';
import { User } from './../users/user.entity';
import { Controller, Request, Post, UseGuards, Logger, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('sign-up')
  async signIn(@Body() user: User) {

    const newUser = await this.usersService.save(user);

    if (newUser) {
      return this.authService.login(newUser);
    }

    return new UnauthorizedException();
  }

}
