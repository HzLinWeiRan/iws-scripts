import merge from 'webpack-merge'
import webpack from 'webpack'
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import webpackBaseConfig from './webpack.base.conf.js'

const webpackConfig = merge(webpackBaseConfig, {
    mode: 'development',
    devtool: 'source-map',
    output: {
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.scss$/,
            exclude: /node_modules/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader?sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
                'sass-loader?sourceMap',
                'postcss-loader?sourceMap'
            ]
        }]
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        })
    ]
})

export default webpackConfig