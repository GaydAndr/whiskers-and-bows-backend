import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument } from '../../schemas/product.schema';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class ImageService {
  constructor(@InjectModel(ProductDocument.name) private productModel: Model<ProductDocument>) {
    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async deleteImage(url: string): Promise<{ success: boolean }> {
    try {
      const publicId = this.getPublicIdFromUrl(url);
      if (!publicId) return { success: false };

      await cloudinary.uploader.destroy(publicId);
      return { success: true };
    } catch (error) {
      console.error('Cloudinary delete error:', error);
      return { success: false };
    }
  }

  async deleteImagesBulk(urls: string[]): Promise<void> {
    try {
      const publicIds = urls
        .map(url => this.getPublicIdFromUrl(url))
        .filter((id): id is string => id !== null);

      if (publicIds.length === 0) return;

      await cloudinary.api.delete_resources(publicIds);
    } catch (error) {
      console.error('Cloudinary bulk delete error:', error);
    }
  }

  private getPublicIdFromUrl(url: string): string | null {
    const regex = /\/v\d+\/(.+)\.[a-z]{3,4}$/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }
}
