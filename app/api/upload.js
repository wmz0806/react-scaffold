const UploadScaffold = require('../utils/upload-scaffold');

const {tool, host} = global.globalConfig.backend;//eslint-disable-line

// 文件（图片）上传相关接口
module.exports = {
  // 上传图片
  async uploadImage(ctx, next) {
    const res = await UploadScaffold.uploadImage(ctx, `${tool}/OSSController/uploadImg`, 'fileImg');
    ctx.body = res.data;
    ctx.status = 200;
    next();
  },
};
