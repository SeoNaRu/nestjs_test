import { Controller, Get, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { IUser } from 'src/schemas/user.schema';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async create(@Res() response, @Body() user: IUser): Promise<IUser> {
    try {
      const signup = await this.usersService.create(user);
      return response.status(HttpStatus.OK).json({
        message: 'SingnUp completed',
        signup,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }

    // return this.usersService.create(user);
  }

  @Get()
  async findAll(): Promise<IUser[]> {
    return this.usersService.findAll();
  }

  @Post('login')
  async login(
    @Res() response,
    @Body('userName') userName: string,
    @Body('userPassword') userPassword: string,
  ): Promise<IUser> {
    try {
      const loginUser = await this.usersService.login(userName, userPassword);
      return response.status(HttpStatus.OK).json({
        message: 'Login completed',
        loginUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
