import { getConfig } from '../config';
import { getDbClient } from './db-connection';
import { DbClientParams } from './db.types';
import { getDefaultOptions } from './db.utils';

export const dbParams: DbClientParams = {
  uid: 'cw',
  uri: getConfig('dbUri'),
  options: getDefaultOptions()
};

export const getDefaultDb = async () => {
  const client = await getDbClient(dbParams);
  const dbName = getConfig<string>('dbName');
  return client.db(dbName);
};
