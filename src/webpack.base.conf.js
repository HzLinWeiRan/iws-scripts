import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'

const cwdPath = process.cwd()
// const { rootPath, assetsRoot } = conf

// const iwsConfig = require(path.resolve(cwdPath, 'iws.config.js'))
// const envData = iwsConfig[global.env]
// const defaultData = iwsConfig['default'] || {}
import iwsConfig from './iwsConfig.js'
// const { alias, externals, isEslint } = iwsConfig

const {
    htmlOptionData={},
    defineData={},
    provideData={},
    publicPath='/',
    alias={},
    externals={},
    rules=[],
    isEslint=false,
    entry,
    serviceWorkFile
} = iwsConfig

const eslintLoader = isEslint ? [
    {
        loader: 'eslint-loader',
        options: {
            formatter: require("eslint/lib/formatters/stylish"),
            formatter: require('eslint-friendly-formatter'), // 配置formatter格式
            fix: true,
            emitWarning: true,
            failOnError: false
        }
    }
] : []

let serviceWorkScript = []
if (global.cmd === 'build') {
    serviceWorkScript = [path.resolve(cwdPath, serviceWorkFile || 'src/service-worker-register.js')]
}
 
const webpackConfig = {
    // alias,
    externals,
    entry: {
        app: [
            ...serviceWorkScript,
            path.resolve(cwdPath, entry || 'src/app.js')
        ]
    },
    output: {
        path: path.resolve(cwdPath, 'dist'),
        filename: 'static/js/[name].js',
        publicPath
    },
    resolve: {
        alias,
        extensions: ['.js', '.jsx', '.ts', 'tsx', '.json']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: /src/,
                use: [
                    'babel-loader',
                    ...eslintLoader
                ] 
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: 'static/img/[name].[hash:8].[ext]',
                        limit: 1024
                    }
                }]
            },
            {
                test: /\.(woff|woff2|svg|ttf|eot|mp3)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: 'static/fonts/[name].[hash:8].[ext]',
                        limit: 1024
                    }
                }]
            },
            {
                test: /\.hbs$/,
                use: 'handlebars-loader'
            },
            ...rules
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
            ...htmlOptionData
        }),
        new webpack.ProvidePlugin(provideData),
        new webpack.DefinePlugin({
            publicPath: JSON.stringify(publicPath),
            ...defineData
        })
    ]
}

export default webpackConfig
