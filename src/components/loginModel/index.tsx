/*
 * @Author: 蒋承志
 * @Description: 登录model
 * @Date: 2020-09-18 11:59:31
 * @LastEditTime: 2020-09-23 18:04:12
 * @LastEditors: 蒋承志
 */
import React, {Component} from 'react';
import './index.less';
import request from '@/utils/request';
import { Modal, Button } from 'antd';
import { connect } from 'dva'

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
    console.log('123123 :>> ', 123123);
  }
  componentWillReceiveProps(nextProps: any) {
  }
  showLoginModal() {
    this.setState({
      visible: true,
    });
  };
  // getQaChatList() {
  //   request.get('/api/qaChatList', {
  //     params: {
  //       value: this.state.labelScreenVal
  //     }
  //   }).then((res: any) => {
  //     this.setState({
  //       labelList: res.labelList
  //     })
  //   }).catch( (e: any) => {
  //   })
  // }
  handleOk (e: any){
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel (e: any){
    console.log(e);
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
export default LoginModel;