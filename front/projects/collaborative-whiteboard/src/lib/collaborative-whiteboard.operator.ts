import {
    BroadcastDrawEvents, CanvasSize, CutRange, CutRangeArg, DrawClear, DrawEvent, DrawOptions
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
  user: null,
  type: 'clear',
  options: getEmptyDrawOptions(),
  data: [undefined, undefined, undefined, undefined]
});

export const drawLineSerieToLinesMapper = (events: DrawEvent[]): DrawEvent[] => {
  const result: DrawEvent[] = [];
  events.forEach(event => {
    if (event.type === 'lineSerie') {
      const { user, options, data } = event;
      for (let i = 0; i < data.length - 3; i = i + 2) {
        result.push({
          user,
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

export const normalizeCutRange = (data: CutRangeArg): CutRange => {
  const range = Array.isArray(data) ? [...data].sort() : [data, data];
  const [from, to] = range;
  return [Math.max(0, from), Math.max(0, to)];
};

export const keepDrawEventsAfterClearEvent = (events: DrawEvent[]): DrawEvent[] => {
  for (let i = events.length - 1; i >= 0; i--) {
    if (events[i].type === 'clear') {
      return events.slice(i + 1);
    }
  }
  return events;
};
