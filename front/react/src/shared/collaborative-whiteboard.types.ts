import { DrawEvent } from '../collaborative-whiteboard/models';

export type WhiteboardUserRole = 'author' | 'contributor' | 'subscriber';

export interface WhiteboardUser {
  id: string;
  role: WhiteboardUserRole;
  username: string;
}

export interface Whiteboard {
  _id: string; // MongoDB ObjectId
  title: string;
  creationDate: number;
  users: WhiteboardUser[];
  events: DrawEvent[];
}
