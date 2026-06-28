import { Injectable, NotFoundException } from '@nestjs/common';
import { MongoOrderRepository } from '../../repositories/mongo-order.repository';
import { Order } from '@whiskers-bows/shared';
import { CartService } from '../cart/cart.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDocument } from '../../schemas/order.schema';
import { EmailService } from '../email/email.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(OrderDocument.name) private orderModel: Model<OrderDocument>,
    private orderRepository: MongoOrderRepository,
    private cartService: CartService,
    private emailService: EmailService,
  ) {}

  async createOrder(orderData: Partial<Order>): Promise<Order> {
    const lastOrder = await this.orderModel.findOne().sort({ orderNumber: -1 }).exec();
    const nextOrderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1001;

    const orderWithDefaults = {
      ...orderData,
      orderNumber: nextOrderNumber,
      status: orderData.status || 'Pending',
    };
    const order = await this.orderRepository.create(orderWithDefaults);
    
    if (orderData.userId) {
      await this.cartService.clearCart(orderData.userId);
    }
    
    try {
      await this.emailService.sendOrderConfirmationEmail(order);
    } catch (e) {
      console.error('Failed to send order confirmation email:', e);
    }
    
    return order;
  }

  async getOrder(id: string): Promise<Order | null> {
    return this.orderRepository.findById(id);
  }

  async getUserOrders(userId: string): Promise<Order[]> {
    return this.orderRepository.findByUserId(userId);
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }

  async updateOrderStatus(id: string, status: Order['status']): Promise<Order> {
    const updated = await this.orderRepository.updateStatus(id, status);
    if (!updated) throw new NotFoundException('Order not found');
    
    try {
      await this.emailService.sendOrderStatusUpdateEmail(updated);
    } catch (e) {
      console.error('Failed to send order status update email:', e);
    }
    
    return updated;
  }
}
