import { Module } from '@nestjs/common';
import { CardController } from './controllers/card/card.controller';
import { CardService } from './services/card/card.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CardSchema } from './schemas/card.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Card', schema: CardSchema }])],
  controllers: [CardController],
  providers: [CardService],
})
export class CardContentModule {}
