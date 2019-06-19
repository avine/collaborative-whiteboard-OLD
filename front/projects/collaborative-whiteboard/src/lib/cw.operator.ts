import * as md5_ from 'md5';

import {
    BroadcastDrawEvents, CanvasSize, CutRange, CutRangeArg, DrawClear, DrawEvent, DrawOptions
} from './cw.model';

const md5 = md5_;

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
  owner: null,
  type: 'clear',
  options: getEmptyDrawOptions(),
  data: [undefined, undefined, undefined, undefined]
});

export const drawLineSerieToLinesMapper = (events: DrawEvent[]): DrawEvent[] => {
  const result: DrawEvent[] = [];
  events.forEach(event => {
    if (event.type === 'lineSerie') {
      const { owner, options, data } = event;
      for (let i = 0; i < data.length - 3; i = i + 2) {
        result.push({
          owner,
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
  const [from, to] = Array.isArray(data)
    ? [...data].sort((a, b) => a > b ? 1 : a < b ? -1 : 0)
    : [data, data];
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

// Note: Don't forget to update the `hash` builder each time the `DrawEvent` interface is modified.
export const getHash = (event: DrawEvent) => {
  // Warning: we assumes that `options.toString()` works.
  // It means that all properties (like `event.options.strokeStyle`) are primitive values...
  const options = Object.keys(event.options).sort().map(key => event.options[key]);
  return md5(event.owner + event.type + options.toString() + event.data.toString());
};
