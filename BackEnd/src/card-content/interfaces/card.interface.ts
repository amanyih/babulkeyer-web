import { Document } from 'mongoose';
export interface ICard extends Document {
  header: String;
  description: String;
  image: String;
}
