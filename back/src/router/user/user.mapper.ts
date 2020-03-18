import { User } from '../../db/user/user.types';
import { UserProfile } from './user.types';

export const mapToUserProfile = (user: User): UserProfile => {
  const data = { id: user._id.toHexString(), ...user };
  delete data._id;
  delete data.password;
  return data;
};
