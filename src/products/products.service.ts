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

 async findAll({ minPrice, maxPrice , page , searchString , limit  }) {
  const filterQuery: any = {
    price: { $gte: minPrice, $lte: maxPrice },
  };

  if (searchString?.trim().length>0) {
    filterQuery['$or'] = [
      { name: { $regex: searchString, $options: "i" } },
      { description: { $regex: searchString, $options: "i" } },
    ];
  }

  const totalCount = await this.productModel.countDocuments(filterQuery);
  const data = await this.productModel
    .find(filterQuery)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    

  return {
    data,
    totalPages: Math.ceil(totalCount / limit),
    totalCount
  };
}


  async findOne(_id: string) {
    const product = await this.productModel.findById(_id).populate('createdBy', 'name email').exec();
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async findUserProducts(userId: string) {
    const product = await this.productModel.find({ createdBy: new Types.ObjectId(userId) }).exec();
    return product;
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
