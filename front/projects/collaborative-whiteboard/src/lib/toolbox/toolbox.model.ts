import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type ToolboxActionType =
  | 'drawLine'
  | 'undo'
  | 'redo'
  | 'cut'
  | 'undoAll'
;

export interface ToolboxAction {
  type: ToolboxActionType;
  icon: IconDefinition;
}
