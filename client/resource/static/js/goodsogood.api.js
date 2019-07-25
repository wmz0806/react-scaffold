let jsBridge = null;
window.hostSdk = {
  queueCallback: [],
  init(callback) {
    if (!window.host_sdk.initialized) {
      window.hostSdk.queueCallback.push(callback);
    } else {
      callback();
    }
  },
  onInit() {
    jsBridge = new window.GoodSoGoodJSBridge();
    for (let i = 0; i < window.hostSdk.queueCallback.length; i++) {
      if (typeof window.hostSdk.queueCallback[i] === 'function') {
        window.hostSdk.queueCallback[i](window.hostSdk);
      }
    }
  },
  closePage() {
    if (jsBridge) {
      jsBridge.closePage();
    }
  },
  openShare(info, cb) {
    if (jsBridge) {
      jsBridge.openShare(info, (result) => { hostSdk.getObjectParams(result, cb); });
    }
  },
  getLocation(cb) {
    if (jsBridge) {
      jsBridge.getLocation((result) => { hostSdk.getObjectParams(result, cb); });
    } else {
      cb && cb({code: 1, msg: '方法不存在', message: '方法不存在' });
    }
  },
  getUserInfo(cb) {
    if (jsBridge) {
      jsBridge.getUserInfo((result) => {
        hostSdk.getObjectParams(result, cb);
      });
    }
  },
  selectPic(cb) {
    if (jsBridge) {
      jsBridge.selectPic((result) => { hostSdk.getObjectParams(result, cb); });
    }
  },
  recharge(cb) {
    if (jsBridge) {
      jsBridge.recharge((result) => { hostSdk.getObjectParams(result, cb); });
    }
  },
  scan(cb) {
    if (jsBridge) {
      jsBridge.scan((result) => { hostSdk.getObjectParams(result, cb); });
    }
  },
  openWIFI() {
    if (jsBridge) {
      jsBridge.openWIFI();
    }
  },
  openBluetooth() {
    if (jsBridge) {
      jsBridge.openBluetooth();
    }
  },
  openIntegralView() {
    if (jsBridge) {
      jsBridge.openIntegralView();
    }
  },
  setLoading(state) {
    if (state) {
      if (jsBridge) {
        jsBridge.show();
      }
    } else if (jsBridge) {
      jsBridge.hide();
    }
  },
  enterRnPage(message) {
    if (jsBridge) {
      jsBridge.enterRnPage(message);
    }
  },
  pay(payData, cb) {
    if (jsBridge) {
      jsBridge.pay(payData, (resultPay) => { hostSdk.getObjectParams(resultPay, cb); });
    } else {
      cb && cb({code: 1, msg: '方法不存在', message: '方法不存在' });
    }
  },
  payWithPayway(params, cb) {
    if (jsBridge) {
      jsBridge.payWithPayway(params, (resultPay) => { hostSdk.getObjectParams(resultPay, cb); });
    } else {
      cb && cb({code: 1, msg: '方法不存在', message: '方法不存在' });
    }
  },
  getAppInfo(cb) {
    if (jsBridge && jsBridge.getAppInfo) {
      jsBridge.getAppInfo((result) => { hostSdk.getObjectParams(result, cb); });
    } else {
      cb && cb({code: 1, msg: '方法不存在', message: '方法不存在' });
    }
  },
  openSpecifyUrl(params, cb) {
    if (jsBridge && jsBridge.openSpecifyUrl) {
      jsBridge.openSpecifyUrl(params, (result) => { hostSdk.getObjectParams(result, cb); });
    } else {
      cb && cb({code: 1, msg: '方法不存在', message: '方法不存在' });
    }
  },
  openNativePage(params, cb) {
    if (jsBridge && jsBridge.openNativePage) {
      jsBridge.openNativePage(params, (result) => { hostSdk.getObjectParams(result, cb); });
    } else {
      cb && cb({code: 1, msg: '方法不存在'});
    }
  },
  doSign(params, cb) {
    if (jsBridge && jsBridge.doSign) {
      jsBridge.doSign(params, (result) => { hostSdk.getObjectParams(result, cb); });
    } else {
      cb && cb({code: 1, msg: '方法不存在', message: '方法不存在' });
    }
  },
  getObjectParams(params, cb) {
    if ((typeof params === 'string') && (params.indexOf('{') > -1)) {
      params = JSON.parse(params);
      cb && cb(params);
      return params;
    } else if (typeof params === 'object') {
      cb && cb(params);
      return params;
    } else {
      cb && cb(params);
      return '';
    }
  },
};
window.host_sdk = {
  initialized: false,
  onInit() {
    window.host_sdk.initialized = true;
    if (hostSdk.onInit) {
      hostSdk.onInit();
    }
  },
};
