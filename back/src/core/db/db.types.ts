import { MongoClient, MongoClientOptions } from 'mongodb';

export interface DbClientParams {
  uid: string;
  uri: string;
  options: MongoClientOptions;
}

export interface GetDbClient {
  (params: DbClientParams): Promise<MongoClient>;
}

export type DbClientCache = Record<string, MongoClient>;
