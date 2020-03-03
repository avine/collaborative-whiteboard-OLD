import { Config } from './config.types';

// eslint-disable-next-line import/prefer-default-export
export const getConfigFactory = (config: Config) => <T = any>(
  key: keyof Config
) => (config[key] as any) as T;
