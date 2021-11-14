const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
console.log('process.env.NODE_ENV=', process.env.NODE_ENV) // 打印环境变量
// 引入插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const config = {
  mode: 'development', // 模式
  entry: './src/index.js', // 打包入口地址
  output: {
    filename: "bundle.js", // 输出文件名
    path: path.join(__dirname, 'dist'), // 输出文件目录
  },
  module: {
    rules: [ // 转换规则
      // {
      //   test: /\.css$/, // 匹配所有的 css 文件
      //   use: ['style-loader','css-loader', 'postcss-loader'] // use: 对应的 Loader 名称
      // },
      {
        test: /\.(s[ac]|c)ss$/i, //匹配所有的 sass/scss/css 文件
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader, // 添加 loader
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]
      },
      // -------webpack 4.x 图片、字体资源打包写法-----------
      // {
      //   test: /\.(jpe?g|png|gif)$/i, // 匹配图片文件
      //   loader: 'file-loader', // 使用 file-loader
      //   type: 'javascript/auto',
      //   options: {
      //     name: '[name][hash:8].[ext]',
      //     esModule: false,
      //   },
      // },
      // {
      //   test: /\.(jpe?g|png|gif)$/i,
      //   type: 'javascript/auto',
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 50 * 1024,
      //         esModule: false,
      //         name: '[name][hash:8].[ext]',
      //       }
      //     }
      //   ],
      //   exclude: /node_modules/
      // },
      // {
      //   test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
      //   type: 'javascript/auto',
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 10 * 1024,
      //         esModule: false,
      //         name: 'fonts/[name][hash:8].[ext]',  // 体积大于 10KB 打包到 fonts 目录下
      //       }
      //     }
      //   ],
      //   exclude: /node_modules/
      // },
      //   -------webpack 5 写法----------
      // asset/resource：将文件打包输出并导出 URL，类似于 file-loader。
      // asset/inline：导出一个资源的 data URI，编码到 bundle 中输出，类似于 url-loader。
      // asset/source：导出资源的源代码，类似于 raw-loader。
      // asset：提供了一种通用的资源类型，根据设置的 Rule.parser.dataUrlCondition.maxSize 自动的在 asset/resource、asset/inline 之间做选择，小于该大小指定的文件视为 inline 模块类型，否则视为 resource 模块类型。
      // {
      //   test: /\.(jpe?g|png|gif)$/i, // 匹配图片文件
      //   // webpack5内置了资源模块（assets），可以自己处理资源文件 https://www.jianshu.com/p/558cd247822d https://webpack.js.org/guides/asset-modules/#root
      //   type: 'asset',
      //   parser: {
      //     dataUrlCondition: {
      //       maxSize: 4 * 1024
      //     }
      //   },
      //   generator: {
      //     filename: 'static/[hash].[ext]'
      //   }
      // },
      {
        test: /\.(jpe?g|png|gif)$/i,
        type: 'asset',
        generator: {
          // 输出文件位置以及文件名
          // [ext] 自带 "." 这个与 url-loader 配置不同
          filename: "[name][hash:8][ext]"
        },
        parser: {
          dataUrlCondition: {
            maxSize: 50 * 1024 //超过50kb不转 base64
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        type: 'asset',
        generator: {
          // 输出文件位置以及文件名
          filename: "[name][hash:8][ext]"
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 超过100kb不转 base64
          }
        }
      },
      {
        test: /\.js$/i,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                  '@babel/preset-env'
              ],
            }
          }
        ]
      }
    ]
  },
  plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[hash:8].css'
      }),
      new CleanWebpackPlugin() // 引入插件
  ],
  devServer: {
    // webpack-dev-server @4.4.0版本 配置参数有变化，没有contentBase https://github.com/webpack/webpack-dev-server/blob/master/migration-v4.md
    static: {
      directory: path.resolve(__dirname, 'public'), // 静态文件目录
    },
    compress: true, // 是否启动压缩 gzip
    port: 8080, // 端口号
    // open:true // 是否自动打开浏览器
  }
};

module.exports = (env, argv) => {
  console.log('argv.mode=',argv.mode) // 打印 mode(模式) 值
  // 这里可以通过不同的模式修改 config 配置
  return config;
}