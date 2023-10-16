import { Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSchema } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel('Users') private UsersModule: Model<UserSchema>) {}

  async create(user: UserSchema, @Res() response): Promise<UserSchema> {
    const signup = await new this.UsersModule(user).save();
    try {
      return signup;
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  async login(
    userName: string,
    userPassword: string,
    @Res() response,
  ): Promise<UserSchema> {
    const loginUser = await this.UsersModule.findOne({
      name: userName,
      password: userPassword,
    }).exec();

    try {
      if (!loginUser) {
        throw new UnauthorizedException('Account that does not exist');
      }
      return loginUser;
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }
}
