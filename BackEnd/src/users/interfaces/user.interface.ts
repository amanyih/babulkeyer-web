import { Document } from 'mongoose';

export interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  adminType: string;
  status: boolean;
  createdAt: Date;
}
