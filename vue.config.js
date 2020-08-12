const path = require('path')

module.exports = {
  outputDir: process.env.outputDir,
  productionSourceMap: false,
  publicPath: './',
  devServer:{
    proxy: {
      '/api': {
        target: process.env.VUE_APP_REAL_URL,
        secure: false, // 默认情况下，不接受运行在HTTPS上且使用了无效证书的后端服务器。
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: {
    output: {
      chunkFilename: 'js/[name].[chunkhash:8].js' // 不在output.entry中的文件，异步加载模块的文件名。
    },
  },
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
          args[0].title = '漫想家';
          return args;
        })
    // config.resolve.alias
    //   .set('components', path.join(__dirname,'src/components'))
  },
  css: {
    sourceMap: process.env.NODE_ENV == 'development' ? true : false,
    loaderOptions: {
      stylus: {
        import: '~@/assets/css/variables.styl'
      }
    }
  },
}