import { Controller } from '@nestjs/common';
import {
  Get,
  Post,
  Delete,
  Param,
  Body,
  Put,
  Patch,
} from '@nestjs/common/decorators';
import { CreateDescriptionDto } from 'src/description/dtos/create-description.dto';
import { UpdateDescriptionDto } from 'src/description/dtos/update-description.dto';
import { DescriptionService } from 'src/description/services/description/description.service';

@Controller('description')
export class DescriptionController {
  constructor(private readonly descriptionService: DescriptionService) {}

  @Get()
  async getAll() {
    return await this.descriptionService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    return await this.descriptionService.getById(id);
  }

  @Get('/page/:page')
  async getByPage(@Param('page') page: string) {
    return await this.descriptionService.getByPage(page);
  }

  @Post()
  async create(@Body() createData: CreateDescriptionDto) {
    return await this.descriptionService.create(createData);
  }

  @Patch('/:id')
  async update(
    @Body() updateData: UpdateDescriptionDto,
    @Param('id') id: string,
  ) {
    return await this.descriptionService.update(id, updateData);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.descriptionService.delete(id);
  }
}
