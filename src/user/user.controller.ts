import { Controller, Post, Body, Res, Get, HttpStatus } from '@nestjs/common';

import { UserService } from './user.service';
import { UserSchema } from './entity/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('signup')
  async create(@Res() response, @Body() user: UserSchema): Promise<UserSchema> {
    const signupResponse = this.usersService.create(user, response);
    try {
      return response.status(HttpStatus.OK).json({
        message: 'SignUp completed',
        signupResponse: signupResponse,
      });
    } catch (error) {
      return signupResponse;
    }
  }

  @Get('login')
  async login(
    @Res() response,
    @Body('userName') userName: string,
    @Body('userPassword') userPassword: string,
  ): Promise<UserSchema> {
    const loginResponse = this.usersService.login(
      userName,
      userPassword,
      response,
    );
    try {
      return response.status(HttpStatus.OK).json({
        message: 'SignUp completed',
        loginResponse,
      });
    } catch (error) {
      return loginResponse;
    }

    return;
  }
}
