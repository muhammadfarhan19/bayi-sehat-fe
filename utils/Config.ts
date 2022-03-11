import getConfig from 'next/config';

interface Config {
  apiHost: string;
  environment: 'development' | 'production' | 'staging';
  cookieSecure: boolean;
}

const { publicRuntimeConfig: config } = getConfig();
export default config as Config;
