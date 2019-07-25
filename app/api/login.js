const config = require('../config'); //eslint-disable-line

const {backend: {host}, apiPrefix} = global.globalConfig; //eslint-disable-line

module.exports = {
  // 登录
  async login(ctx, next) {
    // TODO 这里访问真实的后端获取结果
    // const {backend = config.backendDefaultKey} = ctx.request.headers;
    // const pathname = ctx.url.replace(apiPrefix, '');
    // const res = await ctx.curl(`${host}${patnname}`, {
    //   ...ctx.request.parameter,
    // }, 'POST');

    const {username, password} = ctx.request.parameter;
    if (username === '1' && password === '2') {
      const token = new Date().getTime();
      ctx.session.user = {token, username};
      ctx.body = {code: 0, data: ctx.session.user};
    } else {
      ctx.body = {code: -1, data: {}, message: '账号或密码错误'};
    }
    ctx.status = 200;
    next();
  },
};
