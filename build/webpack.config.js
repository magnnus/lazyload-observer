/* eslint-disable @typescript-eslint/no-var-requires */
const merge = require('webpack-merge');
const base = require('./webpack.base');
const dev = require('./webpack.dev');
const prod = require('./webpack.prod');

module.exports = (env, args) => {
  if (args.mode === 'development') {
    return merge(base, dev);
  } else {
    return prod.map(item => {
      return merge(base, item);
    });
  }
};
