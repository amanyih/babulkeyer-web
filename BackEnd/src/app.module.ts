import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardContentModule } from './card-content/card-content.module';
import { CardController } from './card-content/controllers/card/card.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DescriptionModule } from './description/description.module';
import { PartnersModule } from './partners/partners.module';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { ImageUploadModule } from './image-upload/image-upload.module';
@Module({
  imports: [
    CardContentModule,
    MongooseModule.forRoot(
      'mongodb+srv://amanuel:test1234@cluster0.8yo5agg.mongodb.net/?retryWrites=true&w=majority',
      {
        dbName: 'BabulKeyerDB',
      },
    ),
    MessagesModule,
    DescriptionModule,
    PartnersModule,
    UsersModule,
    ImageUploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
