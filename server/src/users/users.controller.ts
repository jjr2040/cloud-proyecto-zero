import { Controller, Req, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('sign-in')
  signIn(@Body() user: User) {
    return this.usersService.save(user);
  }
}
