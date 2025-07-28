import { Controller, Get, Post, Patch, Param, Body, UseGuards, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts() {
    return this.productsService.findAll();
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
  @Get('my-products')
  async getMyProducts(@Req() req) {
    return this.productsService.findUserProducts(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateProduct(@Param('id') id: string, @Body() body: any, @Req() req) {
    return this.productsService.update(id, body, req.user.sub);
  }
}
