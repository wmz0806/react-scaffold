// import AJAX from 'client/utils/ajax';
// import ajaxMap from 'client/services/goodSoGood'; //该模块的ajax

const model = {

  namespace: 'page2',

  state: {
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
    // * getData({payload}, {call, put}) {
    // yield put({type: 'set', payload: {isLoad: true}});
    // const res = yield call(() => AJAX.send(ajaxMap.getData, {...payload}));
    // if (res.code === 0) {
    //   yield put({type: 'set', payload: {list: res.data || []}});
    // }
    //
    // yield put({type: 'set', payload: {isLoad: false}});
    // },
  },
};

export default model;
