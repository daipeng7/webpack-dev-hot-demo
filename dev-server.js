const express = require( 'express' );
const webpack = require( 'webpack' );
const opn =require( 'opn' );//node-open的增强版

const config = require( './webpack.config.js' );

const app = express();
const compiler = webpack( config );

const port = 3000;
// 在express中中间件的用法
/**
 * webpack-dev-middleware  伺服器
 * 1.负责监听webpack打包的文件，如果有变动就重新编译，编译过后的文件会放在内存中
 */
let webpackDevMiddleware = require( 'webpack-dev-middleware' )(compiler,{
    publicPath : config.output.publicPath,
    noinfo : true,
    quiet: true
});

/**
 * webpack-hot-middleware 热模块更新（服务器端），他这边需要与webpack中的webpack.HotModuleRepalcement()插件配合
 *      1.在entry中的入口文件需要配置服务端接口：webpack-hot-middleware/client?reload=true&noInfo=true
 *      2.还有一种方法可以完成1中的功能，就是在每一个入口模块内部设置module.hot.accept(使用了webpack.HotModuleReplacement插件后会在每一个模块内部添加hot属性)
 */ 
let hotMiddleWare = require( 'webpack-hot-middleware' )(compiler, {
    log : ()=>{

    }
});

// 解决index.html模板更新后浏览器不刷新的问题
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleWare.publish({ action: 'reload' })
      cb()
    })
});

app.use( webpackDevMiddleware );

app.use( hotMiddleWare );
webpackDevMiddleware.waitUntilValid( ()=>{
    opn( 'HTTP://localhost:3000',{
        // app : ['firefox']//默认浏览器
    } );
} );
app.listen( port, ()=>{
    console.log( 'express server running' );
} );