const getBaseHtml = require('../utils/ssr');

module.exports = {
  async index(ctx, next) { //eslint-disable-line
    await getBaseHtml(ctx, 'index.ssr.js', {}, true);
  },
};

