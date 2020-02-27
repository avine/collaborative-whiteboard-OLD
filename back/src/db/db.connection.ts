import { DbClientCache, GetDbClient } from './db.types';
import { getClient } from './db.utils';

const dbClientCache: DbClientCache = {};

export const getCachedDbClient = (uid: string) => {
  if (dbClientCache[uid]) {
    if (dbClientCache[uid].isConnected()) {
      return dbClientCache[uid];
    }
    delete dbClientCache[uid];
  }
  return undefined;
};

export const getDbClient: GetDbClient = async ({ uid, uri, options }) => {
  const cachedClient = getCachedDbClient(uid);
  if (cachedClient) {
    return cachedClient;
  }
  const client = await getClient(uri, options);
  dbClientCache[uid] = client;
  return client;
};

export const closeDbClient = async (uid: string) => {
  const cachedClient = getCachedDbClient(uid);
  if (cachedClient) {
    delete dbClientCache[uid];
    return cachedClient.close();
  }
  return undefined;
};
