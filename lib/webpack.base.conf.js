"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _path = _interopRequireDefault(require("path"));

var _htmlWebpackPlugin = _interopRequireDefault(require("html-webpack-plugin"));

var _webpack = _interopRequireDefault(require("webpack"));

var _options;

var cwdPath = process.cwd(); // const { rootPath, assetsRoot } = conf

var iwsConfig = require(_path.default.resolve(cwdPath, 'iws.config.js'));

var envData = iwsConfig[global.env];
var defaultData = iwsConfig['default'] || {}; // const { alias, externals, isEslint } = iwsConfig

var _defaultData$envData = (0, _objectSpread2.default)({}, defaultData, envData),
    _defaultData$envData$ = _defaultData$envData.htmlOptionData,
    htmlOptionData = _defaultData$envData$ === void 0 ? {} : _defaultData$envData$,
    _defaultData$envData$2 = _defaultData$envData.defineData,
    defineData = _defaultData$envData$2 === void 0 ? {} : _defaultData$envData$2,
    _defaultData$envData$3 = _defaultData$envData.provideData,
    provideData = _defaultData$envData$3 === void 0 ? {} : _defaultData$envData$3,
    _defaultData$envData$4 = _defaultData$envData.publicPath,
    publicPath = _defaultData$envData$4 === void 0 ? '/' : _defaultData$envData$4,
    _defaultData$envData$5 = _defaultData$envData.alias,
    alias = _defaultData$envData$5 === void 0 ? {} : _defaultData$envData$5,
    _defaultData$envData$6 = _defaultData$envData.externals,
    externals = _defaultData$envData$6 === void 0 ? {} : _defaultData$envData$6,
    _defaultData$envData$7 = _defaultData$envData.rules,
    rules = _defaultData$envData$7 === void 0 ? [] : _defaultData$envData$7,
    _defaultData$envData$8 = _defaultData$envData.isEslint,
    isEslint = _defaultData$envData$8 === void 0 ? false : _defaultData$envData$8,
    entry = _defaultData$envData.entry,
    serviceWorkFile = _defaultData$envData.serviceWorkFile;

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