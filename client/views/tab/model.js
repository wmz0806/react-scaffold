import AJAX from 'client/utils/ajax';
import ajaxMap from 'client/services/home';

const model = {

  namespace: 'page1',

  state: {
    tab1: {
      // ...
    },
    tab2: {
      // ...
    },

    isLoad: false,
  },

  reducers: {
    set(state, {payload}) {
      return {...state, ...payload};
    },

    reset(state) {
      return {...state, ...model.state};
    },

    setTab1(state, {payload}) {
      return {...state, tab1: {...state.tab1, ...payload}};
    },

    setTab2(state, {payload}) {
      return {...state, tab2: {...state.tab2, ...payload}};
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
