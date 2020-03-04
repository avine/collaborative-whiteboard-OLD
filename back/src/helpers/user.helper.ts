import { User } from '../db/user/user.types';

// eslint-disable-next-line import/prefer-default-export
export const getUsername = (user: User) => {
  if (user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`;
  }
  return user.email;
};
