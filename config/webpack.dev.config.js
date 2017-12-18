const merge = require('webpack-merge');
const path = require("path");
const webpack = require( 'webpack' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const baseConfig = require('./webpack.base.config.js');

// 添加HMR客户端到入口，是的每个入口文件模块都添加hot属性，从而监控所有依赖
Object.keys(baseConfig.entry).forEach(function(name, index){
    baseConfig.entry[name] = ['../build/dev-client.js'].concat(baseConfig.entry[name]);
});
const devConfig = merge(baseConfig, {
    devtool : "#cheap-module-eval-source-map",
    output : {
        // 一般配置到打包输出的一级目录
        path : path.resolve(__dirname, '../dist'),
        // 可以指定输出到后续子目录
        filename : 'js/[name].[hash:16].js',
        // publicPath : '/',
        // chunkFilename : 'js/[id].[chunkhash].js'
    },
    plugins : [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title : '测试 webpack-dev-middleware',
            filename : 'index.html',
            template : 'index.html',
            inject : true,
            hash : true
        })
    ]
});

module.exports = devConfig;