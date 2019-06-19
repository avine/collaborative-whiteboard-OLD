import {
    faBorderNone, faCut, faFilm, faPaintBrush, faRedoAlt, faTrash, faUndoAlt
} from '@fortawesome/free-solid-svg-icons';

const drawLine = faPaintBrush;
const undo = faUndoAlt;
const redo = faRedoAlt;
const cut = faCut;
const undoAll = faTrash;
const redraw = faFilm;
const noGuides = faBorderNone;

export const whiteboardIcons = { drawLine, undo, redo, cut, undoAll, redraw, noGuides };
