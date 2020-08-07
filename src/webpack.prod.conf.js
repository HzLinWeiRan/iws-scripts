import path from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
// import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin'
import WorkboxWebpackPlugin from 'workbox-webpack-plugin'
import FilterWarningsPlugin from 'webpack-filter-warnings-plugin'

// import SwRegisterWebpackPlugin from 'sw-register-webpack-plugin'

import webpackBaseConfig  from './webpack.base.conf.js'

const cwdPath = process.cwd()

const webpackConfig = merge(webpackBaseConfig, {
    mode: 'production',
    // devtool: 'cheap-source-map',
    output: {
        filename: 'static/js/[name].[chunkhash:8].js',
        chunkFilename: '[name].[chunkhash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                include: /(node_modules|src)/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ]
            },{
                test: /\.less$/,
                include: /(node_modules|src)/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                            }
                        }
                    },
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css',
            chunkFilename: 'static/css/[name].[contenthash:8].css',
        }),
        // new SWPrecacheWebpackPlugin({
        //     cacheId: 'iws-app',
        //     filename: 'service-worker.js',
        //     // 注册pwa的静态资源文件类型
        //     staticFileGlobs: [`${path.resolve(cwdPath, 'dist')}/**/*.{js,css}`],
        //     minify: true,
        //     navigateFallback: `${publicPath}index.html`,
        //     stripPrefix: path.resolve(cwdPath, 'dist')
        // }),
        new webpack.HashedModuleIdsPlugin({
            hashFunction: 'md5',
            hashDigest: 'hex',
            hashDigestLength: 8
        }),
        new WorkboxWebpackPlugin.GenerateSW({
            cacheId: 'iws-pwa',
            importWorkboxFrom: 'local',
            // importsDirectory: path.resolve(cwdPath, 'dist'),
            // importsDirectory: path.resolve(cwdPath, 'dist'),
            importsDirectory: 'assets',
            // include: [/.(js|css)/],
            // exclude: [/service-wroker\.js/, /index\.html/],
            // swSrc: 
            swDest: path.resolve(cwdPath, 'dist/service-worker.js'),
            precacheManifestFilename: 'static/precache-manifest.[manifestHash].js',
            clientsClaim: true,
            skipWaiting: true,
        }),
        new FilterWarningsPlugin({
            exclude: /mini-css-extract-plugin/
        })
        // new SwRegisterWebpackPlugin({
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
            name: "manifest",
        }
    }
})

export default webpackConfig
