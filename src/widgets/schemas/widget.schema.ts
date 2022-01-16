import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Service } from '../../services/schemas/service.schema';

export type WidgetDocument = Widget & Document;

@Schema({ timestamps: true })
export class Widget {
  @Prop({ unique: true, required: true })
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }] })
  services: Service[];

  @Prop()
  request: string;

  @Prop()
  token: string;
}

export const WidgetSchema = SchemaFactory.createForClass(Widget);
