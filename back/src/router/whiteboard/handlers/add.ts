import { RequestHandler } from 'express';
import HttpStatus from 'http-status-codes';

import validateSchema from '../../../core/common/validate-schema';
import { findUserById } from '../../../db/user';
import { insertWhiteboard } from '../../../db/whiteboard';
import { whiteboardAddSchema } from '../whiteboard.schemas';

const addWhiteboardHandler: RequestHandler = async (req, res) => {
  const errors = validateSchema(whiteboardAddSchema, req.body);
  if (errors) {
    res.sendStatus(HttpStatus.BAD_REQUEST);
    return;
  }

  const user = await findUserById(req.userId as string);
  if (!user) {
    res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
    return;
  }

  const insert = await insertWhiteboard(req.body.title, [
    {
      id: req.userId as string,
      role: 'author',
      username: user.email // TODO: add `user.utils.ts` with `getUsername` method...
    }
  ]);

  if (insert.insertedCount) {
    res.sendStatus(HttpStatus.OK);
  } else {
    res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
  }
};

export default addWhiteboardHandler;
