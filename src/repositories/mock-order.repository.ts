import { Injectable } from '@nestjs/common';
import { IOrderRepository } from './order.repository';
import { Order } from '@whiskers-bows/shared';

@Injectable()
export class MockOrderRepository implements IOrderRepository {
  private orders: Order[] = [];

  async create(order: Partial<Order>): Promise<Order> {
    const newOrder: Order = {
      id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      userId: order.userId || '',
      items: order.items || [],
      totalAmount: order.totalAmount || 0,
      status: order.status || 'Pending',
      paymentMethod: order.paymentMethod || 'Cash',
      shippingAddress: order.shippingAddress || {
        firstName: '',
        lastName: '',
        city: '',
        novaPoshtaBranch: '',
        phone: '',
        email: '',
      },
      createdAt: new Date(),
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  async findById(id: string): Promise<Order | null> {
    return this.orders.find((o) => o.id === id) || null;
  }

  async findByUserId(userId: string): Promise<Order[]> {
    return this.orders.filter((o) => o.userId === userId);
  }
 
  async findAll(): Promise<Order[]> {
    return this.orders;
  }
 
  async updateStatus(

    id: string,
    status: Order['status'],
  ): Promise<Order | null> {
    const index = this.orders.findIndex((o) => o.id === id);
    if (index === -1) return null;
    this.orders[index].status = status;
    return this.orders[index];
  }
}
