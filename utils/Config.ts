import getConfig from 'next/config';

interface Config {
  apiHost: string;
}

const { publicRuntimeConfig: config } = getConfig();
export default config as Config;
