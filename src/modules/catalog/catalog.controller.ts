import { Controller, Post, Body, Get, Query, Patch, Param, Delete } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import type { CategoryName } from '../shared/types';

@Controller('products')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Post()
  async create(@Body() body: any) {
    return this.catalogService.createProduct(body);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.catalogService.updateProduct(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.catalogService.deleteProduct(id);
  }

  @Get()
  async findAll(
    @Query('category') category?: CategoryName,
    @Query('search') search?: string,
  ) {
    if (search) {
      return this.catalogService.searchProducts(search);
    }
    if (category) {
      return this.catalogService.getProductsByCategory(category);
    }
    return this.catalogService.getAllProducts();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.catalogService.getProductById(id);
  }
}
