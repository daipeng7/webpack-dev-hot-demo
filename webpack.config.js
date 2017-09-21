const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );
const ExtractTextWebpackPlugin = require( 'extract-text-webpack-plugin' );
const webpack = require( 'webpack' );

module.exports = {
    devtool : '#cheap-module-eval-source-map',
    entry : {
        app : ['./dev-client' ,'./src/js/index.js'],
        print : ['./dev-client' ,'./src/js/print.js']
    },
    output : {
        path : path.resolve(__dirname, 'dist'),
        publicPath : '/',
        filename : '[name].boundle.js'
    },
    // 模块配置
    module : {
        // 模块规则（配置loader、解析器等选项）
        rules : [
            {
                test : /\.css$/,
                // 提取loader中的css样式
                use : ExtractTextWebpackPlugin.extract({
                    use : 'css-loader', //用什么loader解析
                    fallback : 'style-loader',//如果css-loader不能解析，就使用该loader
                    // publicPath : ''//覆盖loader中的publicPath
                }) 
            }
        ]
    },
    // 解析规则设置,不适用于对 loader 解析
    resolve : {
        // 模块别名设置
        alias : {
            'assetCSS' : path.resolve( __dirname, 'src', 'css' ),
            'assetJS' : path.resolve( __dirname, 'src', 'js' )
        },
        // 扩展名设置，默认.js && .json,作用是：能够在require模块时不带扩展名，如果设置'*'
        extensions : [ '.js', '.json', 'jsx', '.css', '.less' ],
        // 设置查找模块的目录
        // modules : [
        //     "node_modules",
        //     path.resolve(__dirname, "app")
        //   ]
    },
    plugins : [
        new webpack.HotModuleReplacementPlugin(),
        // new CleanWebpackPlugin( ['dist/*'] ),
        new HtmlWebpackPlugin({
            title : '测试 webpack-dev-middleware',
            filename : path.resolve( __dirname, 'dist','index.html' ),
            template : './index.html',
            inject : true,
            hash : true
        }),
        // 提取出css样式
        new ExtractTextWebpackPlugin({
            filename : './dist/css/[name].[contenthash].css',
            allChunks : true //从所有相依赖的模块中提取CSS
        })
    ]
}