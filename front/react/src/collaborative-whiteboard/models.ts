export type Owner = number | string;

export interface CanvasSize {
  width: number;
  height: number;
}

export type CanvasPoint = [number, number];

export type CanvasLine = [number, number, number, number];

export type CanvasLineSerie = number[];

export type DrawType = 'point' | 'line' | 'lineSerie' | 'clear';

export interface DrawOptions {
  lineWidth: number;
  strokeStyle: string;
}

export interface DrawBase {
  hash: string;
  owner: Owner;
  type: DrawType;
  options: DrawOptions;
}

export interface DrawPoint extends DrawBase {
  type: 'point';
  data: CanvasPoint;
}

export interface DrawLine extends DrawBase {
  type: 'line';
  data: CanvasLine;
}

export interface DrawLineSerie extends DrawBase {
  type: 'lineSerie';
  data: CanvasLineSerie;
}

export interface DrawClear extends DrawBase {
  type: 'clear';
  data: CanvasLine;
}

export type DrawEvent = DrawPoint | DrawLine | DrawLineSerie | DrawClear;

export interface DrawEventsBroadcast {
  animate: boolean;
  events: DrawEvent[];
}

export type DrawAction = 'add' | 'remove';

export interface DrawTransport {
  action: DrawAction;
  events: DrawEvent[];
}

export type CutRange = [number, number];

export type CutRangeArg = CutRange | number;
