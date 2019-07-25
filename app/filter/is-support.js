const libConfig = require('../../library/config');
// 验证是否是支持的浏览器
module.exports = (ctx, next) => {
  const {'user-agent': userAgent} = ctx.request.header;// 取得浏览器的userAgent字符串
  const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1; // 判断是否IE<11浏览器
  if (!isIE) return next();
  ctx.redirect(libConfig.appUnsupported);
};
