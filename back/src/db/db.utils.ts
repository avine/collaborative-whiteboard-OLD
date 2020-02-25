import { MongoClient, MongoClientOptions } from 'mongodb';

export const getDefaultOptions = (): MongoClientOptions => ({
  useUnifiedTopology: true,
  useNewUrlParser: true,
  connectTimeoutMS: 2000,
  socketTimeoutMS: 2000
});

export const getClient = (uri: string, options = getDefaultOptions()) =>
  new Promise<MongoClient>((resolve, reject) =>
    MongoClient.connect(uri, options, (error, client) => {
      if (error) {
        reject(error);
      } else {
        resolve(client);
      }
    })
  );
