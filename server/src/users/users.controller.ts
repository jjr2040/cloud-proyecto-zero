import { Controller, Request, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {

  @UseGuards(AuthGuard())
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
}
