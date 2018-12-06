import merge from 'webpack-merge'
import webpack from 'webpack'
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'

import webpackBaseConfig from './webpack.base.conf.js'

const webpackConfig = merge(webpackBaseConfig, {
    mode: 'development',
    devtool: 'source-map',
    output: {
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.s?css$/,
            use: [
                'style-loader?sourceMap',
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
        new FriendlyErrorsWebpackPlugin()
    ]
})

export default webpackConfig