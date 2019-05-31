import {
    BroadcastDrawEvents, CanvasSize, CutHistory, CutRange, CutRangeArg, DrawClear, DrawEvent, DrawOptions
} from './collaborative-whiteboard.model';

export const getDefaultCanvasSize = (): CanvasSize => ({
  width: 300,
  height: 300
});

export const getDefaultDrawOptions = (): DrawOptions => ({
  lineWidth: 3,
  strokeStyle: '#2196f3'
});

export const getEmptyDrawOptions = (): DrawOptions => ({
  lineWidth: undefined,
  strokeStyle: undefined
});

export const getClearEvent = (): DrawClear => ({
  type: 'clear',
  data: [undefined, undefined, undefined, undefined],
  options: getEmptyDrawOptions()
});

export const drawLineSerieToLinesMapper = (events: DrawEvent[]): DrawEvent[] => {
  const result: DrawEvent[] = [];
  events.forEach(event => {
    if (event.type === 'lineSerie') {
      const { options, data } = event;
      for (let i = 0; i < data.length - 3; i = i + 2) {
        result.push({
          type: 'line',
          options,
          data: [data[i], data[i + 1], data[i + 2], data[i + 3]]
        });
      }
    } else {
      result.push(event);
    }
  });
  return result;
};

export const broadcastDrawEventsMapper = (
  events: DrawEvent[],
  animate = false
): BroadcastDrawEvents => ({
  animate,
  events: animate ? drawLineSerieToLinesMapper(events) : events
});

export const normalizeCutRange = (data: CutRangeArg, maxLength: number): CutRange => {
  const range = Array.isArray(data) ? [...data].sort() : [data, data];
  const applyLimits = (n: number) => Math.max(0, Math.min(maxLength - 1, n));
  return range.map(applyLimits) as CutRange;
};

export const keepDrawEventsAfterClearEvent = (events: DrawEvent[]): CutHistory => {
  for (let i = events.length - 1; i >= 0; i--) {
    if (events[i].type === 'clear') {
      return { offset: i + 1, events: events.slice(i + 1) };
    }
  }
  return { offset: 0, events };
};
