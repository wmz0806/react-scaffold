const libConfig = require('../../library/config');

module.exports = {
  // 不支持的浏览器
  async unsupported(ctx) {
    const {'user-agent': userAgent} = ctx.request.header;// 取得浏览器的userAgent字符串
    const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1; // 判断是否IE<11浏览器
    if (isIE) {
      ctx.session.user = {};
      await ctx.render('unsupported');
    } else {
      ctx.redirect(libConfig.appIndex);
    }
  },
};
