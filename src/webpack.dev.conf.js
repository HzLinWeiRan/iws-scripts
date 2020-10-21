import merge from 'webpack-merge'
import webpack from 'webpack'
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'

import webpackBaseConfig from './webpack.base.conf.js'

const webpackConfig = merge(webpackBaseConfig, {
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.s?css$/,
                include: /(node_modules|src)/,
                use: [
                    'style-loader?sourceMap',
                    'css-loader?sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
                    'postcss-loader?sourceMap',
                    'sass-loader?sourceMap',
                ]
            },
            {
                test: /\.less$/,
                include: /(node_modules|src)/,
                exclude: /node_modules\/antd/,
                use: [
                    'style-loader?sourceMap',
                    'css-loader?sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
                    'postcss-loader?sourceMap',
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
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
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoEmitOnErrorsPlugin(),
        // new webpack.NamedModulesPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsWebpackPlugin()
    ],
    optimization: {
        noEmitOnErrors: true,
        namedModules: true,
    }
})

export default webpackConfig