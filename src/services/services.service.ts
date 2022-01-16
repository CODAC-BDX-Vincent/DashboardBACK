import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service } from './schemas/service.schema';
import { CreateServiceDto } from './dto/create-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel('Service') private readonly serviceModel: Model<Service>,
  ) {}
  async create(service: CreateServiceDto): Promise<Service> {
    const newService = new this.serviceModel(service);
    return newService.save();
  }

  async findAll(): Promise<Service[]> {
    return this.serviceModel.find();
  }

  async findOne(id: string): Promise<Service> {
    return this.serviceModel.findOne({ _id: id });
  }

  async update(id: string, service: CreateServiceDto): Promise<Service> {
    return this.serviceModel.findByIdAndUpdate(id, service, { new: true });
  }
  async remove(id: string): Promise<Service> {
    return this.serviceModel.findByIdAndRemove(id);
  }
}
