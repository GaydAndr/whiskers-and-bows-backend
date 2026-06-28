import { Controller, Get, Post, Patch, Delete, Body, Query } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCart(@Query('userId') userId: string) {
    return this.cartService.getCart(userId);
  }

  @Post('add')
  async addToCart(@Body() body: { userId: string; productId: string; variationId: string; quantity: number }) {
    return this.cartService.addToCart(body.userId, body.productId, body.variationId, body.quantity || 1);
  }

  @Patch('update')
  async updateQuantity(@Body() body: { userId: string; productId: string; variationId: string; quantity: number }) {
    return this.cartService.updateQuantity(body.userId, body.productId, body.variationId, body.quantity);
  }

  @Delete('remove')
  async removeFromCart(@Body() body: { userId: string; productId: string; variationId: string }) {
    return this.cartService.removeFromCart(body.userId, body.productId, body.variationId);
  }

  @Delete('clear')
  async clearCart(@Query('userId') userId: string) {
    return this.cartService.clearCart(userId);
  }
}
