# data-visualization
charts

* [vue-rfcs(vue 的一些提案)](https://github.com/vuejs/rfcs)
* [composition-api](https://github.com/vuejs/composition-api)
  * 一组低侵入式, 函数式的 API，使得我们能够更灵活地**组合**组件的逻辑
  * 路由问题
    * `const {ctx, proxy } = getCurrentInstance()`
      * ctx 中没有路由属性 - **需要使用 proxy.$router**

## 构建组件库 - `rolloup`
#### 构建 Vue 组件库需要的插件
```js
const resolve = require('rollup-plugin-node-resolve')  // 为了支持 vue, react
const commonjs = require('rollup-plugin-commonjs')  // 支持 CommonJs
const babel = require('rollup-plugin-babel')  // 版本编译，es6 - es5等等
const json = require('@rollup/plugin-json')  // 识别 json 文件
const vue = require('rollup-plugin-vue')    // 识别 vue 文件
const postcss = require('rollup-plugin-postcss') // 支持识别 css, sass等
```
<br/>

#### 配置
* npm 打包`script`
  ```json
  "scripts": {
    "dev": "rollup -wc rollup.config.dev.js",
    "build": "eslint ./src & rollup -c rollup.config.dev.js",
    "build:prod": "eslint ./src & rollup -c rollup.config.prod.js",
    "lint": "eslint ./src",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  ```
    * w - 监听，可视热启动
    * c - 创建
* **安装 `Eslint` - 否则真实项目中引用时候会报错**
  * `npm i -D esllint`
  * 执行 `./node_modules/.bin/eslint --init`
  * 修改 `.eslintrc.js` 文件 - 配置相关规则
* **导出模块化的标准**
  * umd - 输出的模块 - JS的函数
  * cjs(commonJS - node 模块的标准) - 输出的模块 - module.exports
    * 需要 webpack 进行打包 - umd 模块，因为找不到 `windows.module`
  * es - 输出的模块 - export default
    * 加入 `type=modlue`即可，`<script type="module">`
* **tree-shaking**
  * 去掉一些不必要的引入
  * ES6 - 不需要整体导出的时候，尽量采用挨个导出
    ```js
    export const a = 1;
    export const b = 2;
    import { a } from '..'

    // 而不是采用
    const a = 1;
    const b = 2;
    export default {a, b}
    import * as data from '..'
    ```
  * CommonJS
    ```js
    exports.a = 1;
    exports.b = 2;
    import { a } from '..'

    // 而不是采用
    const a = 1;
    const b = 2;
    module.exports = {a, b}
    import {a, b} from '..'
    ```
#### 插件
* rollup-plugin-commonjs
  * rollup 默认`es6`模块打包，不支持 `CommonJs` 模块
  * 需要为`CommonJs`打包，可以使用插件，否则会报错: `Error: 'default' is not exported by ...`
    * `npm install -D rollup-plugin-commonjs`

* rollup-plugin-node-resolve
  * 为了支持 `vue`，需要的一些插件
  * `npm install -D rollup-plugin-node-resolve`
    * 将代码中依赖的三方库中的内容一起混合打包（缺点打包后的文件有冗余，且体积变得），如果没有这个插件，打包后会报错: 找不到依赖的库
  * `external`属性可以解决上述问题，依然将三方库作为一个依赖，但不打包到文件中

* rollup-plugin-babel
  * 版本编译 - babel
  * 主要作用将 es6 的代码转换成之前的代码
    * 比如 es6 的箭头函数，有些浏览器是不支持的，需要转换为`function`样式
    * rollup - 使用插件`npm install -D rollup-plugin-babel`

* @rollup/plugin-json
  * rollup打包不识别`json`，报错：`Error: Unexpected token (Note...json)`
    * 安装 `json`插件 - `npm install -D @rollup/plugin-json`

* `terser` - 压缩
  * 安装 - `npm install -D rollup-plugin-terser`
#### 封装 vue 组件库
* 创建 Vue 文件
* 入口文件中引入
  ```js
  import Test2 from './Test2.vue'

  export default function(Vue) {
    Vue.component(Test2.name, Test2)
  }
  ```
* 打包
  * Error
    * Error: Unexpected token (Note that you need plugins to import files (*.vue) that are not JavaScript)
      * `npm i -D rollup-plugin-vue`
    * (plugin commonjs) SyntaxError: Unexpected token (2:2) in /Users/apple/data-visualization/datav-screen-dev-lib/src/Test.vue?vue&type=template&id=07bdddea&lang.js
      * `npm i -D rollup-plugin-postcss`
    * (plugin commonjs) SyntaxError: Unexpected token (2:2) in C:\Users\admin\Desktop\ts\ruleup\src\test.vue?vue&type=template&id=0f72a62a&lang.js
      * **可能是 plugin 的顺序有问题，将 vue() 放在最前面**
    * (plugin postcss) Error: You need to install one of the following packages: "sass", "node-sass" in order to process SASS files
      * `npm i -D sass`
    * Missing global variable name
      * 在 `output`中添加
        ```json
        globals: {
          vue: 'vue'
        }
        ```
#### 引用封装的组件库
* **html 中引用**
  * 在 `<script>` 中引入 vue 框架库
  * 在 `<script>` 中引入 打包好的文件
    ```js
    <script src="https://cdn.jsdelivr.net/npm/vue@3.1.0/dist/vue.global.prod.js"></script>
    <script src="../dist/datav.js"></script>

    <body>
        <div id="app">
            {{message}}
            <test-component></test-component>
        </div>
        <script>
            Vue.createApp({
                setup() {
                    var message = 'Hello world'
                    return {
                        message
                    }
                }
            }).use(window.datavDevLib).mount('#app')
        </script>
    </body>
    ```
* **vue 项目中引用**
  * **上传至 npm 引用**
  <br/>
  * 本地引用(**如果是热打包是可以动态调试的**) - `npm link`
    * 修改入口路径 - `package.json` - `main` - 指向打包后文件
    * 添加 `files` 属性 - 指定上传 npm 包含哪些文件
      ```json
      // package.json
      "files": [
        "dist",
        "src"
      ]
      ```
    * 执行 `npm link` - 本地做一个映射
      * 如果报错 - 删除 `node_modules`后重新 link
    * **进入真实的 vue 项目中**
      * 在 `package.json`中手动添加依赖
        * `datav-screen-lib-dev: "1.0.0"`
      * 执行 `npm link datav-screen-lib-dev` - 过一会儿，就会在 `node_modules`中引入对应组件库
      * 在`main.js`中引入组件
        ```js
        import datav from 'datav-screen-dev-lib'

        createApp(App).use(store).use(router).use(datav).mount('#app')

        // .vue 文件中
        <div>
          // 引用定义的组件
        </div>
        ```
      * **按需加载(减少包的体积)** - 类似于直接加载每一个组件源码
        * 需要 `npm install -D babel-plugin-component` 插件的支持
        * [插件安装参考 elementUI](https://element.eleme.cn/#/en-US/component/quickstart)
        * 如果使用`vue-cli`创建的项目，默认已经配置好了
          * 使用
            ```js
            import Test1 from 'datav-screen-dev-lib/src/components/Test1/index'

            createApp(App).use(store).use(router).use(Test1).mount('#app')
            ```
#### Vue3, Vue2 组件库兼容问题
* Vue3 封装的组件库是无法在 Vue2 项目中使用的
  * 修改 Vue3 组件库
    * 降低 `"rollup-plugin-vue": "^5.0.0"` 版本
    * 安装 `npm i -D vue-template-compiler`
    * 修改 vue 文件，替换掉一些 vue2 不支持的语法
* 值得注意的是，反过来是可以的 Vue2 组件库可以在 vue3 中使用
  * 但是一些 Vue3 的语法就没办法使用，比如： tree-shaking
  * 一些 vue3 废弃得语法也无法使用，比如: vue2 的 `filter功能`
* **建议**
  * Vue3 的项目还是使用 vue3 进行组件库开发
  * Vue2 的项目使用 vue2 进行组件库开发

**************************
# <center> SVG <center>
* 应用场景
  * 绘制 / 渲染 icon
  * 绘制动画
* 优势
  * svg 使用 `xml`格式 - 体积较小
  * 使用灵活 - 即可以通过 `style` 修改 icon 的一些属性
## viewport 和 viewBox
***********************
* Error: Vue 报错 之 Syntax Error: TypeError: this.getOptions is not a function
  * 可能就是版本原因了，安装的 sass-loader 版本太高，卸载安装低版本尝试一下
  * [sass/node-sass](https://github.com/sass/node-sass)
