export interface Config {
  serverPort: number;
  dbUri: string;
  dbName: string;
}

export type ConfigEnv = Record<keyof Config, string | undefined>;
