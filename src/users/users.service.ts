import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { EmailService } from '../email/email.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private emailService: EmailService,
  ) {}

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
    
    const savedUser = await newUser.save();
    
    // Send email notification
    try {
      await this.emailService.sendUserCreatedNotification({
        name: userData.name,
        email: userData.email,
      });
    } catch (error) {
      console.error('Failed to send email notification:', error);
      // Don't fail the user creation if email fails
    }
    
    return savedUser;
  }
  async findByEmail(email: string) {
  return this.userModel.findOne({ email }).exec();
}
}
