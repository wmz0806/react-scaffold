// 当前浏览器是否支持webp格式图片判断
import {message} from 'antd';

const checkWebP = () => {
  try {
    if (document.createElement('canvas').toDataURL) {
      return (document.createElement('canvas')
        .toDataURL('image/webp')
        .indexOf('data:image/webp') === 0);
    }
    return false;
  } catch (err) {
    return false;
  }
};
let isWebP = false;
if (__CLIENT__) {
  isWebP = checkWebP();
}

const Tools = {};

Tools.isWebP = () => isWebP;

/**
 * 获取显示金额
 * @param {number} number 实际金额
 * @param symbol ￥ 货币符号
 * @param hasDecimal number是否是元 true 元， false 分， 默认（false）
 * @param places 后面有几位小数
 * @param thousand 银行那种逗号, 显示符号
 * @param decimal 小数点符号
 */
Tools.getViewPrice = (number = 0, symbol = '', hasDecimal = false, places = 2, thousand = ',', decimal = '.') => {
  if (!hasDecimal) number = parseInt(number, 10) / 100;

  const negative = number < 0 ? '-' : '';
  const i = `${parseInt(number = Math.abs(+number || 0)
    .toFixed(places), 10)}`;
  const k = i.length;
  const j = k > 3 ? k % 3 : 0;
  return symbol + negative + (j ? i.substr(0, j) + thousand : '') + i.substr(j)
    .replace(/(\d{3})(?=\d)/g, `$1${thousand}`) + (places ? decimal + Math.abs(number - i)
    .toFixed(places)
    .slice(2) : '');
};

/**
 * 获取缩放比例
 * @param baseSize 基础字号大小
 * @returns {number}
 */
Tools.getZoomRate = (baseSize = 100) => {
  const {fontSize} = window.document.documentElement.style;
  const curSize = parseFloat(fontSize);
  return curSize / baseSize;
};

// UUID生成器
Tools.createUUID = (place, connector = '_') => {
  place = place || 3;
  /** @return {string} */
  const U = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1); //eslint-disable-line
  };
  let uuid = '';
  for (let i = 0; i < place; i++) uuid += U() + connector;
  return uuid + new Date().getTime()
    .toString(32);
};


Tools.getQueryString = (name, url) => {
  url = url || window.location.search;
  const temp = url.split('?');
  const search = temp[temp.length - 1];
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  const r = search.match(reg);
  if (r != null) return decodeURIComponent(r[2]);
  return null;
};

Tools.setUrlParam = (name, value, url) => {
  url = url || window.location.href;
  const tempArr = url.split('#');
  let currUrl = tempArr[0];
  const urlHash = tempArr[1];

  if (currUrl != null && currUrl !== 'undefined' && currUrl !== '') {
    value = encodeURIComponent(value);
    const reg = new RegExp(`(^|)${name}=([^&]*)(|$)`);
    const tmp = `${name}=${value}`;
    if (url.match(reg) != null) {
      currUrl = currUrl.replace(eval(reg), tmp); //eslint-disable-line
    } else if (url.match('[\?]')) { //eslint-disable-line
      currUrl = `${currUrl}&${tmp}`;
    } else {
      currUrl = `${currUrl}?${tmp}`;
    }
  }
  if (urlHash) currUrl += `#${urlHash}`;
  return currUrl;
};


/* eslint-disable */
//base64生成器
Tools._keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
//base64编码
Tools.encode = function (input) {
  let output = '';
  let chr1;
  let chr2;
  let chr3;
  let enc1;
  let enc2;
  let enc3;
  let
    enc4;
  let i = 0;
  input = this._utf8_encode(input);
  while (i < input.length) {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);
    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;
    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }
    output = output +
      this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
      this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
  }
  return output;
};
//base64解码
Tools.decode = function (input) {
  let output = '';
  let chr1;
  let chr2;
  let
    chr3;
  let enc1;
  let enc2;
  let enc3;
  let
    enc4;
  let i = 0;
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, ''); //eslint-disable-line
  while (i < input.length) {
    enc1 = this._keyStr.indexOf(input.charAt(i++));
    enc2 = this._keyStr.indexOf(input.charAt(i++));
    enc3 = this._keyStr.indexOf(input.charAt(i++));
    enc4 = this._keyStr.indexOf(input.charAt(i++));
    chr1 = (enc1 << 2) | (enc2 >> 4);
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    chr3 = ((enc3 & 3) << 6) | enc4;
    output += String.fromCharCode(chr1);
    if (enc3 !== 64) {
      output += String.fromCharCode(chr2);
    }
    if (enc4 !== 64) {
      output += String.fromCharCode(chr3);
    }
  }
  output = this._utf8_decode(output);
  return output;
};
//UTF-8编码
Tools._utf8_encode = function (string) {
  string = string.replace(/\r\n/g, '\n');
  let utftext = '';
  for (let n = 0; n < string.length; n++) {
    const c = string.charCodeAt(n);
    if (c < 128) {
      utftext += String.fromCharCode(c);
    } else if ((c > 127) && (c < 2048)) {
      utftext += String.fromCharCode((c >> 6) | 192);
      utftext += String.fromCharCode((c & 63) | 128);
    } else {
      utftext += String.fromCharCode((c >> 12) | 224);
      utftext += String.fromCharCode(((c >> 6) & 63) | 128);
      utftext += String.fromCharCode((c & 63) | 128);
    }
  }
  return utftext;
};
//UTF-8解码
Tools._utf8_decode = function (utftext) {
  let string = '';
  let i = 0;
  let c;
  let c2;
  let
    c3;
  c = c2 = 0;
  while (i < utftext.length) {
    c = utftext.charCodeAt(i);
    if (c < 128) {
      string += String.fromCharCode(c);
      i++;
    } else if ((c > 191) && (c < 224)) {
      c2 = utftext.charCodeAt(i + 1);
      string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
      i += 2;
    } else {
      c2 = utftext.charCodeAt(i + 1);
      c3 = utftext.charCodeAt(i + 2);
      string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
      i += 3;
    }
  }
  return string;
};
/* eslint-enable */

// 去掉字符串中的空格，第二个参数为全部去掉，默认为去掉前后
Tools.trimSpace = (str, flag) => {
  if (!str) return '';
  str = str.toString();
  if (!flag) {
    return str.trim();
  } else {
    return str.replace(/\s/g, '');
  }
};

// 显示loading样式
let _timer = null;
let _un = null;
Tools.showLoading = (delay = 300) => {
  // delay这个延迟显示loading是为了方式行动过快照成loading闪烁
  clearTimeout(_timer);
  if (delay) {
    _timer = setTimeout(() => {
      // 这里加上显示loading的方法
      _un = message.loading('加载中...', 15);
    }, delay);
  } else {
    // 立马显示
    // 这里加上显示loading的方法
    _un = message.loading('加载中...', 15);
  }
};


Tools.hideLoading = () => {
  clearTimeout(_timer);
  // 这里加上隐藏loading的代码
  _un && _un();
};


export default Tools;
