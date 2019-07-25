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
    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  // componentWillReceiveProps(){
  // }

  onLogin = () => {
    const {username, password} = this.state;
    const {dispatch} = this.props;
    dispatch({type: 'login/login', payload: {username, password}});
  };


  render() {
    const {username, password} = this.state;
    return (<div className={cn('login')}>
      <h1>登录</h1>
      <input type="text" placeholder={'账号'} value={username} onChange={e => this.setState({username: e.target.value})}/>
      <br/>
      <input
        type="password"
        placeholder={'密码'}
        value={password}
        onChange={e => this.setState({password: e.target.value})}
      />
      <br/>
      <button onClick={this.onLogin}>登录</button>
      <br/>
      <a
        href={'javascript:;'}
        onClick={() => {
          RH.push('page1', '/page1');
        }}
      >page1</a>
    </div>);
  }
}

export default Class;
