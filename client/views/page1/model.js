import AJAX from 'client/utils/ajax';
import ajaxMap from 'client/services/home';

const model = {

  namespace: 'page1',

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
    * getIndexData({payload}, {call, put}) {
      yield put({type: 'set', payload: {isLoad: true}});
      const res = yield call(() => AJAX.send(ajaxMap.getIndexData, {...payload}));
      if (res.code === 0) {
        console.log(res);
      }

      yield put({type: 'set', payload: {isLoad: false}});
    },
  },
};

export default model;
