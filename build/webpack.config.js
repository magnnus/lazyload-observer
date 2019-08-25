/* eslint-disable @typescript-eslint/no-var-requires */
const merge = require('webpack-merge');
const base = require('./webpack.base');
const dev = require('./webpack.dev');
const prod = require('./webpack.prod');

module.exports = (env, args) => {
  const targetConfig = args.mode === 'development' ? dev : prod;
  return merge(base, targetConfig);
};
