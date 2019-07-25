const router = require('koa-better-router')().loadMethods();
const path = require('path');
const libConfig = require('../library/config');

const filter = require('require-all')({
  dirname: path.join(__dirname, './filter'),
});

const controller = require('require-all')({
  dirname: path.join(__dirname, './controller'),
});

const api = require('require-all')({
  dirname: path.join(__dirname, './api'),
});

const {apiPrefix} = global.globalConfig;

// 封装需要登录检查的接口
const apiWrapper = {
  get: (url, apiController, prefix = apiPrefix) => {
    router.get(`${prefix}${url}`, filter['verify-api'], apiController, filter['verify-api-after']);
  },
  post: (url, apiController, prefix = apiPrefix) => {
    router.post(`${prefix}${url}`, filter['verify-api'], apiController, filter['verify-api-after']);
  },
};

// --------------------------- 不需要登录后就能访问的接口（api 打头） ---------------------------
router.post(`${apiPrefix}/login`, api.login.login); // 登录等特殊情况特殊处理

// --------------------------- 需要登录后才能访问的接口（不需要加 api 已封装） ---------------------------
apiWrapper.get('/*', api.base.index);
apiWrapper.post('/*', api.base.index);

// --------------------------- 页面/接口 跳转 ---------------------------
router.get('/login/logout', controller.login.logout);

router.get(libConfig.appLogin, filter['is-support'], filter['is-login'], controller.base.index);
router.get('/unsupported', controller.support.unsupported);

if (process.env.NODE_ENV !== 'development') {
  /* 首页服务端渲染 */
  router.get(libConfig.appIndex, controller.base.index);
}
// 兜底
router.get('/*', (ctx, next) => {
  const GC = ctx.globalConfig;
  const ignorePath = [GC.apiPrefix, GC.staticPath, '/favicon.ico'];
  if (ignorePath.some(p => ctx.url.indexOf(p) !== -1)) {
    return true;
  }
  return next();
}, filter['is-support'], filter.verify, controller.base.index);


module.exports = router;
