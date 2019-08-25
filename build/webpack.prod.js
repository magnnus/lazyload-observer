/* eslint-disable @typescript-eslint/no-var-requires */
const nodeExternals = require('webpack-node-externals');
const config = [];

function generateConfig (name) {
  const uglify = name.indexOf('min') > -1;
  const umd = name.indexOf('umd') > -1;

  const config = {
    name,
    output: {
      filename: name + '.js',
    },
    optimization: {
      minimize: false,
    },
    externals: [],
  };

  if (uglify) {
    config.optimization.minimize = true;
  }

  if (umd) {
    config.externals.push(nodeExternals());
  }

  return config;
}

['lazyload.min', 'lazyload.umd'].forEach(function (key) {
  config.push(generateConfig(key));
});

module.exports = config;
