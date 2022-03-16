import getConfig from 'next/config';

interface Config {
  apiHost: string;
  environment: 'development' | 'production' | 'staging';
  cookieSecure: boolean;
  apiTimeoutMs: number;
  tokenExpiredMs: number;
}

const { publicRuntimeConfig: config } = getConfig();
export default config as Config;
