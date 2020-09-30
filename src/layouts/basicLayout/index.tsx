import React, { Component } from 'react';
import './index.less';
import { Layout, Menu } from 'antd';
import { Link } from 'umi'
import LoginModel from '../../components/loginModel/index'
import { connect, Dispatch, LoginModelState } from 'umi'

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
              <div className="person-box"></div>
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