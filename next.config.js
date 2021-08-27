const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER,
  PHASE_EXPORT,
} = require("next/constants");

const development = require("./config/development");
const staging = require("./config/staging");
const production = require("./config/production");

const withPWA = require('next-pwa')
 

// module.exports = withPWA({
//     pwa: {
//         dest: 'public'
//     }
// })

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const isProd =
    (phase === PHASE_EXPORT && process.env.STAGING !== "1") ||
    (phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== "1") ||
    (phase === PHASE_PRODUCTION_SERVER && process.env.STAGING !== "1");
  const isStaging =
    (phase === PHASE_EXPORT && process.env.STAGING === "1") ||
    (phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === "1") ||
    (phase === PHASE_PRODUCTION_SERVER && process.env.STAGING === "1");

  console.log(
    `Phase: ${
      isDev
        ? "Development"
        : isStaging
        ? "Staging"
        : isProd
        ? "Production"
        : "Unknown"
    }`
  );
  const config = () => {
    if (isDev) return development;
    if (isProd) return production;
    if (isStaging) return staging;
    return "publicRuntimeConfig:ERROR";
  };

  const publicRuntimeConfig = config();

  let assetPrefix = "";
  if (isProd || isStaging) {
    console.log("publicRuntimeConfig", publicRuntimeConfig);
    assetPrefix = String(publicRuntimeConfig.basePath);
  }

  return {
    publicRuntimeConfig,
    assetPrefix,
  };
};
