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

  toPage2 = () => {
    RH.push('page2', '/page2', {state: {data: 222}});
  };

  render() {
    return (<div className={cn('page3')}>
      <h1>page3</h1>
      <button onClick={this.toPage2}>跳转到page2</button>
      <button onClick={RH.goBack}>后退</button>
    </div>);
  }
}

export default Class;
