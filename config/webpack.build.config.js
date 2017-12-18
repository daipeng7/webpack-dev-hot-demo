const merge = require("webpack-merge");
const webpack = require("webpack");
const path = require("path");
const baseConfig = require("./webpack.base.config.js");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

const buildConfig = merge(baseConfig, {
    entry : {
        app : path.resolve(__dirname, '../src/main.js')
    },
    output : {
        // 一般配置到打包输出的一级目录
        path : path.resolve(__dirname, '../dist'),
        // 可以指定输出到后续子目录
        filename : 'js/[name].[hash:16].js',
    },
    plugins : [
        new CleanWebpackPlugin( './dist/*', {
            root : path.resolve("./")
        }),
        new HtmlWebpackPlugin({
            title : 'build',
            filename : 'index.html',
            template : 'index.html',
            inject : true,
            hash : true
        })
    ]
});

module.exports = buildConfig;