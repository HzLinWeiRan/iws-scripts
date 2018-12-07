import path from 'path'
import merge from 'webpack-merge'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin'

import webpackBaseConfig  from './webpack.base.conf.js'

const cwdPath = process.cwd()
const iwsConfig = require(path.resolve(cwdPath, 'iws.config.js'))
const envData = iwsConfig[global.env]

const { publicPath } = envData || { publicPath: '/' }

const webpackConfig = merge(webpackBaseConfig, {
    mode: 'production',
    output: {
        filename: 'static/js/[name].[chunkhash:8].js',
        publicPath
    },
    module: {
        rules: [{
            test: /\.s?css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader',
                'postcss-loader'
            ]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css',
            chunkFilename: 'static/css/[name].[contenthash:8].css',
        }),
        new SWPrecacheWebpackPlugin({
            cacheId: 'iws-app',
            filename: 'service-worker.js',
            // 注册pwa的静态资源文件类型
            staticFileGlobs: [`${path.resolve(cwdPath, 'dist')}/**/*.{js,css}`],
            minify: true,
            navigateFallback: `${publicPath}index.html`,
            stripPrefix: path.resolve(cwdPath, 'dist')
        }),
    ],
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
                    reuseExistingChunk: true,
                }
            }
        },
        runtimeChunk: {
            name: "manifest",
        }
    }
})

export default webpackConfig
