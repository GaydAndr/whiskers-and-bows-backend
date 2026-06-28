import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class CartDocument extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  userId: Types.ObjectId;

  @Prop([
    {
      productId: { type: Types.ObjectId, ref: 'Product', required: true },
       variationId: { type: String },
      quantity: { type: Number, required: true, min: 1 },
    },
  ])
  items: { productId: Types.ObjectId; variationId: string; quantity: number }[];
}

export const CartSchema = SchemaFactory.createForClass(CartDocument);
