import { Document } from 'mongoose';
export interface Ipartner extends Document {
  name: string;
  image: string;
}
