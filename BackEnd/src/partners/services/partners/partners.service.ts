import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Partner } from 'src/partners/schema/partner.schema';
import { CreatePartnerDto } from 'src/partners/dtos/create-partner.dto';
import { UpdatePartnerDto } from 'src/partners/dtos/update-partner.dto';
import { Ipartner } from 'src/partners/interface/partner.interface';

@Injectable()
export class PartnersService {
  constructor(
    @InjectModel(Partner.name) private partnerModel: Model<Ipartner>,
  ) {}
  async create(createPartnerDto: CreatePartnerDto): Promise<Ipartner> {
    const newPartner = new this.partnerModel(createPartnerDto);
    return newPartner.save();
  }

  async findAll(): Promise<Ipartner[]> {
    let partnerData: Ipartner[];
    try {
      partnerData = await this.partnerModel.find();
    } catch (err) {
      throw new NotFoundException('No partners found');
    }
    if (!partnerData || partnerData.length == 0) {
      throw new NotFoundException('Partner not found!');
    }
    return partnerData;
  }

  async update(
    id: string,
    updatePartnerDto: UpdatePartnerDto,
  ): Promise<Ipartner> {
    let updatedPartner;
    try {
      updatedPartner = await this.partnerModel.findByIdAndUpdate(
        id,
        updatePartnerDto,
      );
    } catch (err) {
      throw new NotFoundException('Partner not found');
    }

    if (!updatedPartner) {
      throw new NotFoundException('Partner not found!');
    }
    return await this.partnerModel.findById(id);
  }

  async remove(id: string): Promise<Ipartner> {
    let removedPartnerData: Ipartner;
    try {
      removedPartnerData = await this.partnerModel.findByIdAndDelete(id);
    } catch (err) {
      throw new NotFoundException('Partner not found');
    }

    if (!removedPartnerData) {
      throw new NotFoundException('Partner Not Found!');
    }
    return removedPartnerData;
  }
}
