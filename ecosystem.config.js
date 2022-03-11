module.exports = {
  apps: [
    {
      script: '/usr/bin/yarn',
      args: 'start',
      env_staging: {
        NODE_ENV: 'production',
        STAGING: 1,
      },
    },
  ],
};
