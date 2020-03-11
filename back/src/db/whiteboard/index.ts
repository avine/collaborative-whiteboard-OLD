import { ObjectId } from 'mongodb';

import { getDefaultDb } from '../../core/db';
import { DrawEvent } from './collaborative-whiteboard.types';
import { Whiteboard, WhiteboardUser } from './whiteboard.types';

const getWhiteboardsCollection = async () => {
  const db = await getDefaultDb();
  return db.collection<Whiteboard>('whiteboards');
};

export const insertWhiteboard = async (
  title: string,
  users: WhiteboardUser[],
  data: DrawEvent[] = []
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

export const setWhiteboardData = async (id: string, events: DrawEvent[]) => {
  return (await getWhiteboardsCollection()).updateOne(
    { _id: new ObjectId(id) },
    { $set: { data: events } }
  );
};

export const pushWhiteboardData = async (id: string, events: DrawEvent[]) => {
  return (await getWhiteboardsCollection()).updateOne(
    { _id: new ObjectId(id) },
    { $push: { data: { $each: events } } }
  );
};

export const pullWhiteboardData = async (id: string, events: DrawEvent[]) => {
  const hashes = events.map(event => event.hash);
  return (await getWhiteboardsCollection()).updateOne(
    { _id: new ObjectId(id) },
    { $pull: { data: { hash: { $in: hashes } } } }
  );
};
