import { createServer } from 'http';

import app from './app';
import { getAllConfig, getConfig } from './config';
import createDbIndexes from './db/db-index';

// eslint-disable-next-line no-console
console.log('AppConfig', JSON.stringify(getAllConfig(), undefined, 2));

createDbIndexes().then(() => {
  const server = createServer(app);

  const port = getConfig('serverPort');
  // eslint-disable-next-line no-console
  server.listen(port, () => console.log(`App listening on port ${port}.`));
});
