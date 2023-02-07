import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDto } from 'src/messages/dtos/message.dto';
import { IMessage } from 'src/messages/interfaces/message.interface';
import { Message } from 'src/messages/schemas/message.interface';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<IMessage>,
  ) {}
  async addMessage(message: MessageDto): Promise<IMessage> {
    const newMessage = new this.messageModel(message);
    newMessage.createdAt = new Date();
    let newMess: IMessage;
    try {
      newMess = await newMessage.save();
    } catch (err) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    if (newMess) {
      return newMess;
    } else {
      throw new HttpException("Couldn't Add Message", HttpStatus.BAD_REQUEST);
    }
  }
  async getMessage(id: string): Promise<IMessage> {
    const message = await this.messageModel.findById(id);
    if (!message) {
      throw new NotFoundException('Message Not Found');
    }
    return message;
  }
  async deleteMessage(id: string): Promise<IMessage> {
    let message: IMessage;
    try {
      message = await this.messageModel.findOneAndDelete({ id }).exec();
      if (message) {
        return message;
      } else {
        throw new NotFoundException('Message Not Found');
      }
    } catch (e) {
      throw new NotFoundException('Message Not Found');
    }
  }
  async getAllMessages(): Promise<IMessage[]> {
    const messages = await this.messageModel.find();
    if (!messages || messages.length === 0) {
      throw new NotFoundException('No Message Found');
    } else {
      return messages;
    }
  }
}
