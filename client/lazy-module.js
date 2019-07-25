import RH from 'client/utils/route-helper';

// export const page1 = RH.wrapper('page1',
//   () => import(/* webpackChunkName: "page1" */ './views/page1'),
//   () => [import(/* webpackChunkName: "page1Model" */ './views/page1/model')],
// );

export const page2 = RH.wrapper('page2',
  () => import(/* webpackChunkName: "page2" */ './views/page2'),
  () => [import(/* webpackChunkName: "page2Model" */ './views/page2/model')],
);

export const page3 = RH.wrapper('page3',
  () => import(/* webpackChunkName: "page3" */ './views/page3'),
  () => [import(/* webpackChunkName: "page3Model" */ './views/page3/model')],
);

export const login = RH.wrapper('login',
  () => import(/* webpackChunkName: "login" */ './views/login'),
  () => [import(/* webpackChunkName: "loginModel" */ './views/login/model')],
);
