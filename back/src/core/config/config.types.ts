export interface ConfigDynamic {
  serverPort: number;
  dbUri: string;
  dbName: string;
  jwtSecret: string;
  originBaseUrl: string;
}

export type ConfigEnv = Record<keyof ConfigDynamic, string | undefined>;

export interface ConfigStatic {
  jwtExpiresIn: number;
}

export type Config = ConfigDynamic & ConfigStatic;
