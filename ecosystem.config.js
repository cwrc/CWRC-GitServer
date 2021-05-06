module.exports = {
  apps: [
    {
      name: 'cwrc-gitserver',
      script: './src/index.js',
      args: '--no-daemon',
      env: { NODE_ENV: 'production' },
      env_production: { NODE_ENV: 'production' },
    },
  ],
};
