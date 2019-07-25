const getBaseHtml = require('../utils/ssr');

module.exports = {
  async index(ctx, next, isSSR) {
    await getBaseHtml(ctx, '', {}, isSSR);
  },
};

