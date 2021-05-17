const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode : 'production',
    output : {
        filename : '[name]-[contenthash].js',
        path : path.resolve(__dirname, 'docs')
    },
    plugins : [
        new MiniCssExtractPlugin({
            filename : 'style-[contenthash].css'    
        }), 
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template : './src/template.html',
            minify : false   
        })
    ],
    module : {
        rules : [
            {
                test : /\.scss$/,
                use : [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        sassOptions : {
                            minimize: false,
                            outputStyle: 'expanded'
                        }
                    }
                }]
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
});