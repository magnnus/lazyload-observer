/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [ path.resolve(__dirname, '..', 'src/main.ts')],
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd', // 定义打包方式Universal Module Definition,同时支持在CommonJS、AMD和全局变量使用
    library: 'ATHMFE', // 指定类库名,主要用于直接引用的方式(比如使用script 标签)
    globalObject: 'this', // 定义全局变量,兼容node和浏览器运行，避免出现"window is not defined"的情况
    // libraryExport: "default", // 对外暴露default属性，就可以直接调用default里的属性

  },
  module: {
    //解决Critical dependency: require function is used in a way in which dependencies cannot be statically extracted的问题
    unknownContextCritical : false,
    rules: [
      {
        test: /\.tsx?$/i,
        use: [{
          loader: 'ts-loader',
        }],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    // new webpack.WatchIgnorePlugin([
    //   /\.js$/,
    //   /\.d\.ts$/,
    // ]),
    new webpack.ProgressPlugin(),
    new HTMLWebpackPlugin({
      inject: false,
      template: path.resolve(__dirname, '..', 'public/index.html'),
    }),
  ],
  externals: [

  ]
};
