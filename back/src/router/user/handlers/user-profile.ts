import { RequestHandler } from 'express';
import HttpStatus from 'http-status-codes';

import { findUserById } from '../../../db/user';
import { mapToUserProfile } from '../user.mapper';

const userProfileHandler: RequestHandler = async (req, res) => {
  const { userId } = req;

  const user = await findUserById(userId as string);
  if (!user) {
    res.sendStatus(HttpStatus.NOT_FOUND);
    return;
  }

  const userProfile = mapToUserProfile(user);
  res.send(userProfile);
};

export default userProfileHandler;
