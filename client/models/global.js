// import AJAX from 'client/utils/ajax';

const model = {
  namespace: 'global',

  state: {},

  reducers: {
    set(state, {payload}) {
      return {...state, ...payload};
    },
    reset(state) {
      return {...state, ...model.state};
    },
  },

  effects: {
    // * findFirstValList({payload}, {call, put}) {
    // const res = yield call(() => AJAX.send(ajaxMapPublic.findFirstValList, {...payload}));
    // if (res.code === 0) {
    //   const {data = {}} = res;
    //   yield put({type: 'set', payload: {industry: formatValList(null, data.industry || [])}});
    // }
    // },
  },
};


export default model;
