export interface ConfigDynamic {
  apiBaseUrl: string;
}

export type ConfigEnv = Record<keyof ConfigDynamic, string | undefined>;

export interface ConfigStatic {
  test: boolean;
}

export type Config = ConfigDynamic & ConfigStatic;
