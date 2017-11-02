# 个人框架 #
#### 描述： ####


webpack在开发模式下的自动刷新功能，官方提供了webpack-dev-server来实现，但是该方法是一个固定的插件。如果我们需要根
据我们的项目结构定制化自己的自动刷新功能，该怎么办呢?<br>
官网上也有提及，但是都比较碎片化，所以就自己去完整的趟了一下坑，感觉还不错^_^。具体的就看demo了

#### 使用的重要技术点： ####

	1. express 用于搭建一个前端开发服务器
	2. webpack 必不可少的了
	3. webpack-dev-middleware  功能是监控webpack打包文件是否改变，如果改变就重新编译
	4. webpac-hot-middleware 功能是创建了一个socket，配合webpack的插件webpack.HotModuleReplacement插件实现模块热替换，也就是常说的HMR
	5. webpack.HotModuleRepalcement 这个是webpack的内部插件，实例化后会在模块对象上添加 module.hot
	6. webpack-hot-middleware/client?noInfo=true&reload=true  这个是在入口文件中添加的，起作用是将所有的模块都纳入HMR中

#### demo查看方法： ####
	1. npm i 或者 cnpm i 
	2. npm run dev       开发
	3. npm run build     生产

### 配置中路径的一些理解： ###
	（1）、context 环境变量。
            默认process.cwd()。等同于package.json所在的目录。其实就是执行代码进程路径，一般都为项目路径。
    （2）、entry 入口路径
            相对路径。相对的是context路径。所以如果context配置路径独立与项目路径，那么entry就要相对应的改变。
    （3）、output.path 打包输出路径
            默认process.cwd().所以建议配置成绝对路径。他确定了打包文件的输出地址，以后的绝大数插件等的filename的地址都是相对以这个地址来的。
    （4）、output.publicPath  loader等插件编译后输出的需要用href或者url访问的静态文件存放路径
            默认值为空字符串。静态资源最终访问路径 = output.publicPath + 资源loader或者插件等配置的输出路径。
            设置为相对路径，是相对于输出的index.html的路径来的。因为输出的index.html是相对于context的路径。所以其变相也是相对于context路径。
            设置为绝对路径，也是可以的。一般用法为直接打包到CDN或者公司静态资源服务器。
    （5）、webpack-dev-server   output.publicPath  这个设置的地址是访问打包资源相当于webpack.output.path。但是静态资源还是走的webpack.output.publicPath。所以建议设置为一致。
    （6）、html-webpack-plugin 
            template 
                路径是相对于context的路径                  
                this.options.template = this.getFullTemplatePath(this.options.template, compiler.context);
            filename  
                路径是相对于output.path的路径         
                在 webpack-dev-server 中，则相对于 webpack-dev-server 配置的 publicPath.   
                this.options.filename = path.relative(compiler.options.output.path, filename);
                
             若 webpack-dev-server 中的 publicPath 和 ouput.publicPath 不一致，在这种配置下使用html-webpack-plugin是有如下问题：
                自动引用的路径仍然以 ouput.publicPath 为准，和 webpack-dev-server 提供的资源访问路径不一致，从而不能正常访问；
                浏览 index.html 需要加上 webpack-dev-server 配置的 publicPath 才能访问（http://localhost:8282/web/）。

             这两个问题也反推出了最方便的配置为：
                ouput.publicPath 和 webpack-dev-server 的publicPath 均配置为'/'，vue-cli 就是这种配置
                template 放在根目录，html-webpack-plugin 不用修改参数的路径，filename 采用默认值。
                  
