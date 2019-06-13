import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type ToolboxActionType =
  | 'drawLine'
  | 'redraw'
  | 'undo'
  | 'redo'
  | 'cut'
  | 'undoAll'
;

export type ToolboxActionMode =
  | 'click'
  | 'toggle'
;

export interface ToolboxAction {
  type: ToolboxActionType;
  mode: ToolboxActionMode;
  icon: IconDefinition;
}
