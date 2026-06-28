import { Order } from './shared/types';

export interface IOrderRepository {
  create(order: Partial<Order>): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  findByUserId(userId: string): Promise<Order[]>;
  findAll(): Promise<Order[]>;
  updateStatus(id: string, status: Order['status']): Promise<Order | null>;
}
