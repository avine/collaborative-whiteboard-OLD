import { RequestHandler } from 'express';
import HttpStatus from 'http-status-codes';

import validateSchema from '../../../common/validate-schema';
import { getDefaultDb } from '../../../db/db-params';
import { whiteboardAddSchema } from '../whiteboard.schemas';
import { Whiteboard } from '../whiteboard.types';

const addWhiteboardHandler: RequestHandler = async (req, res) => {
  const errors = validateSchema(whiteboardAddSchema, req.body);
  if (errors) {
    res.sendStatus(HttpStatus.BAD_REQUEST);
    return;
  }

  const db = await getDefaultDb();
  const whiteboards = db.collection<Whiteboard>('whiteboards');
  const insert = await whiteboards.insertOne({
    title: req.body.title,
    users: [{ id: req.userId as string, admin: true }],
    data: []
  });

  if (insert.insertedCount) {
    res.sendStatus(HttpStatus.OK);
  } else {
    res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
  }
};

export default addWhiteboardHandler;
