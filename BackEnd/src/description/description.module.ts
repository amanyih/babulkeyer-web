import { Module } from '@nestjs/common';
import { DescriptionController } from './controllers/description/description.controller';
import { DescriptionService } from './services/description/description.service';
import { MongooseModule } from '@nestjs/mongoose';
import { descriptionSchema } from './schemas/description.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Description', schema: descriptionSchema },
    ]),
  ],
  controllers: [DescriptionController],
  providers: [DescriptionService],
})
export class DescriptionModule {}
