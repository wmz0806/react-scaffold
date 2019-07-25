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
  }

  componentWillUnmount() {
  }

  // componentWillReceiveProps(){
  // }

  toPage1 = () => {
    RH.push('page1', '/page1', {state: {data: 321}, search: 'a=1'});
  };


  render() {
    return (<div className={cn('page2')}>
      <h1>page2</h1>
      <button onClick={this.toPage1}>跳转到page1</button>
      <button onClick={RH.goBack}>后退</button>
    </div>);
  }
}

export default Class;
