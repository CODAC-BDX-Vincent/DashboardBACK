import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Widget } from 'src/widgets/entities/widget.entity';

export type ServiceDocument = Service & Document;

@Schema({ timestamps: true })
export class Service {
  @Prop({ unique: true, required: true })
  name: string;

  @Prop()
  widgets: [Widget];

  @Prop()
  request: string;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
