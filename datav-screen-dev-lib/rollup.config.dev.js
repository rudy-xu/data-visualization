const path = require('path')

const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')
const json = require('@rollup/plugin-json')
const vue = require('rollup-plugin-vue')
const postcss = require('rollup-plugin-postcss')

const inputPath = path.resolve(__dirname, './src/index.js')
const outputUmdPath = path.resolve(__dirname, './dist/datav.js')
const outputEsPath = path.resolve(__dirname, './dist/datav.es.js')

module.exports = {
  input: inputPath,
  output: [
    {
      file: outputUmdPath,
      format: 'umd',   // 输出的模块协议
      name: 'datavDevLib',  //output name
      globals: {
        vue: 'vue'
      }
    },
    {
      file: outputEsPath,
      format: 'es',   // 输出的模块协议
      name: 'datavDevLib',  //output name
      globals: {
        vue: 'vue'
      }
    },
  ],
  plugins: [
    vue(),
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**'
    }),
    json(),
    postcss({
      plugins: []
    })
  ],
  external: ['vue']
}
