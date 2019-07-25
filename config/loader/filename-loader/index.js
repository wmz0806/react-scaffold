const loaderUtils = require('loader-utils');
const path = require('path');

const root = process.cwd();

module.exports = function (source) {
  // 忽略 node_modules
  if (this.resourcePath.indexOf([path.sep, 'node_modules', path.sep].join('')) !== -1) {
    return source;
  }

  let options = {};
  // 兼容新/老版的 loader-utils
  if (loaderUtils.getOptions) {
    options = loaderUtils.getOptions(this) || {};
  } else {
    options = loaderUtils.parseQuery(this.query) || {};
  }

  if (options.regEx === undefined) {
    options.regEx = '^[a-z][a-z0-9]*(-([a-z0-9])+)*$';
  }

  const extname = path.extname(this.resourcePath);

  if (extname === '.jsx') {
    throw new Error(`${this.resourcePath} 不允许使用 .jsx 后缀`);
  }

  if (options.regEx) {
    const regEx = new RegExp(options.regEx);
    const basename = path.basename(this.resourcePath, extname);
    const relative = path.dirname(path.relative(root, this.resourcePath)); // 相对路径
    const relativeContainer = relative.split(path.sep) || [];
    relativeContainer.push(basename);

    relativeContainer.forEach((name) => {
      if (!regEx.test(name)) {
        throw new Error(`${this.resourcePath} 文件/文件夹命名不规范`);
      }
    });

  }

  if (extname === '.js') {
    const result = source.match(/class\s([a-zA-Z0-9_\$]+)/);//eslint-disable-line
    if (result && result[1]) {
      const className = result[1];
      if (!/^[A-Z][A-Za-z0-9]*$/.test(className)) {
        throw new Error(`${this.resourcePath} ${className} 类命名不规范`);
      }
    }
  }
  return source;
};
