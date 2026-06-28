import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MongoOrderRepository } from '../../repositories/mongo-order.repository';
import { OrderDocument, OrderSchema } from '../../schemas/order.schema';
import { CartModule } from '../cart/cart.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OrderDocument.name, schema: OrderSchema }]),
    CartModule,
    EmailModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, MongoOrderRepository],
  exports: [OrderService],
})
export class OrderModule {}
