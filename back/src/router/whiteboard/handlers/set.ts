import { RequestHandler } from 'express';
import HttpStatus from 'http-status-codes';

import { findWhiteboardById, setWhiteboardData } from '../../../db/whiteboard';
import { DrawEvent } from '../../../shared/collaborative-whiteboard.types';

const setWhiteboardHandler: RequestHandler = async (req, res) => {
  const { whiteboardId } = req.params;
  const whiteboard = await findWhiteboardById(whiteboardId);
  if (!whiteboard) {
    res.sendStatus(HttpStatus.NOT_FOUND);
    return;
  }

  if (
    !whiteboard.users.find(
      user => user.id === req.userId && user.role === 'author'
    )
  ) {
    res.sendStatus(HttpStatus.FORBIDDEN);
    return;
  }

  const events: DrawEvent[] = req.body; // TODO: validate schema...
  const update = await setWhiteboardData(whiteboardId, events);
  if (update.modifiedCount) {
    res.sendStatus(HttpStatus.OK);
  } else {
    res.send(HttpStatus.INTERNAL_SERVER_ERROR);
  }
};

export default setWhiteboardHandler;
