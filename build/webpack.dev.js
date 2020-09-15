/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  // devtool: 'cheap-module-eval-source-map',
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    compress: true,
    port: 9000,
    contentBase: path.resolve(__dirname, '..', 'public'),
  },
  plugins: [
    new HTMLWebpackPlugin({
      inject: 'head',
      template: path.resolve(__dirname, '..', 'public/index.html'),
    }),
  ]
};
