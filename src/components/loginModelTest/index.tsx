/*
 * @Author: 蒋承志
 * @Description: 登录model 这个是用来测试无状态组件中dva的应用，与交互
 * @Date: 2020-09-18 11:59:31
 * @LastEditTime: 2020-09-25 15:27:51
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
// class LoginModel extends Component<LoginModelProps> {
//   constructor(props: LoginModelProps){
//     super(props)
//   }
//   state = {
//     visible: false
//   }
//   componentDidMount() {
//     // this.props.dispatch({
//     //   type:'user/getCodeSrc'
//     // })
//     console.log('123123 :>> ', 123123);
//   }
//   componentWillReceiveProps(nextProps: any) {
//   }
//   showLoginModal() {
//     this.setState({
//       visible: true,
//     });
//   };
//   // getQaChatList() {
//   //   http.get('/api/qaChatList', {
//   //     params: {
//   //       value: this.state.labelScreenVal
//   //     }
//   //   }).then((res: any) => {
//   //     this.setState({
//   //       labelList: res.labelList
//   //     })
//   //   }).catch( (e: any) => {
//   //   })
//   // }
//   handleOk (e: any){
//     console.log(e);
//     this.setState({
//       visible: false,
//     });
//   };

//   handleCancel (e: any){
//     console.log(e);
//     this.setState({
//       visible: false,
//     });
//   };

//   render() {
//     const { labelList } : any = this.state
//     return (
//       <Modal
//         title="Basic Modal"
//         visible={this.state.visible}
//         onOk={this.handleOk}
//         onCancel={this.handleCancel}
//       >
//         dsafasf
//       </Modal>
//     );
//   }
// }
// export default LoginModel;