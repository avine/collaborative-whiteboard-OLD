import { RequestHandler } from 'express';
import HttpStatus from 'http-status-codes';

import { findWhiteboardById } from '../../../db/whiteboard';
import { mapToWhiteboardPublic } from '../whiteboard.mapper';

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

  const whiteboardPublic = mapToWhiteboardPublic(whiteboard);
  res.send(whiteboardPublic);
};

export default getWhiteboardHandler;
