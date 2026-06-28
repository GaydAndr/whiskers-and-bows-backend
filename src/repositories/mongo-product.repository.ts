import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProductRepository } from './product.repository';
import { Product, CategoryName } from '../shared/types';
import { ProductDocument } from '../schemas/product.schema';

@Injectable()
export class MongoProductRepository implements IProductRepository {
  constructor(@InjectModel(ProductDocument.name) private productModel: Model<ProductDocument>) {}

  private mapDocumentToProduct(doc: any): Product {
    return {
      ...doc.toObject(),
      id: doc._id.toString(),
    };
  }

  async findAll(): Promise<Product[]> {
    const docs = await this.productModel.find().exec();
    return docs.map(doc => this.mapDocumentToProduct(doc));
  }

  async findById(id: string): Promise<Product | null> {
    const doc = await this.productModel.findById(id).exec();
    return doc ? this.mapDocumentToProduct(doc) : null;
  }

  async findByCategory(category: CategoryName): Promise<Product[]> {
    const docs = await this.productModel.find({ category }).exec();
    return docs.map(doc => this.mapDocumentToProduct(doc));
  }

  async search(query: string): Promise<Product[]> {
    const docs = await this.productModel.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ],
    }).exec();
    return docs.map(doc => this.mapDocumentToProduct(doc));
  }

  async create(product: Partial<Product>): Promise<Product> {
    const createdProduct = new this.productModel(product);
    const savedProduct = await createdProduct.save();
    return this.mapDocumentToProduct(savedProduct);
  }

  async update(id: string, product: Partial<Product>): Promise<Product | null> {
    const doc = await this.productModel.findByIdAndUpdate(id, product, { returnDocument: 'after' }).exec();
    return doc ? this.mapDocumentToProduct(doc) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
