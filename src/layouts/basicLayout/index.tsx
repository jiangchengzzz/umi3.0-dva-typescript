import React, { Component } from 'react';
import './index.less';
import { Layout, Menu } from 'antd';
import LoginModel from '../../components/loginModel/index';
import { connect, Dispatch, LoginModelState } from 'umi';
import { handleWebStorage } from '@/utils/base';

const { Header, Content, Footer } = Layout;
interface LayoutProps{
  Login: LoginModelState
  dispatch: Dispatch;
}
class BasicLayout extends Component<LayoutProps> {
  state = {
    menuList: [
      {
        name: '工具',
        num: 1,
      },
      {
        name: '工具1',
        num: 1,
      },
    ]
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'Login/changeVisble',
      payload: {
        isLogin: handleWebStorage.getLocalData('access_token') ? true : false,
        userInfo: handleWebStorage.getLocalData('access_token') && handleWebStorage.getLocalData('personalBaseData') ? handleWebStorage.getLocalData('personalBaseData'): {}
      }
    })
  }
  handleClickMenu = (e: any) => {
  };
  handleClick = (e: any, v: any) => {
  };
  render() {
    return (
      <Layout className="layoutBox">
        <Header className="header-box" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="header-content">
            <div className="logoBox" onClick={
              () => {
                this.props.dispatch({
                  type: 'Login/changeVisble',
                  payload: {
                    modelVisble: !this.props.Login.modelVisble
                  }
                })
              }
            }>
                <div className="logo"></div>
                <div className="line"></div>
                <div className="text">税悟不懂问小悟</div>
            </div>
            <div className="top-menu">
              {/* <Menu theme="dark" mode="horizontal" onClick={this.handleClickMenu} defaultSelectedKeys={['1']}>
                {
                  (this.state.menuList.length <= 0) ? null : this.state.menuList.map((v, num) => {
                    return (
                      <Menu.Item key={num} onClick={
                        this.handleClick.bind(this, v)
                      }><Link to="/">{v.name}</Link></Menu.Item>
                    )
                  })
                }
              </Menu> */}
              <div className="person-box">
                {
                  this.props.Login.isLogin ?
                    <div className="userInfo">
                      <div className="img">

                        {/* <img src={'https://upload-images.jianshu.io/upload_images/3706166-920b4e5bd63329ae.jpeg?imageMogr2/auto-orient/strip|imageView2/2/w/960/format/webp'} alt=""/> */}
                        {/* <img src={require(this.props.Login.userInfo.avatar)} alt=""/> */}
                      </div>
                      <span>{this.props.Login.userInfo.userName}</span>
                    </div>
                  :
                    <div className="userInfo">
                      <span onClick={
                        () => {
                          this.props.dispatch({
                            type: 'Login/changeVisble',
                            payload: {
                              modelVisble: !this.props.Login.modelVisble
                            }
                          })
                        }
                      }>点击登录</span>
                    </div>
                }
              </div>
            </div>
          </div>
          <LoginModel />
        </Header>
        <Content className="site-layout">
          {this.props.children}
        </Content>
        <Footer style={{ textAlign: 'center', width: '1300px', margin: '0 auto', background: 'transparent' }}>不问科技</Footer>
      </Layout>
    )
  }
}

export default connect(Login=>Login)(BasicLayout);