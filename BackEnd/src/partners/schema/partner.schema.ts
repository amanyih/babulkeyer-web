import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Partner {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  image: string;
}

export const PartnerSchema = SchemaFactory.createForClass(Partner);
