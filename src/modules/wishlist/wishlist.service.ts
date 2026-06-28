import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { WishlistDocument } from '../../schemas/wishlist.schema';
import { ProductDocument } from '../../schemas/product.schema';

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel(WishlistDocument.name) private wishlistModel: Model<WishlistDocument>,
    @InjectModel(ProductDocument.name) private productModel: Model<ProductDocument>,
  ) {}

  async getWishlistDocument(userId: string): Promise<WishlistDocument> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new NotFoundException('Invalid User ID');
    }
    let wishlist = await this.wishlistModel.findOne({ userId: new Types.ObjectId(userId) }).exec();
    if (!wishlist) {
      wishlist = await this.wishlistModel.create({ userId: new Types.ObjectId(userId), items: [] });
    }
    return wishlist;
  }

  async getWishlist(userId: string) {
    const wishlist = await this.getWishlistDocument(userId);

    const itemsWithDetails = await Promise.all(
      wishlist.items.map(async (item) => {
        const product = await this.productModel.findById(item.productId).exec();
        const variation = product?.variations.find(v => v.id === item.variationId);
        
        return {
          id: item.productId,
          productId: item.productId,
          variationId: item.variationId,
          name: product?.name || 'Unknown Product',
           image: product?.images[0] || '',
           images: product?.images || [],
          price: variation?.price || 0,
          details: variation ? `${variation.width}, ${variation.length}, ${variation.hardware}` : '',
        };
      }),
    );

    return {
      ...wishlist.toObject(),
      items: itemsWithDetails,
    };
  }

  async addToWishlist(userId: string, productId: string, variationId: string): Promise<WishlistDocument> {
    if (!Types.ObjectId.isValid(productId)) {
      throw new NotFoundException('Invalid Product ID');
    }
    const wishlist = await this.getWishlistDocument(userId);
    const exists = wishlist.items.some(item => item.productId.toString() === productId && item.variationId === variationId);

    if (!exists) {
      wishlist.items.push({ productId: new Types.ObjectId(productId), variationId });
      try {
        return await wishlist.save();
      } catch (error) {
        console.error('Error saving wishlist:', error);
        throw new Error('Could not save wishlist item');
      }
    }
    return wishlist;
  }

  async removeFromWishlist(userId: string, productId: string, variationId: string): Promise<WishlistDocument> {
    const wishlist = await this.getWishlistDocument(userId);
    wishlist.items = wishlist.items.filter(item => !(item.productId.toString() === productId && item.variationId === variationId));
    return wishlist.save();
  }
}
