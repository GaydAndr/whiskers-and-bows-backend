import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import type { Product, ProductVariation, CategoryName } from '@whiskers-bows/shared';

@Schema({ timestamps: true })
export class ProductDocument extends Document implements Product {
  id: string;

  @Prop({ required: true, unique: true })
  sku: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: ['Collars', 'Harnesses', 'Leashes', 'Semi-choke', 'Sets'] })
  category: CategoryName;

  @Prop({ required: true })
  basePrice: number;

  @Prop({ type: [String], required: true })
  images: string[];

  @Prop({ type: Array })
  variations: ProductVariation[];

  @Prop()
  sizeChart?: string;

  @Prop()
  additionalInfo?: string;

  @Prop({ required: true })
  isSale: boolean;

  @Prop()
  salePrice?: number;

  @Prop({ required: true })
  declare isNew: boolean;

  @Prop({ required: true, default: true })
  isAvailable: boolean;

  @Prop({ type: Array, required: true })
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export const ProductSchema = SchemaFactory.createForClass(ProductDocument);
