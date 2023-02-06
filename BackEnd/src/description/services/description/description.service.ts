import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDescriptionDto } from 'src/description/dtos/create-description.dto';
import { UpdateDescriptionDto } from 'src/description/dtos/update-description.dto';
import { IDescription } from 'src/description/interfaces/description.interface';

@Injectable()
export class DescriptionService {
  constructor(
    @InjectModel('Description') private DescriptionModel: Model<IDescription>,
  ) {}

  async getAll(): Promise<IDescription[]> {
    try {
      const descriptionData = await this.DescriptionModel.find().exec();

      if (!descriptionData || descriptionData.length == 0) {
        throw new NotFoundException('Description Data not Found!');
      }
      return descriptionData;
    } catch (err) {
      throw err;
    }
  }

  async getById(id: string): Promise<IDescription> {
    try {
      const descriptionData = await this.DescriptionModel.findById(id).exec();

      if (!descriptionData) {
        throw new NotFoundException('Description Data Not Found!');
      }
      return descriptionData;
    } catch (err) {
      throw err;
    }
  }

  async create(createData: CreateDescriptionDto) {
    try {
      const descriptionData = await this.DescriptionModel.create(createData);
      return descriptionData;
    } catch (err) {
      throw err;
    }
  }
  async getByPage(page: string): Promise<IDescription[]> {
    try {
      const descriptionData = await this.DescriptionModel.find({
        page: page,
      }).exec();

      if (!descriptionData || descriptionData.length == 0) {
        throw new NotFoundException('Description Data Not Found!');
      }

      return descriptionData;
    } catch (err) {
      throw err;
    }
  }

  async update(
    id: string,
    updateData: UpdateDescriptionDto,
  ): Promise<IDescription> {
    try {
      const updatedData = await this.DescriptionModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true },
      ).exec();
      if (!updateData) {
        throw new NotFoundException('Update Data Not Found!');
      }
      return updatedData;
    } catch (err) {
      throw err;
    }
  }

  async delete(id: string): Promise<IDescription> {
    try {
      const deletedData = await this.DescriptionModel.findByIdAndDelete(
        id,
      ).exec();
      if (!deletedData) {
        throw new NotFoundException('Delete Data Not Found!');
      }
      return deletedData;
    } catch (err) {
      throw err;
    }
  }
}
