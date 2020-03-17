import { ObjectId } from 'mongodb';

import { getDefaultDb } from '../../core/db';
import { DrawEvent } from '../../shared/collaborative-whiteboard.types';
import { Whiteboard, WhiteboardUser } from './whiteboard.types';

const getWhiteboardsCollection = async () => {
  const db = await getDefaultDb();
  return db.collection<Whiteboard>('whiteboards');
};

export const insertWhiteboard = async (
  title: string,
  users: WhiteboardUser[],
  events: DrawEvent[] = []
) =>
  (await getWhiteboardsCollection()).insertOne({
    title,
    creationDate: Date.now(),
    users,
    events
  });

export const findWhiteboardById = async (id: string) =>
  (await getWhiteboardsCollection()).findOne({
    _id: new ObjectId(id)
  });

export const setWhiteboardData = async (id: string, events: DrawEvent[]) => {
  return (await getWhiteboardsCollection()).updateOne(
    { _id: new ObjectId(id) },
    { $set: { events } }
  );
};

export const pushWhiteboardData = async (id: string, events: DrawEvent[]) => {
  return (await getWhiteboardsCollection()).updateOne(
    { _id: new ObjectId(id) },
    { $push: { events: { $each: events } } }
  );
};

export const pullWhiteboardData = async (id: string, hashes: string[]) => {
  return (await getWhiteboardsCollection()).updateOne(
    { _id: new ObjectId(id) },
    { $pull: { events: { hash: { $in: hashes } } } }
  );
};
