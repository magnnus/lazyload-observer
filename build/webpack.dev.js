/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  // devtool: 'cheap-module-eval-source-map',
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    compress: true,
    port: 9000,
    contentBase: path.resolve(__dirname, '..', './public'),
  },
};
