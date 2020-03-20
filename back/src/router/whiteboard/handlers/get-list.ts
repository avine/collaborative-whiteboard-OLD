import { RequestHandler } from 'express';
import { Response } from 'express-serve-static-core';

import { getWhiteboardList } from '../../../db/whiteboard';
import { mapToWhiteboardPublic } from '../whiteboard.mapper';
import { WhiteboardPublicListItem } from '../whiteboard.types';

const getWhiteboardListHandler: RequestHandler = async (
  req,
  res: Response<WhiteboardPublicListItem[]>
) => {
  const { userId } = req;

  const whiteboards = await (
    await getWhiteboardList(userId as string)
  ).toArray();

  const whiteboardsPublic = whiteboards.map(mapToWhiteboardPublic);
  res.send(whiteboardsPublic);
};

export default getWhiteboardListHandler;
