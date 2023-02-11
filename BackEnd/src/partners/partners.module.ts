import { Module } from '@nestjs/common';
import { PartnersController } from './controllers/partners/partners.controller';
import { PartnersService } from './services/partners/partners.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Partner, PartnerSchema } from './schema/partner.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Partner.name, schema: PartnerSchema }]),
  ],
  controllers: [PartnersController],
  providers: [PartnersService],
})
export class PartnersModule {}
