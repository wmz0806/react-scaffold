import axios from 'axios';
import {message, notification} from 'antd';

// const __DEV__ = false;

const Toast = message;

let _timer_ = null;

let loadingDelay = null;

export const instance = axios.create({
  baseURL: '/api/',
  timeout: 10 * 1000,
});

instance.interceptors.request.use(config => config);

instance.interceptors.response.use(response => response);

const range = (a, b) => Math.floor(Math.random() * (b - a) + a);

const Ajax = {
  send: (map, query = {}, autoToast = true, params = {}) => {
    let u = '';
    let method = '';
    if (typeof (map) === 'object') {
      u = map.url;
      method = map.method.toLocaleUpperCase();
    } else {
      // 正常情况这里的代码不会执行
      autoToast && Toast.error('参数错误');
    }

    const {__autoLoading} = query;
    delete query.__autoLoading;
    params.headers = {
      ...params.headers,
      Backend: map.backend,
    };
    return method === 'GET' ? Ajax.get(u, query, autoToast, __autoLoading, params) : Ajax.post(u, query, autoToast, __autoLoading, params);
  },
  get: (url, query = {}, autoToast = true, autoLoading = false, params) => new Promise((resolve, reject) => {
    if (url.indexOf(':') !== -1) {
      Object.keys(query).forEach((k) => {
        if (url.indexOf(`:${k}`) !== -1) {
          url = url.replace(`:${k}`, query[k]);
          delete query[k];
        }
      });
    }
    return AJAXPack(instance.get, url, 'GET', {...params, params: query}, autoToast, autoLoading, resolve, reject);
  }),
  post: (url, query = {}, autoToast = true, autoLoading = false, params) => new Promise((resolve, reject) => AJAXPack(instance.post, url, 'POST', query, autoToast, autoLoading, resolve, reject, params)),
};

const AJAXPack = (instanceMethod, url, method, query, autoToast, autoLoading, resolve, reject, params) => {
  let color = '';
  if (__DEV__) {
    color = `color: rgb(${range(0, 200)},${range(0, 200)},${range(0, 200)})`;
    console.log('--------------------------------准备发送AJAX----------------------------------');
    console.log(`%cURL：${url}`, color);
    console.log('method：', method);
    console.log('body：', method === 'GET' ? query.params : query);
  }

  if (autoLoading) {
    loadingDelay && loadingDelay();
    clearTimeout(_timer_);
    _timer_ = setTimeout(() => {
      loadingDelay = Toast.loading(typeof (autoLoading) === 'string' ? autoLoading : '加载中...', 15);
    }, 233);
  }

  return instanceMethod(url, query, method === 'POST' ? params : undefined).then((response) => {
    __DEV__ && console.log(`%curl=${url}`, color, '成功', '返回结果：\n', 'data： ', response.data);
    if (autoLoading) {
      loadingDelay && loadingDelay();
      clearTimeout(_timer_);
    }
    if (response.statusText === 'OK') {
      const {data} = response;
      if (data.code === -10000 || data.code === 700) {
        notification.destroy();
        notification.error({
          className: 'gsg-notification-error',
          duration: null,
          message: '登录已失效请，2秒后重新登录',
        });
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else if (data && (parseInt(`${data.code}`, 10) === 0 || !('code' in data))) {
        // 响应成功
        data.code = 0;
        resolve(data);
      } else {
        // 系统级别错误
        const err = new Error(data.message);
        err.code = data.code;
        err.data = data;
        throw err;
      }
    } else {
      // 服务器级别错误
      const err = new Error('访问服务器失败！');
      err.code = -8999;
      throw err;
    }
  }).catch((error) => {
    __DEV__ && console.log(`%curl=${url}`, color, '失败', '错误信息：', error, '\n');

    autoLoading && loadingDelay && loadingDelay();

    if (autoToast) {
      if (error.message.toString().indexOf('timeout') !== -1) {
        Toast.error('访问服务器超时');
      } else {
        Toast.error(error.message || '访问服务器失败');
      }
    }

    const o = error.data || {};
    resolve({...o, code: error.code || -10086, message: error.message || '访问服务器失败'});
  });
};

export default Ajax;
