const path = require("path");
const app_dir = __dirname;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { SourceMapDevToolPlugin } = require("webpack");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const buildMode = process.env.mode || 'development'

console.log("\x1b[32m", `********************building in ${buildMode} mode*********************`)

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: app_dir + '/index.html',
    filename: 'index.html',
    inject: 'body'
});

const config = {
    entry: app_dir + '/index.js',
    output: {
        path: __dirname + '/dist',
        filename: '[name].[contenthash].js',
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    module: {
        rules: [{
            test: /\.s?css$/,
            use: [
                // MiniCssExtractPlugin.loader,
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }, {
            test: /\.(js|jsx)$/,
            exclude: /nodeModules/,
            use: {
                loader: 'babel-loader'
            }
        },
        {
            test: /\.(woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            exclude: [/node_modules/],
            loader: "file-loader"
        },
        {
            test: /\.(jpe?g|png|gif|svg)$/i,
            exclude: [/node_modules/],
            loader: "file-loader"
        },
        {
            test: /\.(pdf)$/i,
            exclude: [/node_modules/],
            loader: "file-loader",
            options: {
                name: '[name].[ext]',
            },
        },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        HTMLWebpackPluginConfig, 
        new SourceMapDevToolPlugin({}), 
        // new MiniCssExtractPlugin()
    ],
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    devtool: (buildMode === 'development' ? 'source-map' : 'hidden-source-map'),
    optimization: {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
    },
    devServer: {
        port: 8080,
        // open: true,
        hot: true,
        inline: true,
        historyApiFallback: true,
    },
};

module.exports = config;