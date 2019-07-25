import React from 'react';
import cn from 'classnames';
import {connect} from 'dva';
import {hot} from 'react-hot-loader';
import {Tabs} from 'antd';

import './style.less';
import Tab1 from './tab1';
import Tab2 from './tab2';

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

  render() {
    // 在最外层加上当前模块的专属样式名，这样有效防止样式冲突
    return (<div className={cn('tab')}>
      <Tabs defaultActiveKey="1" className={cn('tab-box')}>
        <Tabs.TabPane tab="基本资料" key="1">
          <Tab1/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="额外资料" key="2">
          <Tab2/>
        </Tabs.TabPane>
      </Tabs>
    </div>);
  }
}

export default Class;
