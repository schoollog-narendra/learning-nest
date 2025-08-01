import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Upload } from './schemas/upload.schema';
import { Model } from 'mongoose';

@Injectable()
export class UploadService {
  constructor(
    @InjectModel(Upload.name) private readonly uploadModel: Model<Upload>,
  ) {}

  async saveFile(userId: string, filename: string): Promise<Upload> {
    const url = `http://localhost:8000/uploads/${filename}`;
    const upload = new this.uploadModel({
      userId,
      url,
      timestamp: new Date(),
    });
    return upload.save();
  }
}
