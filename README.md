# webpack_learn
[webpack 学习](https://juejin.cn/post/7023242274876162084#heading-7)

webpack5 新增资源模块(asset module)，允许使用资源文件（字体，图标等）而无需配置额外的 loader。
- asset/resource：将文件打包输出并导出 URL，类似于 file-loader。
- asset/inline：导出一个资源的 data URI，编码到 bundle 中输出，类似于 url-loader。
- asset/source：导出资源的源代码，类似于 raw-loader。
- asset：提供了一种通用的资源类型，根据设置的 Rule.parser.dataUrlCondition.maxSize 自动的在 asset/resource、asset/inline 之间做选择，小于该大小指定的文件视为 inline 模块类型，否则视为 resource 模块类型。
      