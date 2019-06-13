import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type ToolType =
  | 'drawLine'
  | 'redraw'
  | 'undo'
  | 'redo'
  | 'cut'
  | 'undoAll'
;

export type ToolMode =
  | 'click'
  | 'toggle'
;

export interface Tool {
  type: ToolType;
  mode: ToolMode;
  icon: IconDefinition;
}
