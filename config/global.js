/* eslint-disable no-trailing-spaces */
const packageJson = require('../package.json');

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
  title: '固守前端组项目规范',

  company: '固守前端组', // 这里主要同于不支持页面项目展示

  version: packageJson.version,

  keys: [
    'X7ePVvvIMij4IJqD5uvfsfKtzFfxg5DicH8sdIMEBclYIpW4pbORZuBeFRsRkumD',
    'v0vFWVxQ56NbjbtbSWDKwxyF4ZN3IPn83HXZTxrWu5lIyHx4jjOtczBlvKRQaLDY',
    'BUhd55Am3Z4y8NVNSD0DCBMqNXNvp34lAcoNdPuvQJYJC32qVjlDSp0kw9ce9thn',
  ],
  session: {
    prefix: 'gsg-', // 保存在浏览器端 cookie 名称前缀
    key: 'goodsogood develop doc pc', // TODO 保存在浏览器端 cookie 名称 需要修改
    maxAge: 86400000, // cookie 过期时间(ms) 默认1天
    overwrite: true, // 是否覆盖（默认true）
    httpOnly: true, // 阻止脚本访问cookie（默认true）
    signed: true, // 是否额外增减签名cookie（默认true）
    rolling: false,
    renew: false,
  },

  env,
  contextPath: process.cwd(),
  path: '/build',
  publicPath: '/build', // webpack publicPath
  static: '/public', // 静态资源路径
  staticPath: '/public', // 静态资源 Path
  templateName: 'index.html', // 基础html模版名称
  apiPrefix: '/api', // API接口路径前缀
};
