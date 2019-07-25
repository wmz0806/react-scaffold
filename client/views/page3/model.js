// import AJAX from 'client/utils/ajax';
// import ajaxMap from 'client/services/goodSoGood'; //该模块的ajax

const model = {

  namespace: 'tab',

  state: {
    tab1: {},
    tab2: {},

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
