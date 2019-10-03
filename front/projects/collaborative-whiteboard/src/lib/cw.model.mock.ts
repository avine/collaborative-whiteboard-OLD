import {
  DrawAction,
  DrawEvent,
  DrawTransport,
  BroadcastDrawEvents,
} from './cw.model';

const getNumber = (max = 1000) => Math.round(Math.random() * max);

const getColor = () =>
  ['#000', '#333', '#666', '#999', '#ccc', '#fff'][getNumber(5)];

export const getDrawEvent = (): DrawEvent => ({
  type: 'point',
  data: [getNumber(), getNumber()],
  options: { lineWidth: getNumber(20), strokeStyle: getColor() },
  owner: null,
});

export const getDrawEventsWithMapping = ({
  eventsNumber = 2,
  action = 'add',
  animate = true,
}: {
  eventsNumber?: number;
  action?: DrawAction;
  animate?: boolean;
} = {}) => {
  const events = Array.from(Array(eventsNumber)).map(() => getDrawEvent());
  const transport: DrawTransport = { action, events };
  const broadcast: BroadcastDrawEvents = { animate, events };
  return { events, transport, broadcast };
};
