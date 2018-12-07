import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'

import { loadMinified, handleTemp } from './utils'

const serviceWorkScript = loadMinified(path.resolve(__dirname), 'service-worker-script.js')

const cwdPath = process.cwd()
// const { rootPath, assetsRoot } = conf

const iwsConfig = require(path.resolve(cwdPath, 'iws.config.js'))
const envData = iwsConfig[global.env]
const { alias, externals } = iwsConfig

const { htmlOptionData, defineData, publicPath } = envData || { publicPath: '/' }

const webpackConfig = {
    alias,
    externals,
    entry: {
        app: [path.resolve(cwdPath, 'src/app.js')]
    },
    output: {
        path: path.resolve(cwdPath, 'dist'),
        filename: 'static/js/[name].js',
        publicPath
    },
    resolve: {
        extensions: ['.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    {
                        loader: 'eslint-loader',
                        options: {
                            formatter: require("eslint/lib/formatters/stylish"),
                            formatter: require('eslint-friendly-formatter'), // 配置formatter格式
                            emitWarning: true,
                            failOnError: false
                        }
                    }
                ] 
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: '[name].[hash:8].[ext]',
                        outputPath: 'static/assets/',
                        limit: 1024
                    }
                }]
            },
            {
                test: /\.(woff|woff2|svg|ttf|eot)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: '[name].[hash:8].[ext]',
                        outputPath: 'static/assets/',
                        limit: 1024
                    }
                }]
            },
            {
                test: /\.hbs$/,
                use: 'handlebars-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // filename: conf.index,
            template: 'index.hbs',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            chunksSortMode: 'dependency',
            serviceWorkScript: handleTemp(serviceWorkScript, {
                publicPath
            }),
            ...htmlOptionData
        }),
        new webpack.DefinePlugin(defineData)
    ]
}

export default webpackConfig