/*
 * @Author: 蒋承志
 * @Description: 登录model 这个是用来测试无状态组件中dva的应用，与交互
 * @Date: 2020-09-18 11:59:31
 * @LastEditTime: 2020-10-12 20:38:48
 * @LastEditors: 蒋承志
 */
// import React, {Component} from 'react';
import React, { FC } from 'react';
import './index.less';
import http from '@/utils/http';
import { Modal, Button } from 'antd';
import { LoginModelState, ConnectProps, connect } from 'umi'

interface LoginModelProps extends ConnectProps {
  Login: LoginModelState;
}
// 此为无状态组件，会自动传入props
const LoginModelTest: FC<LoginModelProps> = (props) => {
  const { modelVisble, name } = props.Login;
  return <div>-我登录了----------------Hello {String(modelVisble)}---{name}</div>;
};
const mapStateToProps = ({ Login } : { Login: LoginModelState }) => {
  // 从 state 中取出 namespace 为 users 的 store
  return {
    Login
  }
}
export default connect(mapStateToProps)(LoginModelTest)