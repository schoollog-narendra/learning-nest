/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Patch, Param, Body, UseGuards, Req, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts(
  @Query('maxPrice') maxPrice: number = Infinity, 
  @Query('minPrice') minPrice: number = 0, 
  @Query('page') page: number = 1, 
  @Query('searchString') searchString: string = '', 
  @Query('limit') limit: number = 10
) {
  return this.productsService.findAll({minPrice:Number(minPrice), maxPrice:Number(maxPrice), page:Number(page), searchString, limit:Number(limit)});
}

  @UseGuards(JwtAuthGuard)
  @Get('my-products')
  async getMyProducts(@Req() req) {
    return this.productsService.findUserProducts(req.user.sub);
  }


  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createProduct(@Body() body: { name: string; description: string; price: number }, @Req() req) {
    return this.productsService.create(body, req.user.sub);
  }

  

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateProduct(@Param('id') id: string, @Body() body: any, @Req() req) {
    return this.productsService.update(id, body, req.user.sub);
  }
}
