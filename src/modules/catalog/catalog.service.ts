import { Injectable, Inject } from '@nestjs/common';
import type { IProductRepository } from '../../repositories/product.repository';
import type { Product, CategoryName } from '../shared/types';

@Injectable()
export class CatalogService {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async getProductById(id: string): Promise<Product | null> {
    return this.productRepository.findById(id);
  }

  async getProductsByCategory(category: CategoryName): Promise<Product[]> {
    return this.productRepository.findByCategory(category);
  }

  async searchProducts(query: string): Promise<Product[]> {
    return this.productRepository.search(query);
  }

  async createProduct(data: Partial<Product>): Promise<Product> {
    return this.productRepository.create(data);
  }

  async updateProduct(id: string, data: Partial<Product>): Promise<Product | null> {
    return this.productRepository.update(id, data);
  }

  async deleteProduct(id: string): Promise<boolean> {
    return this.productRepository.delete(id);
  }
}
