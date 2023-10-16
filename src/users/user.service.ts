import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private UsersModule: Model<IUser>) {}

  async create(Users: IUser): Promise<IUser> {
    const createdCat = new this.UsersModule(Users);
    return createdCat.save();
  }

  async findAll(): Promise<IUser[]> {
    return this.UsersModule.find().exec();
  }

  async login(userName: string, userPassword: string): Promise<IUser> {
    const user = await this.UsersModule.findOne({
      name: userName,
      password: userPassword,
    }).exec();

    if (!user) {
      throw new UnauthorizedException('Invalid credentials'); // 잘못된 자격 증명
    }

    return user;
  }
}
