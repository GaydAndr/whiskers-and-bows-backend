import { Controller, Get, Post, Delete, Body, Query } from '@nestjs/common';
import { WishlistService } from './wishlist.service';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  async getWishlist(@Query('userId') userId: string) {
    return this.wishlistService.getWishlist(userId);
  }

  @Post('add')
  async addToWishlist(@Body() body: { userId: string; productId: string; variationId: string }) {
    return this.wishlistService.addToWishlist(body.userId, body.productId, body.variationId);
  }

  @Delete('remove')
  async removeFromWishlist(@Body() body: { userId: string; productId: string; variationId: string }) {
    return this.wishlistService.removeFromWishlist(body.userId, body.productId, body.variationId);
  }
}
