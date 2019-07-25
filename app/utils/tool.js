// const atob = require('atob');
/* eslint-disable no-plusplus,no-buffer-constructor */
const deBase64 = str => Buffer.from(str, 'base64').toString('binary');
const base64ToBuffer = str => new Buffer(str, 'base64');

// UUID生成器
const createUUID = (place, connector = '_') => {
  place = place || 3;
  /** @return {string} */
  const U = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1); //eslint-disable-line
  };
  let uuid = '';
  for (let i = 0; i < place; i++) uuid += U() + connector;
  return uuid + new Date().getTime().toString(32);
};


const isFunction = fun => Object.prototype.toString.call(fun) === '[object Function]';
const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]';

const checkToken = token => true; // TODO 用于验证token的真实性，自行修改

module.exports = {
  deBase64,
  base64ToBuffer,
  createUUID,
  checkToken,
};
