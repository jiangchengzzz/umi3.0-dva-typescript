/*
 * @Author: 蒋承志
 * @Description: 登录model
 * @Date: 2020-09-18 11:59:31
 * @LastEditTime: 2020-09-24 19:15:11
 * @LastEditors: 蒋承志
 */
// import React, {Component} from 'react';
import React, { FC, Component } from 'react';
import './index.less';
import request from '@/utils/request';
import { Modal, Button } from 'antd';
import { LoginModelState, ConnectProps, connect, Dispatch } from 'umi'

// interface LoginModelProps extends ConnectProps {
//   Login: LoginModelState;
// }
// // 此为无状态组件，会自动传入props
// const LoginModelTest: FC<LoginModelProps> = (props) => {
//   const { modelVisble, name } = props.Login;
//   return <div>-我登录了----------------Hello {String(modelVisble)}---{name}</div>;
// };
// const mapStateToProps = ({ Login } : { Login: LoginModelState }) => {
//   // 从 state 中取出 namespace 为 users 的 store
//   return {
//     Login
//   }
// }
// export default connect(mapStateToProps)(LoginModelTest)

// interface LoginModelState extends ConnectProps {
//   Login: LoginModelState;
// }

interface LoginModelProps{
}

class LoginModel extends Component<LoginModelProps> {
  constructor(props: LoginModelProps){
    super(props)
  }
  state = {
    visible: false
  }
  componentDidMount() {
    // this.props.dispatch({
    //   type:'user/getCodeSrc'
    // })
    console.log('this.props123 :>> ', this.props);
  }
  componentWillReceiveProps(nextProps: any) {
    console.log('this.nextProps1 :>> ', nextProps);
    console.log('this.props1 :>> ', this.props);
  }
  showLoginModal() {
    this.setState({
      visible: true,
    });
  };
  handleOk (e: any){
    this.setState({
      visible: false,
    });
  };

  handleCancel (e: any){
    this.setState({
      visible: false,
    });
  };

  render() {
    const { labelList } : any = this.state
    return (
      <Modal
        title="Basic Modal"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        dsafasf
      </Modal>
    );
  }
}

const mapStateToProps = ({ Login } : { Login: LoginModelState }) => {
  // 从 state 中取出 namespace 为 users 的 store
  return {
    Login
  }
}
export default connect(mapStateToProps)(LoginModel)
// export default LoginModel;