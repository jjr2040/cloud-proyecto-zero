import { Controller, Request, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('sign-in')
  signIn(@Body() user: User) {
    return this.usersService.save(user);
  }

  @UseGuards(AuthGuard())
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
}
