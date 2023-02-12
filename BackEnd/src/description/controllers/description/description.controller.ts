import { Controller } from '@nestjs/common';
import {
  Get,
  Post,
  Delete,
  Param,
  Body,
  Put,
  Patch,
  UseGuards,
} from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
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
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createData: CreateDescriptionDto) {
    return await this.descriptionService.create(createData);
  }
  @UseGuards(AuthGuard('jwt'))
  @Patch('/:id')
  async update(
    @Body() updateData: UpdateDescriptionDto,
    @Param('id') id: string,
  ) {
    return await this.descriptionService.update(id, updateData);
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.descriptionService.delete(id);
  }
}
