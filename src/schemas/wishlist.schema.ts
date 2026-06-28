import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class WishlistDocument extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  userId: Types.ObjectId;

  @Prop([
    {
      productId: { type: Types.ObjectId, ref: 'Product', required: true },
       variationId: { type: String },
    },
  ])
  items: { productId: Types.ObjectId; variationId: string }[];
}

export const WishlistSchema = SchemaFactory.createForClass(WishlistDocument);
