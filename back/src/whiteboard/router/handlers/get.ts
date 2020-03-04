import { RequestHandler } from 'express';
import HttpStatus from 'http-status-codes';

import { findWhiteboardById } from '../../db';

const getWhiteboardHandler: RequestHandler = async (req, res) => {
  const { whiteboardId } = req.params;
  const whiteboard = await findWhiteboardById(whiteboardId);
  if (!whiteboard) {
    res.sendStatus(HttpStatus.NOT_FOUND);
    return;
  }

  if (!whiteboard.users.find(user => user.id === req.userId)) {
    res.sendStatus(HttpStatus.FORBIDDEN);
    return;
  }

  res.send(whiteboard);
};

export default getWhiteboardHandler;
