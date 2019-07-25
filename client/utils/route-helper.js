import React from 'react';
import libConfig from 'library/config';
import Chunk from 'client/components/chunk';
import ChunkStorage from 'client/components/chunk/chunk-storage';
import {matchRoutes} from 'react-router-config';
import Tools from 'client/utils/tools';
import {message} from 'antd';
import {Route, Redirect, Switch} from 'dva/router';

let _history = null;

const _routerStack = [];
const push = (path, options = {}) => {
  if (!_history) return console.log('history is null');
  const delay = options.delay === undefined ? 16 : 0;
  const replace = options.replace === undefined ? 'push' : 'replace';
  delete options.delay;
  delete options.replace;
  // 这里是为了组件装载好了之后给程序更多的反映时间
  if (delay) {
    setTimeout(() => {
      _history[replace]({pathname: path, ...options});
    }, delay);
  } else {
    _history[replace]({pathname: path, ...options});
  }
  _routerStack.push(path);
};


const routeHelper = {};

// 设置 routeHelper history 的值
routeHelper.setHistory = (history) => {
  _history = history;
};

// 获取项目首页地址
routeHelper.getIndexRoute = () => libConfig.appIndex;

// 跳转
routeHelper.push = (key, path, options = {}) => {
  const loadable = ChunkStorage.get(key);
  if (loadable) {
    if (loadable.component) {
      push(path, options);
    } else {
      // 开始加载
      Tools.showLoading(300);
      ChunkStorage.load(key).then(() => {
        Tools.hideLoading();
        push(path, options);
      }).catch(() => {
        Tools.hideLoading();
        message.error('页面加载失败，请重试！');
      });
    }
  } else {
    push(path, options);
  }
};

// 返回上一页
routeHelper.goBack = () => {
  if (!_history) return console.log('history is null');
  if (_routerStack.length) {
    _history.goBack();
  } else {
    routeHelper.push(libConfig.appIndexKey, libConfig.appIndex);
  }
};

// 按需加载的包装函数
routeHelper.wrapper = (key, load, models) => {
  ChunkStorage.add(key, {load, models});
  return key;
};

// 路由的按需加载component
routeHelper.R = key => props => (
  <Chunk
    name={key}
    // error={o => (<NodeData type={'internet'} on={() => (o.reload())}/>)}
    otherProps={props}
  />
);

const isFunction = fun => Object.prototype.toString.call(fun) === '[object Function]';

routeHelper.renderRoutes = (routes, extraProps = {}, switchProps = {}, authPath = libConfig.appLogin) => (routes ? (
  <Switch {...switchProps}>
    {routes.map((route, i) => (
      <Route
        key={route.key || i}
        path={route.path}
        exact={route.exact}
        strict={route.strict}
        render={(props) => {
          if (isFunction(route.verify)) {
            if (route.verify(route)) {
              return <route.component {...props} {...extraProps} route={route}/>;
            }
            return (<Redirect to={{
              pathname: route.authPath ? route.authPath : authPath,
              state: {from: props.location},
            }}
            />);
          } else {
            return <route.component {...props} {...extraProps} route={route}/>;
          }
        }}
      />
    ))}
  </Switch>
) : null);

routeHelper.matchRoutes = (routes, pathname, integrity = false) => {
  const result = matchRoutes(routes, pathname);
  if (integrity) return result;
  if (result) return result.pop();
  return result;
};


routeHelper.formatting = (routes, parent = null, index = 0) => {
  const item = routes[index];
  if (item) {
    if (item.fatherPath) {
      const r = routeHelper.matchRoutes(routes, item.fatherPath);
      item.parent = r ? r.route : parent;
    } else {
      item.parent = parent;
    }

    if (item.globbing) {
      try {
        const globbingPath = item.component().props.to;
        const o = routeHelper.matchRoutes(routes, globbingPath);
        item.parent = o.route;
      } catch (e) {
        item.parent = routeHelper.getIndexRoute();
      }
    }

    if (Array.isArray(item.routes)) {
      routeHelper.formatting(item.routes, item, 0);
    }
    routeHelper.formatting(routes, parent, ++index);
  }
};

export default routeHelper;
