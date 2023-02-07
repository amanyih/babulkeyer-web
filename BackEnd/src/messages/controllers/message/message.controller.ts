import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { MessageDto } from 'src/messages/dtos/message.dto';
import { MessageService } from 'src/messages/services/message/message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @Post()
  async addMessage(@Body() messageDto: MessageDto) {
    return await this.messageService.addMessage(messageDto);
  }
  @Get(':id')
  async getMessage(@Param('id') id: string) {
    try {
      return await this.messageService.getMessage(id);
    } catch {
      return null;
    }
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
