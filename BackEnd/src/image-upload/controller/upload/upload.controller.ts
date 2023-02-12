import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadService } from 'src/image-upload/services/upload/upload.service';

@Controller('upload')
export class uploadController {
  constructor(private readonly imageService: uploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.imageService.uploadImageToCloudinary(file);
  }
}
