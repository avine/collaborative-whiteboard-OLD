import { DbClientCache, GetDbClient } from './db.types';
import { getClient } from './db.utils';

const dbClientCache: DbClientCache = {};

export const getCachedClient = (uid: string) => {
  if (dbClientCache[uid]) {
    if (dbClientCache[uid].isConnected()) {
      return dbClientCache[uid];
    }
    delete dbClientCache[uid];
  }
  return undefined;
};

export const getDbClient: GetDbClient = async ({ uid, uri, options }) => {
  const cachedClient = getCachedClient(uid);
  if (cachedClient) {
    return cachedClient;
  }
  const client = await getClient(uri, options);
  dbClientCache[uid] = client;
  return client;
};
