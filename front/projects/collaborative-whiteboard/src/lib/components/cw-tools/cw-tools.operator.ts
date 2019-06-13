import {
    faCut, faPaintBrush, faPlay, faRedoAlt, faTrash, faUndoAlt
} from '@fortawesome/free-solid-svg-icons';

import { Tool } from './cw-tools.model';

const drawLine = faPaintBrush;
const redraw = faPlay;
const undo = faUndoAlt;
const redo = faRedoAlt;
const cut = faCut;
const undoAll = faTrash;

export const getDefaultTools = (): Tool[] => ([
  { type: 'drawLine', mode: 'toggle', icon: drawLine },
  { type: 'redraw', mode: 'click', icon: redraw },
  { type: 'undo', mode: 'click', icon: undo },
  { type: 'redo', mode: 'click', icon: redo },
  { type: 'cut', mode: 'toggle', icon: cut },
  { type: 'undoAll', mode: 'click', icon: undoAll }
]);
