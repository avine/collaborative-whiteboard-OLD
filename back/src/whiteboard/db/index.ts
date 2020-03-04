import { ObjectId } from 'mongodb';

import { getDefaultDb } from '../../core/db';
import { Whiteboard, WhiteboardUser } from './whiteboard.types';

const getWhiteboardsCollection = async () => {
  const db = await getDefaultDb();
  return db.collection<Whiteboard>('whiteboards');
};

// eslint-disable-next-line import/prefer-default-export
export const insertWhiteboard = async (
  title: string,
  users: WhiteboardUser[],
  data: any[] = []
) =>
  (await getWhiteboardsCollection()).insertOne({
    title,
    creationDate: Date.now(),
    users,
    data
  });

export const findWhiteboardById = async (id: string) =>
  (await getWhiteboardsCollection()).findOne({
    _id: new ObjectId(id)
  });
