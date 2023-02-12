import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCardDto } from 'src/card-content/dtos/create-card.dto';
import { UpdateCardDto } from 'src/card-content/dtos/update-card.dto';
import { ICard } from 'src/card-content/interfaces/card.interface';

@Injectable()
export class CardService {
  constructor(@InjectModel('Card') private CardModel: Model<ICard>) {}

  async getAll(): Promise<ICard[]> {
    const cardData = await this.CardModel.find();

    if (!cardData || cardData.length == 0) {
      throw new NotFoundException('Card Data Not Found!');
    }
    return cardData;
  }

  async getCardByPage(page: string): Promise<ICard[]> {
    let cardData: ICard[];

    try {
      cardData = await this.CardModel.find({ page: page });
    } catch (err) {
      throw err;
    }
    if (!cardData || cardData.length == 0) {
      throw new NotFoundException('Card Data Not Found!');
    }
    return cardData;
  }

  async getCardById(id: string): Promise<ICard> {
    let cardData;
    try {
      cardData = await this.CardModel.findById(id).exec();
    } catch (err) {
      throw new NotFoundException('Card Data not Found!');
    }

    if (!cardData) {
      throw new NotFoundException('Card Data Not Found!');
    }

    return cardData;
  }

  async deleteCard(id: string): Promise<ICard> {
    let deletedCardData;
    try {
      deletedCardData = await this.CardModel.findByIdAndDelete(id);
    } catch (err) {
      throw new NotFoundException('To be Deleted Card Not Found');
    }

    if (!deletedCardData) {
      throw new NotFoundException('Card Data Not Found!');
    }
    return deletedCardData;
  }

  async updateCard(id: string, updateCardDto: UpdateCardDto): Promise<ICard> {
    let updatedCard;
    try {
      updatedCard = await this.CardModel.findByIdAndUpdate(id, updateCardDto);
    } catch (err) {
      throw new NotFoundException('To Be Updated Card Not Found');
    }

    if (!updatedCard) {
      throw new NotFoundException('Card Data Not Found!');
    }
    return await this.getCardById(id);
  }

  async createCard(createCardDto: CreateCardDto): Promise<ICard> {
    console.log('in the service');
    try {
      const cardData = await this.CardModel.create(createCardDto);
      return cardData;
    } catch (err) {
      console.log(createCardDto, 'the data');
      throw err;
    }
  }
}
