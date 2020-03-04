import { ObjectID } from 'mongodb';

export interface WhiteboardUser {
  id: string;
  admin: boolean;
}

export interface Whiteboard {
  _id: ObjectID;
  title: string;
  // createdAt: string; // TODO
  // lastModifiedAt: string; // TODO
  users: WhiteboardUser[];
  data: any[];
}
