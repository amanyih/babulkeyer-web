import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  userName: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true, enum: ['superAdmin', 'admin'], default: 'admin' })
  adminType: string;
  @Prop({ required: true, default: false })
  status: boolean;
  @Prop({ required: true, default: new Date() })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
