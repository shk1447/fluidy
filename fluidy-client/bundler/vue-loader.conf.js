// 웹펙 VUE 로더 설정
'use strict';
const utils = require('./utils');
const isProduction = process.env.NODE_ENV === 'production';
const sourceMapEnabled = true


module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: true,
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
};
