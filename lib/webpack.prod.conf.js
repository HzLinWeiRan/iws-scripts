"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _webpack = _interopRequireDefault(require("webpack"));

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

var _miniCssExtractPlugin = _interopRequireDefault(require("mini-css-extract-plugin"));

var _workboxWebpackPlugin = _interopRequireDefault(require("workbox-webpack-plugin"));

var _webpackFilterWarningsPlugin = _interopRequireDefault(require("webpack-filter-warnings-plugin"));

var _webpackBaseConf = _interopRequireDefault(require("./webpack.base.conf.js"));

// import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin'
// import SwRegisterWebpackPlugin from 'sw-register-webpack-plugin'
var cwdPath = process.cwd();
var webpackConfig = (0, _webpackMerge.default)(_webpackBaseConf.default, {
  mode: 'production',
  // devtool: 'cheap-source-map',
  output: {
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].js'
  },
  module: {
    rules: [{
      test: /\.s?css$/,
      include: /(node_modules|src)/,
      use: [_miniCssExtractPlugin.default.loader, 'css-loader', 'postcss-loader', 'sass-loader']
    }, {
      test: /\.less$/,
      include: /(node_modules|src)/,
      exclude: /node_modules\/antd/,
      use: [_miniCssExtractPlugin.default.loader, 'css-loader', 'postcss-loader', {
        loader: 'less-loader',
        options: {
          lessOptions: {
            javascriptEnabled: true
          }
        }
      }]
    }]
  },
  plugins: [new _miniCssExtractPlugin.default({
    filename: 'static/css/[name].[contenthash:8].css',
    chunkFilename: 'static/css/[name].[contenthash:8].css'
  }), // new SWPrecacheWebpackPlugin({
  //     cacheId: 'iws-app',
  //     filename: 'service-worker.js',
  //     // 注册pwa的静态资源文件类型
  //     staticFileGlobs: [`${path.resolve(cwdPath, 'dist')}/**/*.{js,css}`],
  //     minify: true,
  //     navigateFallback: `${publicPath}index.html`,
  //     stripPrefix: path.resolve(cwdPath, 'dist')
  // }),
  new _webpack.default.HashedModuleIdsPlugin({
    hashFunction: 'md5',
    hashDigest: 'hex',
    hashDigestLength: 8
  }), new _workboxWebpackPlugin.default.GenerateSW({
    cacheId: 'iws-pwa',
    importWorkboxFrom: 'local',
    // importsDirectory: path.resolve(cwdPath, 'dist'),
    // importsDirectory: path.resolve(cwdPath, 'dist'),
    importsDirectory: 'assets',
    // include: [/.(js|css)/],
    // exclude: [/service-wroker\.js/, /index\.html/],
    // swSrc: 
    swDest: _path.default.resolve(cwdPath, 'dist/service-worker.js'),
    precacheManifestFilename: 'static/precache-manifest.[manifestHash].js',
    clientsClaim: true,
    skipWaiting: true
  }), new _webpackFilterWarningsPlugin.default({
    exclude: /mini-css-extract-plugin/
  }) // new SwRegisterWebpackPlugin({
  //     filename: path.resolve(__dirname, './service-worker-script.js')
  // }),
  ],
  optimization: {
    noEmitOnErrors: true,
    namedModules: true,
    moduleIds: 'hashed',
    nodeEnv: 'production',
    splitChunks: {
      chunks: 'all',
      minChunks: 2,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          reuseExistingChunk: true,
          priority: -10,
          enforce: true
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