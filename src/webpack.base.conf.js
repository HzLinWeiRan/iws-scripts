import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const cwdPath = process.cwd()
// const { rootPath, assetsRoot } = conf

const webpackConfig = {
    entry: {
        app: [path.resolve(cwdPath, 'src/app.js')]
    },
    output: {
        path: path.resolve(cwdPath, 'dist'),
        filename: 'static/js/[name].js'
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
                            formatter: require('eslint-friendly-formatter'), // 配置formatter格式
                            emitWarning: false
                        }
                    }
                ] 
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                exclude: /node_modules/,
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
            title: 'test'
        })
    ]
}

export default webpackConfig