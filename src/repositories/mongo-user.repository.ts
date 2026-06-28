import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserRepository } from './user.repository';
import { User } from '../shared/types';
import { UserDocument } from '../schemas/user.schema';

@Injectable()
export class MongoUserRepository implements IUserRepository {
  constructor(@InjectModel(UserDocument.name) private userModel: Model<UserDocument>) {}

  private mapDocumentToUser(doc: any): User {
    return {
      ...doc.toObject(),
      id: doc._id.toString(),
    };
  }

  async findById(id: string): Promise<User | null> {
    const doc = await this.userModel.findById(id).exec();
    return doc ? this.mapDocumentToUser(doc) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const doc = await this.userModel.findOne({ email }).exec();
    return doc ? this.mapDocumentToUser(doc) : null;
  }

  async findByToken(token: string): Promise<User | null> {
    const doc = await this.userModel.findOne({ resetPasswordToken: token }).exec();
    return doc ? this.mapDocumentToUser(doc) : null;
  }

  async create(user: Partial<User>): Promise<User> {
    const createdUser = new this.userModel(user);
    const savedUser = await createdUser.save();
    return this.mapDocumentToUser(savedUser);
  }

  async update(id: string, user: Partial<User>): Promise<User | null> {
    const doc = await this.userModel.findByIdAndUpdate(id, user, { returnDocument: 'after' }).exec();
    return doc ? this.mapDocumentToUser(doc) : null;
  }
}
