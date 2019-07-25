import React from 'react';
import {Redirect} from 'dva/router';
import libConfig from 'library/config';
import RH from 'client/utils/route-helper';

// import {page1, page2, page3, login} from './lazyModule';
import {page2, page3, login} from './lazy-module';

import page1 from './views/page1';

const verify = (route) => {
  console.log('这是浏览器内部的判断', route);
  const user = window.__USER__ || {};
  return !!user.token;
};

export const routes = [
  {
    component: RH.R(login),
    path: '/login',
    exact: true,
  },
  {
    component: page1,
    path: '/page1',
    exact: true,
    verify,
  },
  {
    component: RH.R(page2),
    path: '/page2',
    exact: true,
    verify,
  },
  {
    component: RH.R(page3),
    path: '/page3',
    exact: true,
    verify,
  },
  {
    component: props => <Redirect {...props} to={libConfig.appIndex}/>,
    path: '/*',
    exact: true,
  },
];

export default RH.renderRoutes(routes);

