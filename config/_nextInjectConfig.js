const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const development = require('./development');
const staging = require('./staging');
const production = require('./production');

module.exports = phase => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  return isDev ? development : (process.env.STAGING = 1 ? staging : production);
};
