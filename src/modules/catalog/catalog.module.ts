import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';
import { IProductRepository } from '../../repositories/product.repository';
import { MongoProductRepository } from '../../repositories/mongo-product.repository';
import { ProductDocument, ProductSchema } from '../../schemas/product.schema';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ProductDocument.name, schema: ProductSchema }]),
  ],
  controllers: [CatalogController, ImageController],
  providers: [
    CatalogService,
    {
      provide: 'IProductRepository',
      useClass: MongoProductRepository,
    },
    ImageService,
  ],
  exports: [CatalogService],
})
export class CatalogModule {}
