const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const { basename } = require('path')

module.exports = {
    entry: { main: './src/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [(isDev ? 'style-loader' : MiniCssExtractPlugin.loader), 'css-loader', 'postcss-loader']
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                  'file-loader?name=./images/[name].[ext]',
                  {
                    loader: 'image-webpack-loader',
                    options: {
                      bypassOnDebug: true, 
                      disable: true, 
                    },
                  },
                ],
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'file-loader?name=./vendor/[name].[ext]'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ 
            inject: false,
            template: './src/index.html',
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({ 
            template: './src/about.html',
            filename: 'about.html'
        }),
        new HtmlWebpackPlugin({ 
            template: './src/paper.html',
            filename: 'paper.html'
        }),
        new FaviconsWebpackPlugin({
            logo: './src/images/index__favicon.svg',
            inject: htmlPlugin => 
              basename(htmlPlugin.options.filename) === 'index.html',
        }),
        new FaviconsWebpackPlugin({
            logo: './src/images/index__favicon.svg',
            inject: htmlPlugin => 
              basename(htmlPlugin.options.filename) === 'about.html',
        }),
        new FaviconsWebpackPlugin({
            logo: './src/images/paper__favicon.svg',
            inject: htmlPlugin => 
              basename(htmlPlugin.options.filename) === 'paper.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                    preset: ['default'],
            },
            canPrint: true
       }),
        new WebpackMd5Hash(),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
       })
    ]
 
}