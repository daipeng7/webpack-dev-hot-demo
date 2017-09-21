# webpack 自定义自动刷新 #
#### 描述： ####


webpack在开发模式下的自动刷新功能，官方提供了webpack-dev-server来实现，但是该方法是一个固定的插件。如果我们需要根
据我们的项目结构定制化自己的自动刷新功能，该怎么办呢?<br>
官网上也有提及，但是都比较碎片化，所以就自己去完整的趟了一下坑，感觉还不错^_^。具体的就看demo了

#### 使用的重点技术点： ####

1. express 用于搭建一个前端开发服务器
2. webpack 必不可少的了
3. webpack-dev-middleware  功能是监控webpack打包文件是否改变，如果改变就重新编译
4. webpac-hot-middleware 功能是创建了一个socket，配合webpack的插件webpack.HotModuleReplacement插件实现模块热替换，也就是常说的HMR
5. webpack.HotModuleRepalcement 这个是webpack的内部插件，实例化后会在模块对象上添加 module.hot
6. webpack-hot-middleware/client?noInfo=true&reload=true  这个是在入口文件中添加的，起作用是将所有的模块都纳入HMR中

#### demo查看方法： ####
1. npm install
2. npm run server
3. localhost:3000/index.html  

