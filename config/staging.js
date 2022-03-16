module.exports = {
  apiHost: 'http://43.241.149.99:3001',
  environment: 'staging',
  cookieSecure: false,
  apiTimeoutMs: 15000, // 10 seconds
  tokenExpiredMs: 600000 - 15000, // 10 Minutes
};
