const injectConfig = require('./config/_nextInjectConfig');

module.exports = phase => {
  return {
    publicRuntimeConfig: injectConfig(phase),
  };
};
