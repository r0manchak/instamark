const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const srcDir = path.join(__dirname, './src');
const distDir = path.join(__dirname, './dist');

module.exports = {
    entry: {
        popup: path.join(srcDir, 'popup.tsx'),
        background: path.join(srcDir, 'background.ts')
    },
    output: {
        path: distDir,
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    // devtool: argv.mode === 'development' ? 'inline-cheap-source-map' : undefined,
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!manifest.json']
        }),

        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "css/[id].css"
        }),

        new CopyWebpackPlugin([
            {from: './manifest.json', to: 'manifest.json'}
        ]),

        new HtmlWebpackPlugin({
            chunks: ['popup'],
            template: path.join(srcDir, 'popup.html'),
            filename: 'popup.html'
        })
    ]
};
