import { Controller, Post, Body, Get, Query, Param, Patch } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from '@whiskers-bows/shared';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  async create(@Body() body: any) {
    return this.orderService.createOrder(body);
  }

  @Get('user')
  async getUserOrders(@Query('userId') userId: string) {
    return this.orderService.getUserOrders(userId);
  }

  @Get('admin/all')
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body() body: { status: Order['status'] }) {
    return this.orderService.updateOrderStatus(id, body.status);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.orderService.getOrder(id);
  }
}
