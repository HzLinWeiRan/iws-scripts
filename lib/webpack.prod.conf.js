"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

var _miniCssExtractPlugin = _interopRequireDefault(require("mini-css-extract-plugin"));

var _webpackBaseConf = _interopRequireDefault(require("./webpack.base.conf.js"));

var webpackConfig = (0, _webpackMerge.default)(_webpackBaseConf.default, {
  output: {
    filename: 'static/js/[name].[chunkhash:8].js'
  },
  module: {
    rules: [{
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [_miniCssExtractPlugin.default.loader, 'css-loader', 'sass-loader', 'postcss-loader']
    }]
  },
  plugins: [new _miniCssExtractPlugin.default({
    filename: 'static/css/[name].[contenthash:8].css',
    chunkFilename: 'static/css/[name].[contenthash:8].css'
  })],
  optimization: {
    noEmitOnErrors: true,
    namedModules: true,
    moduleIds: 'hashed',
    nodeEnv: 'production',
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: {
      name: "manifest"
    }
  }
});
var _default = webpackConfig;
exports.default = _default;