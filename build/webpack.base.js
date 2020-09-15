/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const pkg = require(path.resolve(__dirname, '../package.json'));

const banner =`${pkg.name} v${pkg.version}
Last Modified @ ${new Date().toLocaleString()}
Released under the MIT License.`;

module.exports = {
  entry: {
    LazyLoad: path.resolve(__dirname, '..', 'src/lazyload.ts')
  },
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'lazyload.min.js',
    libraryTarget: 'umd',
    library: ['AutoTs', '[name]'],
    globalObject: 'this',
    libraryExport: "default", // 对外暴露default属性，就可以直接调用default里的属性
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
    new webpack.BannerPlugin({
      banner
    })
  ],
};
