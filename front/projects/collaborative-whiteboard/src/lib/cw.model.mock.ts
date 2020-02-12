import {
  DrawAction,
  DrawEvent,
  DrawEventsBroadcast,
  DrawTransport,
  Owner,
} from './cw.model';

const getNumber = (max = 1000) => Math.round(Math.random() * max);

const colors = ['#000', '#333', '#666', '#999', '#ccc', '#fff'];

const getColor = () => colors[getNumber(colors.length - 1)];

export const getDrawEvent = (owner: Owner = null): DrawEvent => ({
  type: 'point',
  data: [getNumber(), getNumber()],
  options: { lineWidth: getNumber(20), strokeStyle: getColor() },
  owner,
});

export const getDrawEventsWithMapping = ({
  eventsNumber = 2,
  owner = null,
  action = 'add',
  animate = true,
}: {
  eventsNumber?: number;
  owner?: Owner;
  action?: DrawAction;
  animate?: boolean;
} = {}) => {
  const events = Array.from(Array(eventsNumber)).map(() => getDrawEvent(owner));
  const transport: DrawTransport = { action, events };
  const broadcast: DrawEventsBroadcast = { animate, events };
  return { events, transport, broadcast };
};
