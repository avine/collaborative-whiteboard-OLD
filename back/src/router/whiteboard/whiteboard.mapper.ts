import { Whiteboard } from '../../db/whiteboard/whiteboard.types';
import { WhiteboardPublic } from './whiteboard.types';

// eslint-disable-next-line import/prefer-default-export
export const mapToWhiteboardPublic = (
  whiteboard: Whiteboard
): WhiteboardPublic => {
  const data = { id: whiteboard._id.toHexString(), ...whiteboard };
  delete data._id;
  return data;
};
