import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Order, OrderItem } from '../shared/types';

@Schema({ timestamps: true })
export class OrderDocument extends Document implements Order {
  id: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  orderNumber: number;

  @Prop({ type: Array, required: true })
  items: OrderItem[];

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ required: true, enum: ['Pending', 'Paid', 'Shipped', 'Delivered', 'Cancelled'] })
  status: 'Pending' | 'Paid' | 'Shipped' | 'Delivered' | 'Cancelled';

  @Prop({ required: true, enum: ['Card', 'Cash'] })
  paymentMethod: 'Card' | 'Cash';

  @Prop({ type: Object, required: true })
  shippingAddress: {
    firstName: string;
    lastName: string;
    city: string;
    novaPoshtaBranch: string;
    phone: string;
    email: string;
    comment?: string;
  };

  createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(OrderDocument);


