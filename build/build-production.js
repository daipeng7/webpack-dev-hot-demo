const webpack =  require("webpack");
const buildConfig = require("../config/webpack.build.config.js");

webpack(buildConfig, function(error, states){
    process.stdout.write(states.toString({
        colors: true,
        modules: true,
        children: false,
        chunks: false,
        chunkModules: false
    }));
});