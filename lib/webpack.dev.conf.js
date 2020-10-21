"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

var _webpack = _interopRequireDefault(require("webpack"));

var _friendlyErrorsWebpackPlugin = _interopRequireDefault(require("friendly-errors-webpack-plugin"));

var _webpackBaseConf = _interopRequireDefault(require("./webpack.base.conf.js"));

var webpackConfig = (0, _webpackMerge.default)(_webpackBaseConf.default, {
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.s?css$/,
      include: /(node_modules|src)/,
      use: ['style-loader?sourceMap', 'css-loader?sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'postcss-loader?sourceMap', 'sass-loader?sourceMap']
    }, {
      test: /\.less$/,
      include: /(node_modules|src)/,
      use: ['style-loader?sourceMap', 'css-loader?sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'postcss-loader?sourceMap', {
        loader: 'less-loader',
        options: {
          sourceMap: true,
          lessOptions: {
            javascriptEnabled: true
          }
        }
      }]
    }]
  },
  plugins: [// new webpack.HotModuleReplacementPlugin(),
  // new webpack.NoEmitOnErrorsPlugin(),
  // new webpack.NamedModulesPlugin(),
  // new webpack.HotModuleReplacementPlugin(),
  new _friendlyErrorsWebpackPlugin.default()],
  optimization: {
    noEmitOnErrors: true,
    namedModules: true
  }
});
var _default = webpackConfig;
exports.default = _default;