const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );
const ExtractTextWebpackPlugin = require( 'extract-text-webpack-plugin' );
const webpack = require( 'webpack' );

module.exports = {
    devtool : '#cheap-module-eval-source-map',
    entry : {
        app : './src/main.js'
    },
    output : {
        // 一般配置到打包输出的一级目录
        path : path.resolve(__dirname, '../dist'),
        publicPath : '/',
        // 可以指定输出到后续子目录
        filename : 'js/[name].[chunkhash].boundle.js',
        chunkFilename : 'js/[id].[chunkhash].js'
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
            },
            {
                test : /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use : [
                    {
                        loader : 'url-loader',
                        options : {
                            limit : 10000,
                            name : 'img/[name].[hash:7].[ext]',
                            // 当超过大小时，指定加载器。
                            fallback : 'file-loader'
                        }
                    },
                    {
                        loader : 'image-webpack-loader',
                        options : {
                            bypassOnDebug : true
                        }
                    }
                ]
                
            },
            // {
            //     test : /\.js$/,
            //     loader : 'babel-loader'
            // },
            {
                test : /\.(htm|html)$/i,
                // 处理html页面中的img以路径引用问题
                loader : 'html-withimg-loader'
            }
        ]
    },
    // 解析规则设置,不适用于对 loader 解析
    resolve : {
        // 模块别名设置
        alias : {
            'assetCSS' : path.resolve( __dirname, '..', 'src', 'css' ),
            'assetJS' : path.resolve( __dirname, '..', 'src', 'js' )
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
            filename : 'index.html',
            template : 'index.html',
            inject : true,
            hash : true
        }),
        // 提取出css样式
        new ExtractTextWebpackPlugin({
            filename : './css/index.[chunkhash].css',
            allChunks : true //从所有相依赖的模块中提取CSS
        })
    ],
    // 性能提示
    performance : {
        // 超大提示，改提示不友好，会展示的页面上，默认warning
        // hints : 'error',
        // 静态支援文件大小阀值，默认250000
        // maxAssetSize : 600,
        // 一个提示过滤器
        // assetFilter : function(assetFilename){
        //     console.log(assetFilename);
        // }
    }
}