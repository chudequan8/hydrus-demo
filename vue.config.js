const path = require('path')
const webpack = require('webpack')
const release = require('./release')

const cdn = {
  js: [
    `//at.alicdn.com/t/${process.env.VUE_APP_FONT_HASH}.js`,
    'https://unpkg.com/viser-vue@2.4.6/umd/viser-vue.min.js',
    'https://unpkg.com/@antv/data-set@0.10.2/build/data-set.js'
  ],
  css: [
    'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css'
  ]
}

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  assetsDir: 'static',
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://192.168.50.247:8765',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      },
      '/channel': {
        target: 'http://0.0.0.0:12082',
        changeOrigin: true
      },
      '/stream': {
        target: 'http://0.0.0.0:12082',
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue'],
      alias: {
        // vue$: 'vue/dist/vue.esm.js',
        '@': resolve('src'),
        components: resolve('src/components'),
        views: resolve('src/views'),
        api: resolve('src/api'),
        utils: resolve('src/utils')
      }
    },
    /*
     * externals: 外部扩展 太大的包用cdn引入
     * @key: 引用的包名
     * @value: 此包暴露出的全局变量
     */
    externals: {
      'viser-vue': 'ViserVue',
      '@antv/data-set': 'DataSet'
    },
    performance: {
      // 关闭打包体积过大提示
      hints: false
    },
    plugins:
      process.env.NODE_ENV === 'development'
        ? []
        : [
            // 给文件头部添加本次打包信息
            new webpack.BannerPlugin({
              banner:
                '@buildTime: ' +
                release.buildTime +
                '\n' +
                '@branch: ' +
                release.branch +
                '\n' +
                '@commitId: ' +
                release.commitId,
              entryOnly: true
            })
          ]
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].cdn = cdn
      return args
    })
  }
}
