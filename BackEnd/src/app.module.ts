import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardContentModule } from './card-content/card-content.module';
import { CardController } from './card-content/controllers/card/card.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DescriptionModule } from './description/description.module';
@Module({
  imports: [
    CardContentModule,
    MongooseModule.forRoot('mongodb://localhost:27017/', {
      dbName: 'BabulKeyerDB',
    }),
    DescriptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
