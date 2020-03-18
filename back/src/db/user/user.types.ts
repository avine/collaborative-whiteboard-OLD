import { ObjectId } from 'mongodb';

export interface User {
  _id: ObjectId;
  email: string;
  password: string;
  signUpDate: number;
  signInDate: number;
  firstName?: string;
  lastName?: string;
}
