

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user';

export class UsersRepository {
  constructor(
    @InjectModel('User')
    private userModel: Model<User>,
  ) {}

  async createOne(user): Promise<any> {
    const result = await this.userModel.create(user);
    return result;
  }

  async findOne(email): Promise<any> {
    const result = await this.userModel.findOne({ email: email });
    return result;
  }

  async updateOne(user, appointment): Promise<any> {
    const result = await this.userModel.updateOne(
      { _id: user },
      { $push: { appointments: appointment } },
    );
    return result;
  }

  async removeOne(user, appointment): Promise<any> {
    const result = await this.userModel.findOneAndUpdate(
      { _id: user },
      { $pullAll: { appointments: [appointment] } },
    );
    return result;
  }
}