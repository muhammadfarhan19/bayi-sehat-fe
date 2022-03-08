import getConfig from 'next/config';

interface Config {
  apiHost: string;
  environment: 'development' | 'production' | 'staging';
}

const { publicRuntimeConfig: config } = getConfig();
export default config as Config;
