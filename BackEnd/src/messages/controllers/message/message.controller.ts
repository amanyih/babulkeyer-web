import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Redirect,
} from '@nestjs/common';

import { MessageDto } from 'src/messages/dtos/message.dto';
import { MessageService } from 'src/messages/services/message/message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @Redirect('http://127.0.0.1:5502/contact.html', 301)
  @Post()
  async addMessage(@Body() messageDto: MessageDto) {
    return await this.messageService.addMessage(messageDto);
  }
  @Get(':id')
  async getMessage(@Param('id') id: string) {
    return await this.messageService.getMessage(id);
  }
  @Delete(':id')
  async deleteMessage(@Param('id') id: string) {
    return await this.messageService.deleteMessage(id);
  }

  @Get()
  async getAllMessages() {
    return await this.messageService.getAllMessages();
  }
}
