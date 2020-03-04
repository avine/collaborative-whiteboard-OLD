import { ObjectId } from 'mongodb';

import { getDefaultDb } from '../../core/db/db-params';
import { Whiteboard, WhiteboardUser } from './whiteboard.types';

const getWhiteboards = async () => {
  const db = await getDefaultDb();
  return db.collection<Whiteboard>('whiteboards');
};

// eslint-disable-next-line import/prefer-default-export
export const insertWhiteboard = async (
  title: string,
  users: WhiteboardUser[],
  data: any[] = []
) =>
  (await getWhiteboards()).insertOne({
    title,
    users,
    data
  });

export const findWhiteboardById = async (id: string) =>
  (await getWhiteboards()).findOne({
    _id: new ObjectId(id)
  });