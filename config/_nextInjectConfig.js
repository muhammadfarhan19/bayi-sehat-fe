const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const development = require('./development');
const staging = require('./staging');
const production = require('./production');

module.exports =
  (nextConfig = () => {}) =>
  (phase, { defaultConfig }) => {
    const isDev = phase === PHASE_DEVELOPMENT_SERVER;
    if (isDev && process.env.MOCK === '1') {
      console.log('Run with mock');
      development.apiHost = 'http://localhost:3001'; // MOCK Host
    }
    return {
      ...nextConfig(phase, { defaultConfig }),
      publicRuntimeConfig: isDev ? development : process.env.STAGING == '1' ? staging : production,
    };
  };
