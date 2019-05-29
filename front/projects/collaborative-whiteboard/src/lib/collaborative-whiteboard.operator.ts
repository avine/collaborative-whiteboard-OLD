import { CanvasSize, DrawClear, DrawEvent, DrawOptions } from './collaborative-whiteboard.model';

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

export const mapDrawLineSerieToDrawLines = (events: DrawEvent[]): DrawEvent[] => {
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
