import { ObjectId } from 'mongodb';

import { DrawEvent } from './collaborative-whiteboard.types';

export type WhiteboardUserRole = 'author' | 'contributor' | 'subscriber';

export interface WhiteboardUser {
  id: string;
  role: WhiteboardUserRole;
  username: string;
}

export interface Whiteboard {
  _id: ObjectId;
  title: string;
  creationDate: number;
  users: WhiteboardUser[];
  data: DrawEvent[];
}
