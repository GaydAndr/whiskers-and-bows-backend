import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '@whiskers-bows/shared';

@Schema({ timestamps: true })
export class UserDocument extends Document implements User {
  id: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password?: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true, enum: ['CUSTOMER', 'ADMIN'] })
  role: 'CUSTOMER' | 'ADMIN';

  @Prop()
  resetPasswordToken?: string;

  @Prop()
  resetPasswordExpires?: Date;

  @Prop({ type: Object, required: true })
  address: {
    city: string;
    novaPoshtaBranch: string;
  };

  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
