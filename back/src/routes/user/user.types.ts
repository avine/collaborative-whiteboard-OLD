import { ObjectID } from 'mongodb';

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserDetails {
  firstName?: string;
  lastName?: string;
}

export interface User extends UserLogin, UserDetails {
  _id: ObjectID;
}

export type UserPublic = Omit<User, 'password'>;
