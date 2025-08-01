import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Upload extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  url: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const UploadSchema = SchemaFactory.createForClass(Upload);
