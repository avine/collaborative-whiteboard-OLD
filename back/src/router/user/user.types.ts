import { User } from '../../db/user/user.types';

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserToken {
  token: string;
  expiresIn: number;
}

export interface UserProfile extends Omit<User, '_id' | 'password'> {
  id: string;
}
