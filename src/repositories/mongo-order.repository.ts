import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IOrderRepository } from './order.repository';
import { Order } from '@whiskers-bows/shared';
import { OrderDocument } from '../schemas/order.schema';

@Injectable()
export class MongoOrderRepository implements IOrderRepository {
  constructor(@InjectModel(OrderDocument.name) private orderModel: Model<OrderDocument>) {}

  private mapDocumentToOrder(doc: any): Order {
    return {
      ...doc.toObject(),
      id: doc._id.toString(),
    };
  }

  async create(order: Partial<Order>): Promise<Order> {
    const createdOrder = new this.orderModel(order);
    const savedOrder = await createdOrder.save();
    return this.mapDocumentToOrder(savedOrder);
  }

  async findById(id: string): Promise<Order | null> {
    const doc = await this.orderModel.findById(id).exec();
    return doc ? this.mapDocumentToOrder(doc) : null;
  }

  async findByUserId(userId: string): Promise<Order[]> {
    const docs = await this.orderModel.find({ userId }).exec();
    return docs.map(doc => this.mapDocumentToOrder(doc));
  }

  async findAll(): Promise<Order[]> {
    const docs = await this.orderModel.find().sort({ createdAt: -1 }).exec();
    return docs.map(doc => this.mapDocumentToOrder(doc));
  }

  async updateStatus(id: string, status: Order['status']): Promise<Order | null> {
    const doc = await this.orderModel.findByIdAndUpdate(id, { status }, { returnDocument: 'after' }).exec();
    return doc ? this.mapDocumentToOrder(doc) : null;
  }
}
