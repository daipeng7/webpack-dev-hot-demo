const merge = require('webpack-merge');
const baseConfig = require('./webapck.base.config.js');

// 添加HMR客户端到入口，是的每个入口文件模块都添加hot属性，从而监控所有依赖
Object.keys(baseConfig).forEach(function(name, index){
    baseConfig[name] = ['../build/dev-client'].concat(baseConfig[name]);
});
const devConfig = merge(baseConfig, {
    
})