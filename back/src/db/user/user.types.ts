import { ObjectId } from 'mongodb';

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserDetails {
  signUpDate: number;
  signInDate: number;
  firstName?: string;
  lastName?: string;
}

export interface User extends UserLogin, UserDetails {
  _id: ObjectId;
}

export type UserPublic = Omit<User, 'password'>;
