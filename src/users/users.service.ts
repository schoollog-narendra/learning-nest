import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().select('-__v').exec();
  }

  async create(userData: { name: string; email: string; password: string }): Promise<User | {error:string}> {
    const existingUser = await this.userModel.findOne({ email: userData.email }).exec();
    if (existingUser) {
      return { error: 'User already exists' };
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = new this.userModel({
      ...userData,
      password: hashedPassword,
    });
    return newUser.save();
  }
  async findByEmail(email: string) {
  return this.userModel.findOne({ email }).exec();
}
}
