// 后端信息配置
module.exports = {
  // 测试
  dev: {
    url: {
      host: '',
      tool: 'http://tool.goodsogood.com/gs_dicitem',
    },
    port: 3333,
  },
  // 预发布
  beforeProd: {
    url: {
      host: '',
      tool: 'http://tool.goodsogood.com/gs_dicitem',
    },
    port: 8888,
  },
  // 正式
  prod: {
    url: {
      host: '',
      tool: 'http://tool.goodsogood.com/gs_dicitem',
    },
    port: 8888,
  },
};
