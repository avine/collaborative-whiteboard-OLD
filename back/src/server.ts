/* eslint-disable no-console */
import { createServer } from 'http';

import SocketIo from 'socket.io';

const server = createServer((req, res) => {
  res.end('Hello world!');
});

const io = SocketIo(server);

io.on('connection', socket => {
  console.log('Connection\n');

  socket.on('drawTransport', drawTransport => {
    socket.broadcast.emit('broadcastDrawTransport', drawTransport);
    console.log('Transport', JSON.stringify(drawTransport, undefined, 2), '\n');
  });

  socket.on('disconnect', () => {
    console.log('Disconnect\n');
  });
});

// eslint-disable-next-line prettier/prettier
server.listen(3000, 'localhost', undefined, () =>
  console.log('Server is running on port: 3000\n')
);
