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
      use: ['style-loader?sourceMap', 'css-loader?sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'sass-loader?sourceMap', 'postcss-loader?sourceMap']
    }, {
      test: /\.less$/,
      use: ['style-loader?sourceMap', 'css-loader?sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'less-loader?sourceMap&javascriptEnabled', 'postcss-loader?sourceMap']
    }]
  },
  plugins: [// new webpack.HotModuleReplacementPlugin(),
  new _webpack.default.NoEmitOnErrorsPlugin(), new _webpack.default.NamedModulesPlugin(), // new webpack.HotModuleReplacementPlugin(),
  new _friendlyErrorsWebpackPlugin.default()]
});
var _default = webpackConfig;
exports.default = _default;