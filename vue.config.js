const path = require("path");
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            // 'text-color': '#111',
            // 'border-color': '#eee',
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "${path.resolve(
              __dirname,
              "src/assets/variables.scss"
            )}";`,
          },
        },
      },
    },
  },
  // webpack-dev-server 相关配置
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        // target: 'http://47.92.55.242:8050',
        target: 'http://localhost:8081/api',
        ws: true,
        changeOrigin: true,
        // pathRewrite: { '^/api': '' }
      }
    },
    historyApiFallback: true,
    allowedHosts: "all"
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '项目月报'
        return args
      });
  }
})
