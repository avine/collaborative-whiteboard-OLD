import { getDefaultDb } from './db-params';

const createDbIndexes = async () => {
  const db = await getDefaultDb();
  return Promise.all([
    db.createIndex('users', 'email'),
    db.createIndex('whiteboards', 'users.id')
  ]).then(() => {});
};

export default createDbIndexes;
