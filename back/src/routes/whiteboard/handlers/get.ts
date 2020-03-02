import { RequestHandler } from 'express';
import HttpStatus from 'http-status-codes';
import { ObjectId } from 'mongodb';

import { getDefaultDb } from '../../../db/db.params';
import { Whiteboard } from '../whiteboard.types';

const getWhiteboardHandler: RequestHandler = async (req, res) => {
  const { whiteboardId } = req.params;

  const db = await getDefaultDb();
  const whiteboards = db.collection<Whiteboard>('whiteboards');
  const whiteboard = await whiteboards.findOne({
    _id: new ObjectId(whiteboardId)
  });

  if (!whiteboard) {
    res.sendStatus(HttpStatus.NOT_FOUND);
    return;
  }
  if (!whiteboard.users.find(user => user.id === req.tokenData.sub)) {
    res.sendStatus(HttpStatus.FORBIDDEN);
    return;
  }
  res.send(whiteboard);
};

export default getWhiteboardHandler;
