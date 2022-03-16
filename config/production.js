module.exports = {
  apiHost: 'https://intra.dikti.info/api',
  environment: 'production',
  cookieSecure: true,
  apiTimeoutMs: 15000, // 10 seconds
  tokenExpiredMs: 600000 - 15000, // 10 Minutes
};
