import { ObjectId } from 'mongodb';

import { getDefaultDb } from '../../core/db';
import { Whiteboard, WhiteboardUser } from './whiteboard.types';

const getWhiteboardsCollection = async () => {
  const db = await getDefaultDb();
  return db.collection<Whiteboard>('whiteboards');
};

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

export const setWhiteboardData = async (id: string, events: any[]) => {
  return (await getWhiteboardsCollection()).updateOne(
    { _id: new ObjectId(id) },
    { $set: { data: events } }
  );
};

export const pushWhiteboardData = async (id: string, events: any[]) => {
  return (await getWhiteboardsCollection()).updateOne(
    { _id: new ObjectId(id) },
    { $push: { data: { $each: events } } }
  );
};

// TODO: improve this method to simply accept the list of hash `string[]`
// (instead of the full list of events...)
export const pullWhiteboardData = async (id: string, events: any[]) => {
  return (await getWhiteboardsCollection()).updateOne(
    { _id: new ObjectId(id) },
    { $pull: { data: { $in: events } } }
  );
};
