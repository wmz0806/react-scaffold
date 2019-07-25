import AJAX from 'client/utils/ajax';
import ajaxMap from 'client/services/login'; // 该模块的ajax
import RH from 'client/utils/route-helper'; // 该模块的ajax

const model = {

  namespace: 'login',

  state: {
    isLoad: false,
  },

  reducers: {
    set(state, {payload}) {
      return {...state, ...payload};
    },

    reset(state) {
      return {...state, ...model.state};
    },
  },

  effects: {
    // sage 调用例子
    * login({payload}, {call, put}) {
      yield put({type: 'set', payload: {isLoad: true}});
      const res = yield call(() => AJAX.send(ajaxMap.login, {...payload}));
      if (res.code === 0) {
        window.__USER__ = res.data || {};
        RH.push('page1', '/page1');
      }

      yield put({type: 'set', payload: {isLoad: false}});
    },
  },
};

export default model;
