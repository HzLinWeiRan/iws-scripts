"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _path = _interopRequireDefault(require("path"));

var _htmlWebpackPlugin = _interopRequireDefault(require("html-webpack-plugin"));

var _webpack = _interopRequireDefault(require("webpack"));

var _iwsConfig = _interopRequireDefault(require("./iwsConfig.js"));

var _options;

var cwdPath = process.cwd(); // const { rootPath, assetsRoot } = conf
// const iwsConfig = require(path.resolve(cwdPath, 'iws.config.js'))
// const envData = iwsConfig[global.env]
// const defaultData = iwsConfig['default'] || {}

// const { alias, externals, isEslint } = iwsConfig
var _dataConfig = dataConfig,
    _dataConfig$htmlOptio = _dataConfig.htmlOptionData,
    htmlOptionData = _dataConfig$htmlOptio === void 0 ? {} : _dataConfig$htmlOptio,
    _dataConfig$defineDat = _dataConfig.defineData,
    defineData = _dataConfig$defineDat === void 0 ? {} : _dataConfig$defineDat,
    _dataConfig$provideDa = _dataConfig.provideData,
    provideData = _dataConfig$provideDa === void 0 ? {} : _dataConfig$provideDa,
    _dataConfig$publicPat = _dataConfig.publicPath,
    publicPath = _dataConfig$publicPat === void 0 ? '/' : _dataConfig$publicPat,
    _dataConfig$alias = _dataConfig.alias,
    alias = _dataConfig$alias === void 0 ? {} : _dataConfig$alias,
    _dataConfig$externals = _dataConfig.externals,
    externals = _dataConfig$externals === void 0 ? {} : _dataConfig$externals,
    _dataConfig$rules = _dataConfig.rules,
    rules = _dataConfig$rules === void 0 ? [] : _dataConfig$rules,
    _dataConfig$isEslint = _dataConfig.isEslint,
    isEslint = _dataConfig$isEslint === void 0 ? false : _dataConfig$isEslint,
    entry = _dataConfig.entry,
    serviceWorkFile = _dataConfig.serviceWorkFile;
var eslintLoader = isEslint ? [{
  loader: 'eslint-loader',
  options: (_options = {
    formatter: require("eslint/lib/formatters/stylish")
  }, (0, _defineProperty2.default)(_options, "formatter", require('eslint-friendly-formatter')), (0, _defineProperty2.default)(_options, "fix", true), (0, _defineProperty2.default)(_options, "emitWarning", true), (0, _defineProperty2.default)(_options, "failOnError", false), _options)
}] : [];
var serviceWorkScript = [];

if (global.cmd === 'build') {
  serviceWorkScript = [_path.default.resolve(cwdPath, serviceWorkFile || 'src/service-worker-register.js')];
}

var webpackConfig = {
  // alias,
  externals: externals,
  entry: {
    app: (0, _toConsumableArray2.default)(serviceWorkScript).concat([_path.default.resolve(cwdPath, entry || 'src/app.js')])
  },
  output: {
    path: _path.default.resolve(cwdPath, 'dist'),
    filename: 'static/js/[name].js',
    publicPath: publicPath
  },
  resolve: {
    alias: alias,
    extensions: ['.js', '.jsx', '.ts', 'tsx', '.json']
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      include: /src/,
      use: ['babel-loader'].concat(eslintLoader)
    }, {
      test: /\.(jpe?g|png|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          name: 'static/img/[name].[hash:8].[ext]',
          limit: 1024
        }
      }]
    }, {
      test: /\.(woff|woff2|svg|ttf|eot|mp3)$/,
      use: [{
        loader: 'url-loader',
        options: {
          name: 'static/fonts/[name].[hash:8].[ext]',
          limit: 1024
        }
      }]
    }, {
      test: /\.hbs$/,
      use: 'handlebars-loader'
    }].concat((0, _toConsumableArray2.default)(rules))
  },
  plugins: [new _htmlWebpackPlugin.default((0, _objectSpread2.default)({
    // filename: conf.index,
    template: 'index.hbs',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference

    },
    chunksSortMode: 'dependency'
  }, htmlOptionData)), new _webpack.default.ProvidePlugin(provideData), new _webpack.default.DefinePlugin((0, _objectSpread2.default)({
    publicPath: JSON.stringify(publicPath)
  }, defineData))]
};
var _default = webpackConfig;
exports.default = _default;