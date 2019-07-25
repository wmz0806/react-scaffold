import React from 'react';
import cn from 'classnames';
import {connect} from 'dva';
import {hot} from 'react-hot-loader';
import RH from 'client/utils/route-helper';

import './style.less';

@connect(state => state)
@hot(module)
class Class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch({type: 'page1/getIndexData', payload: {}});
  }

  componentWillUnmount() {
  }

  // componentWillReceiveProps(){
  // }

  toPage2 = () => {
    RH.push('page2', '/page2', {state: {data: 123}});
  };

  toPage3 = () => {
    RH.push('page3', '/page3', {state: {data: 333}});
  };

  render() {
    // 在最外层加上当前模块的专属样式名，这样有效防止样式冲突
    return (<div className={cn('page1')}>
      <h1>
        page1
        <a
          href="javascript:;"
          onClick={() => {
            window.location.href = '/login/logout';
          }}
        >登出</a>
      </h1>
      <button onClick={this.toPage2}>跳转到page2</button>
      <br/>
      <button onClick={this.toPage3}>跳转到page3</button>
    </div>);
  }
}

export default Class;
