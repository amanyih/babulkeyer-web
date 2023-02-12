import { Module } from '@nestjs/common';
import { uploadController } from './controller/upload/upload.controller';
import { CloudinaryProvider } from './provider/cloudinary.provider';
import { uploadService } from './services/upload/upload.service';

@Module({
  controllers: [uploadController],
  providers: [uploadService, CloudinaryProvider],
  exports: [CloudinaryProvider, uploadService],
})
export class ImageUploadModule {}
