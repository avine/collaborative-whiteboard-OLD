import { Whiteboard } from '../../db/whiteboard/whiteboard.types';

export interface WhiteboardPublic extends Omit<Whiteboard, '_id'> {
  id: string;
}

export type WhiteboardPublicListItem = Pick<
  WhiteboardPublic,
  'id' | 'title' | 'creationDate'
>;
