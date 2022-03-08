const injectConfig = require('./config/_nextInjectConfig');

module.exports = phase => {
  return {
    publicRuntimeConfig: injectConfig(phase),
    generateBuildId: async () => {
      // You can, for example, get the latest git commit hash here
      return 'my-build-id';
    },
  };
};
