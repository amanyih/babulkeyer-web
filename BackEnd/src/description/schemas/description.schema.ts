import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class DescriptionSchema {
  @Prop({ required: true })
  page: string;

  @Prop({ required: true })
  description: string;
}

export const descriptionSchema =
  SchemaFactory.createForClass(DescriptionSchema);
