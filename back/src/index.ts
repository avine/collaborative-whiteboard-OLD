import { createServer } from 'http';

import app from './app';
import { getAllConfig, getConfig } from './config';

// eslint-disable-next-line no-console
console.log('AppConfig', JSON.stringify(getAllConfig(), undefined, 2));

const server = createServer(app);

const port = getConfig('serverPort');
// eslint-disable-next-line no-console
server.listen(port, () => console.log(`App listening on port ${port}.`));
