import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWidgetDto } from './dto/create-widget.dto';
import { UpdateWidgetDto } from './dto/update-widget.dto';
import { Widget } from './entities/widget.entity';

@Injectable()
export class WidgetsService {
  constructor(
    @InjectModel('Widget') private readonly widgetModel: Model<Widget>,
  ) {}
  async create(widget: Widget): Promise<Widget> {
    const newWidget = new this.widgetModel(widget);
    return newWidget.save();
  }
  async findAll(): Promise<Widget[]> {
    return this.widgetModel.find();
  }
  async findOne(id: string): Promise<Widget> {
    return this.widgetModel.findOne({ _id: id });
  }

  async update(id: string, widget: Widget): Promise<Widget> {
    return this.widgetModel.findByIdAndUpdate(id, widget, { new: true });
  }

  async remove(id: string): Promise<Widget> {
    return this.widgetModel.findByIdAndRemove(id);
  }
}
