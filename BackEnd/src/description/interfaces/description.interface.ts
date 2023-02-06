import { Document } from 'mongoose';

export interface IDescription extends Document {
  page: String;
  description: String;
}
