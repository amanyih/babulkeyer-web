import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Message {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  statement: string;

  @Prop({ required: true })
  createdAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
