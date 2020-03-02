import { ObjectID } from 'mongodb';

export interface WhiteboardUser {
  id: string;
  admin: boolean;
}

export interface Whiteboard {
  _id: ObjectID;
  title: string;
  users: WhiteboardUser[]; // TODO: add index on `users.id` field
  data: any[];
}
