import React from 'react';
import cn from 'classnames';
import {withRouter} from 'dva/router';
import {hot} from 'react-hot-loader';
import RH from 'client/utils/route-helper';

import './style.less';

@withRouter
@hot(module)
class Class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // 因为 BrowserRouter 不支持自定义history 特在此修复之后的 history
    this.props.app._history = this.props.history;
    RH.setHistory(this.props.history);
  }

  componentWillUnmount() {
  }

  // componentWillReceiveProps(){
  // }

  render() {
    const {children} = this.props;
    return (<div className={cn('layout-main')}>
      {children}
    </div>);
  }
}


export default Class;
