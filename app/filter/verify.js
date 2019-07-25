// 验证
const libConfig = require('../../library/config');
const Tools = require('../utils/tool');

module.exports = (ctx, next) => {
  const {token} = ctx.session.user;
  if (token && Tools.checkToken(token)) return next();
  ctx.session.user = {};
  // 无效的用户
  ctx.redirect(libConfig.appLogin);
};
