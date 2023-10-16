import { Controller, Post, Body, Res, Get } from '@nestjs/common';

import { UserService } from './user.service';
import { UserSchema } from './entity/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('signup')
  async create(@Res() response, @Body() user: UserSchema): Promise<UserSchema> {
    return this.usersService.create(user, response);
  }

  @Get('login')
  async login(
    @Res() response,
    @Body('userName') userName: string,
    @Body('userPassword') userPassword: string,
  ): Promise<UserSchema> {
    return this.usersService.login(userName, userPassword, response);
  }
}
