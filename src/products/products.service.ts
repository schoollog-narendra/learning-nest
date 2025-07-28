import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async create(data: { name: string; description: string; price: number }, userId: string) {
    const newProduct = new this.productModel({ ...data, createdBy: new Types.ObjectId(userId) });
    return newProduct.save();
  }

  async findAll() {
    return this.productModel.find().populate('createdBy', 'name email').exec();
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).populate('createdBy', 'name email').exec();
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async findUserProducts(userId: string) {
    return this.productModel.find({ createdBy: userId }).exec();
  }

  async update(id: string, data: any, userId: string) {
    const product = await this.productModel.findById(id);
    if (!product) throw new NotFoundException('Product not found');

    if (product.createdBy.toString() !== userId) {
      throw new ForbiddenException('You can only update your own products');
    }

    Object.assign(product, data);
    return product.save();
  }
}
