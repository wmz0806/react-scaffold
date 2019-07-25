const config = require('./global');
const backend = require('./backend');
// const sys = require('../sys.config').system;

const sys = process.env.SYSTEM || 'dev';

const o = sys === 'dev' ? backend.dev : sys === 'beforeProd' ? backend.beforeProd : backend.prod;

module.exports = {
  ...config,

  port: o.port,
  backend: {
    ...o.url,
  },

  path: '/public',
  publicPath: '/public', // webpack publicPath
  static: '/public', // 静态资源路径
  staticPath: '/public', // 静态资源 Path
};
