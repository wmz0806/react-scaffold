const libConfig = require('../../library/config');

module.exports = {
  // 退出登录
  async logout(ctx) {
    ctx.session.user = {};
    ctx.redirect(libConfig.appLogin);
  },
};
