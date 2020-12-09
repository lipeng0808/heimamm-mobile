// 导包
// 自动给css添加前缀
const autoprefixer = require('autoprefixer')
// 导包
// 将css转成rem
const pxtorem = require('postcss-pxtorem')
// 导入path
const path = require('path')
// 暴露出去
module.exports = {
  // css属性如何处理
  css: {
    // 处理的选项
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          // 使用 pxtorem库进行转换
          pxtorem({
            rootValue: 37.5,
            propList: ['*']
          })
        ]
      }
    }
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      // 设置全局使用less,
      patterns: [path.join(__dirname, './src/style/base.less')]
    }
  }
}
