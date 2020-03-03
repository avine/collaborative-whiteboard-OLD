import { existsSync, mkdirSync } from 'fs';
import morgan from 'morgan';
import { resolve } from 'path';
import { createStream } from 'rotating-file-stream';

const logDirectory = resolve('log');

if (!existsSync(logDirectory)) {
  mkdirSync(logDirectory);
}

const accessLogStream = createStream('access.log', {
  interval: '1d', // rotate daily
  path: logDirectory
});

export const accessLogger = morgan('common', {
  stream: accessLogStream
});

export const consoleLogger = morgan('common', {
  skip: (req, res) => res.statusCode < 400
});
