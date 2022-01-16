import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { encodePassword } from '../utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findOne(username: string): Promise<User> {
    return this.userModel
      .findOne({ username: username })
      .populate({ path: 'widgetlist', populate: [{ path: 'services' }] })
      .exec();
  }

  async create(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    newUser.password = encodePassword(user.password);
    return newUser.save();
  }

  async update(id: string, user: User): Promise<User> {
    user.password = encodePassword(user.password);
    return this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async updateAdmin(id: string, user: User): Promise<User> {
    user.password = encodePassword(user.password);
    return this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndRemove(id);
  }
}
