'use strict'
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const name = process.env.VUE_APP_TITLE || '后台管理系统' // 网页标题

const port = process.env.port || process.env.npm_config_port || 90 // 端口

// vue.config.js 配置说明
//官方vue.config.js 参考文档 https://cli.vuejs.org/zh/config/#css-loaderoptions
// 这里只列一部分，具体配置参考文档
module.exports = {

    // 部署生产环境和开发环境下的URL。
    // 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上
    // 例如 https://www.xiaofei.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.xiaofei.vip/admin/，则设置 baseUrl 为 /admin/。
    publicPath: process.env.NODE_ENV === "production" ? "/" : "/",

    // 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
    outputDir: 'dist',

    // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
    assetsDir: 'static',

    // 是否开启eslint保存检测，有效值：ture | false | 'error'
    lintOnSave: process.env.NODE_ENV === 'development',

    // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    productionSourceMap: false,
    // 前后端分离项目，端口和IP都不一样，可以使用该配置将地址代理到后台服务器上

    devServer: {
        host: '0.0.0.0',
        port: port,
        open: true,
        //设置代理地址，指向目标主机，还可以根据匹配规则匹配多个目标服务器，具体看官网
        proxy: {
            // detail: https://cli.vuejs.org/config/#devserver-proxy
            [process.env.VUE_APP_BASE_API]: {
                //目标服务器，比如：请求地址为`/product/category/list`，最后请求地址为：【target的值+/product/category/list】
                target: `http://localhost:8888`,
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        },
        disableHostCheck: true
    },

    //设置@的作用
    configureWebpack: {
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')//在项目中使用@，会指定先src的目录下面
            }
        }
    },
}
