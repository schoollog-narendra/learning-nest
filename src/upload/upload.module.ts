import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Upload, UploadSchema } from './schemas/upload.schema';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Upload.name, schema: UploadSchema }]),
    MulterModule.register(),
    AuthModule,
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
