import {
  HttpStatus,
  Injectable,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSchema } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel('Users') private UsersModule: Model<UserSchema>) {}

  async create(user: UserSchema, @Res() response): Promise<UserSchema> {
    const createdCat = await new this.UsersModule(user).save();
    try {
      // await createdCat.save();
      return response.status(HttpStatus.OK).json({
        message: 'SignUp completed',
        user: createdCat,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  async login(
    userName: string,
    userPassword: string,
    @Res() response,
  ): Promise<UserSchema> {
    const user = await this.UsersModule.findOne({
      name: userName,
      password: userPassword,
    }).exec();

    try {
      if (!user) {
        throw new UnauthorizedException('Account that does not exist');
      }
      return response.status(HttpStatus.OK).json({
        message: 'SignUp completed',
        user,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }
}
