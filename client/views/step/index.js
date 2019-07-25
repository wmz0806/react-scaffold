import React from 'react';
import cn from 'classnames';
import {connect} from 'dva';
import {hot} from 'react-hot-loader';
import {Steps} from 'antd';

import './style.less';
import Step1 from './step1';
import Step2 from './step2';

const steps = [
  {
    title: '验证手机',
  },
  {
    title: '设置密码',
  },
];

@connect(state => state)
@hot(module)
class Class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  // componentWillReceiveProps(){
  // }

  setStep(step) {
    this.setState({current: step});
  }

  render() {
    const {current} = this.state;

    // 在最外层加上当前模块的专属样式名，这样有效防止样式冲突
    return (<div className={cn('step')}>
      <Steps className={cn('register-steps')} current={current}>
        {steps.map(item => <Steps.Step key={item.title} title={item.title}/>)}
      </Steps>
      <div className={cn('register-steps-actions')}>
        {current === 0 && <Step1 next={() => this.setStep(1)}/>}
        {current === 1 && <Step2/>}
      </div>
    </div>);
  }
}

export default Class;
