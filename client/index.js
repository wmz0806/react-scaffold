import React from 'react';
import ReactDOM from 'react-dom';
import dva from 'dva';
import {StaticRouter, BrowserRouter} from 'dva/router';
import {message} from 'antd';
import createHistory from 'history/createBrowserHistory';
import ChunkHelper from 'client/components/chunk/chunk-storage';
import Layout from 'client/views/layout';
import routers from './router';
import models from './models/index';
import RH from 'client/utils/route-helper';

import './resource/css/public.less';

message.config({
  top: '45%',
  duration: 2.5,
  maxCount: 1,
});

if (__CLIENT__) {
  // 1. Initialize
  const state = window.__INITIAL_STATE__ || {};

  const history = createHistory();

  RH.setHistory(history);

  const app = dva({
    initialState: state,
    history,
  });

  // 2. Plugins
  // app.use({});

  // 3. Model
  models.forEach((model) => {
    app.model(model);
  });

  // 4. Router
  app.router(props => (
    <BrowserRouter>
      <Layout app={props.app}>
        {routers}
      </Layout>
    </BrowserRouter>
  ));

  ChunkHelper.app = app;

  // 5. Start
  const App = app.start();

  let renderMethod = null;
  if (module.hot) {
    module.hot.accept();
    renderMethod = ReactDOM.render;
  } else {
    renderMethod = ReactDOM.hydrate;
  }

  renderMethod(<App/>, document.getElementById('container'));
  // app._store.dispatch({type: 'global/set', payload: {...}});
}


export default (props, initialData) => { //eslint-disable-line
  const app2 = dva({
    initialState: {},
    history: createHistory(),
  });

  models.forEach((model) => {
    app2.model(model);
  });

  app2.router(() => (
    <StaticRouter
      location={props.location}
    >
      <Layout>
        {routers}
      </Layout>
    </StaticRouter>
  ));

  ChunkHelper.app = app2;

  const app2Html = app2.start()();

  // const {...} = initialData;
  // app2._store.dispatch({type: 'global/set', payload: ...});

  return {html: app2Html, state: app2._store.getState()};
};

