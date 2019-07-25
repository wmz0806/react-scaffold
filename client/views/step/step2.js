import React from 'react';
import cn from 'classnames';
import {hot} from 'react-hot-loader';
import {connect} from 'dva';

import './style.less';

@connect(state => state)
@hot(module)
class Class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillUnmount() {
  }

  // componentWillReceiveProps(){
  // }

  render() {
    return (
      <div className={cn('step2')}>
        step2内容
      </div>
    );
  }
}

export default Class;
