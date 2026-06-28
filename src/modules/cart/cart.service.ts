import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CartDocument } from '../../schemas/cart.schema';
import { ProductDocument } from '../../schemas/product.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(CartDocument.name) private cartModel: Model<CartDocument>,
    @InjectModel(ProductDocument.name) private productModel: Model<ProductDocument>,
  ) {}

  async getCartDocument(userId: string): Promise<CartDocument> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new NotFoundException('Invalid User ID');
    }
    let cart = await this.cartModel.findOne({ userId: new Types.ObjectId(userId) }).exec();
    if (!cart) {
      cart = await this.cartModel.create({ userId: new Types.ObjectId(userId), items: [] });
    }
    return cart;
  }

  async getCart(userId: string) {
    const cart = await this.getCartDocument(userId);

    const itemsWithDetails = await Promise.all(
      cart.items.map(async (item) => {
        const product = await this.productModel.findById(item.productId).exec();
        const variation = product?.variations.find(v => v.id === item.variationId);
        
        return {
          id: item.productId,
          productId: item.productId,
          variationId: item.variationId,
          quantity: item.quantity,
          name: product?.name || 'Unknown Product',
           image: product?.images[0] || '',
           images: product?.images || [],
          price: variation?.price || 0,
          details: variation ? `${variation.width}, ${variation.length}, ${variation.hardware}` : '',
        };
      }),
    );

    return {
      ...cart.toObject(),
      items: itemsWithDetails,
    };
  }

  async addToCart(userId: string, productId: string, variationId: string, quantity: number = 1): Promise<CartDocument> {
    if (!Types.ObjectId.isValid(productId)) {
      throw new NotFoundException('Invalid Product ID');
    }
    const cart = await this.getCartDocument(userId);
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId && item.variationId === variationId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId: new Types.ObjectId(productId), variationId, quantity });
    }

    try {
      return await cart.save();
    } catch (error) {
      console.error('Error saving cart:', error);
      throw new Error('Could not save item to cart');
    }
  }

  async removeFromCart(userId: string, productId: string, variationId: string): Promise<CartDocument> {
    const cart = await this.getCartDocument(userId);
    cart.items = cart.items.filter(item => !(item.productId.toString() === productId && item.variationId === variationId));
    return cart.save();
  }

  async updateQuantity(userId: string, productId: string, variationId: string, quantity: number): Promise<CartDocument> {
    const cart = await this.getCartDocument(userId);
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId && item.variationId === variationId);
    
    if (itemIndex === -1) throw new NotFoundException('Item not found in cart');
    
    if (quantity <= 0) {
      return this.removeFromCart(userId, productId, variationId);
    }

    cart.items[itemIndex].quantity = quantity;
    return cart.save();
  }

  async clearCart(userId: string): Promise<void> {
    await this.cartModel.updateOne({ userId: new Types.ObjectId(userId) }, { items: [] });
  }
}
