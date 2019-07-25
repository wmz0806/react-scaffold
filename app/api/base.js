const config = require('../config'); //eslint-disable-line

const {backend: {host}, apiPrefix} = global.globalConfig; //eslint-disable-line

module.exports = {
  // 首页数据
  async index(ctx, next) {

    // TODO 这里访问真实的后端获取结果
    // const {backend = config.backendDefaultKey} = ctx.request.headers;
    // const pathname = ctx.url.replace(apiPrefix, '');
    // const res = await ctx.curl(`${host}${patnname}`, {
    //   ...ctx.request.parameter,
    // }, ctx.request.method || 'POST');

    // 模拟返回值
    const res = {
      // ...
      data: {code: 0, data: {a: 1}},
      // ...
    };

    ctx.body = res.data;
    ctx.status = 200;
    next();
  },
};
