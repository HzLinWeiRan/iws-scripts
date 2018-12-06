import merge from 'webpack-merge'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import webpackBaseConfig  from './webpack.base.conf.js'

const webpackConfig = merge(webpackBaseConfig, {
    mode: 'production',
    output: {
        filename: 'static/js/[name].[chunkhash:8].js'
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
        })
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
