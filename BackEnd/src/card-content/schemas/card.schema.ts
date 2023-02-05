import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Card {
  @Prop({ required: true })
  page: string;

  @Prop({ required: true })
  header: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  image: string;
}

export const CardSchema = SchemaFactory.createForClass(Card);
