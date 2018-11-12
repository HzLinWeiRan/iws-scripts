"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _htmlWebpackPlugin = _interopRequireDefault(require("html-webpack-plugin"));

var cwdPath = process.cwd(); // const { rootPath, assetsRoot } = conf

var webpackConfig = {
  mode: process.env.NODE_ENV,
  entry: {
    app: [_path.default.resolve(cwdPath, 'src/app.js')]
  },
  output: {
    path: _path.default.resolve(cwdPath, 'dist'),
    filename: 'static/js/[name].js'
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader', {
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter'),
          // 配置formatter格式
          emitWarning: false
        }
      }]
    }, {
      test: /\.(jpe?g|png|gif)$/,
      exclude: /node_modules/,
      use: [{
        loader: 'url-loader',
        options: {
          name: '[name].[hash:8].[ext]',
          outputPath: 'static/assets/',
          limit: 1024
        }
      }]
    }, {
      test: /\.hbs$/,
      use: 'handlebars-loader'
    }]
  },
  plugins: [new _htmlWebpackPlugin.default({
    // filename: conf.index,
    template: 'index.hbs',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference

    },
    title: 'test'
  })]
};
var _default = webpackConfig;
exports.default = _default;