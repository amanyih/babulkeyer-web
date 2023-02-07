import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardContentModule } from './card-content/card-content.module';
import { CardController } from './card-content/controllers/card/card.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DescriptionModule } from './description/description.module';
import { PartnersModule } from './partners/partners.module';
@Module({
  imports: [
    CardContentModule,
    MongooseModule.forRoot(
      'mongodb+srv://Cluster15688:RWpEeWVYR0Fa@cluster15688.l30kuvi.mongodb.net/?retryWrites=true&w=majority',
      {
        dbName: 'BabulKeyerDB',
      },
    ),
    DescriptionModule,
    PartnersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
