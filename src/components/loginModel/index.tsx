/*
 * @Author: 蒋承志
 * @Description: 登录model 可以直接用modelVisble控制显示隐藏，但是想试试控制状态组件中的状态来改变页面，因为
 * @Date: 2020-09-18 11:59:31
 * @LastEditTime: 2020-09-29 14:36:24
 * @LastEditors: 蒋承志
 */
// import React, {Component} from 'react';
import React, { FC, Component } from 'react';
import './index.less';
import { Modal, Button, Tabs, Form, Input } from 'antd';
import { LoginModelState, connect, Dispatch } from 'umi'
import { FormInstance } from 'antd/lib/form';
import { getPhonecode, getVcode, accountLogin, phoneLogin, userInfo, userBaseInfo, getPermission } from '@/servers/login';
import { handleWebStorage } from '@/utils/base'

const { TabPane } = Tabs;
const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
const tailLayout = {
  // wrapperCol: { offset: 8, span: 16 },
};
interface LoginModelProps{
  Login: LoginModelState,
  dispatch: Dispatch
}
// 图片组件
interface VcodeImgProps{
  imgSrc: string;
  imgClick: Function;
}
const VcodeImg: FC<VcodeImgProps> = props => {
  function imgClick() {
    props.imgClick();
  }
  return (
    <img src={props.imgSrc} onClick={imgClick} alt=""/>
  )
}

class LoginModel extends Component<LoginModelProps> {
  constructor(props: LoginModelProps){
    super(props)
  }
  accountFormRef = React.createRef<FormInstance>();
  phoneFormRef = React.createRef<FormInstance>();
  state = {
    visible: false,
    accountForm: {
      username: '',
      password: '',
      verifyCode: ''
    },
    phoneForm: {
      phoneNum: '',
      password: ''
    },
    vCodeImg: '',
    codeKey: ''
  }
  componentDidMount() {
    this.getVCode();
    // window.open('https://sw.noask-ai.com/#/search/all')
  }
  componentWillReceiveProps(nextProps: any) {
    if (nextProps.Login.modelVisble !== this.props.Login.modelVisble) {
      this.setState({
        visible: nextProps.Login.modelVisble
      })
    }
  }
  /**
   * @Description: 获取短信验证码
   * @return {type}
   * @Author: 蒋承志
   */
  async getVCode() {
    const data = {
      responseType: 'arraybuffer'
    }
    const res = await getVcode(data);
    const url = URL.createObjectURL(res.img)
    this.setState({
      vCodeImg: url,
      codeKey: res.codeKey
    })
  }
  /**
   * @Description: 获取短信验证码
   * @return {type}
   * @Author: 蒋承志
   */
  async getPhoneCode() {
    const data = {
      phone: this.phoneFormRef.current && this.phoneFormRef.current.getFieldValue('username')
    }
    await getPhonecode(data);
  }
  /**
   * @Description: 确认
   * @return {type}
   * @Author: 蒋承志
   */
  handleOk (e: any){
    this.props.dispatch({
      type:'Login/changeVisble',
      payload: {
        modelVisble: !this.props.Login.modelVisble
      }
    })
  };
  /**
   * @Description: 关闭
   * @return {type}
   * @Author: 蒋承志
   */
  handleCancel (e: any){
    this.props.dispatch({
      type:'Login/changeVisble',
      payload: {
        modelVisble: !this.props.Login.modelVisble
      }
    })
  };

  // 下面是账号登录内容
  /**
   * @Description: 账号校验成功
   * @return {type}
   * @Author: 蒋承志
   */
  async onFinishAccount(e: any) {
    const data = {
      client_id: 'portal',
      username: e.username,
      password: e.password,
      auth_type: 'simple',
      code: e.verifyCode,
      code_key: this.state.codeKey
    }
    const res = await accountLogin(data);
    handleWebStorage.setLocalData('access_token', res.result.access_token);
    handleWebStorage.setLocalData('token_type', res.result.token_type);
    this.getUserInfo()
    this.props.dispatch({
      type:'Login/changeVisble',
      payload: {
        modelVisble: false,
        isLogin: true
      }
    })
  }
  getUserInfo() {
    userInfo()
    .then((res: any) => {
      handleWebStorage.setLocalData('araeCodeData', res);
    })
    userBaseInfo()
    .then((res: any) => {
      handleWebStorage.setLocalData('personalBaseData', res);
    })
    getPermission()
    .then((res: any) => {
      handleWebStorage.setLocalData('menuList', res.menuList)
      handleWebStorage.setLocalData('functionList', res.functionList)
    })
  }
  /**
   * @Description: 账号校验失败
   * @return {type}
   * @Author: 蒋承志
   */
  onFinishFailedAccount(e: any) {
  }
  async onFinishPhone(e: any) {
    const data = {
      client_id: 'portal',
      username: e.username,
      password: e.password,
      auth_type: 'vc'
    }
    const res = await phoneLogin(data);
    window.localStorage.setItem('access_token', res.access_token);
    window.localStorage.setItem('token_type', res.token_type);
    this.props.dispatch({
      type:'Login/changeVisble',
      payload: {
        modelVisble: false,
        isLogin: true
      }
    })
  }
  onFinishFailedPhone(e: any) {
  }
  render() {
    return (
      <Modal
        width={400}
        maskClosable={false}
        keyboard={false}
        footer={null}
        destroyOnClose={true}
        closable={true}
        title=""
        wrapClassName="loginModel"
        visible={this.state.visible}
        onOk={(e) => this.handleOk(e)}
        onCancel={(e) => this.handleCancel(e)}
      >
        <Tabs defaultActiveKey="2" centered>
          {/* <TabPane tab="微信登录" key="1">
            Content of Tab Pane 1
          </TabPane> */}
          <TabPane tab="账号登录" key="2" className="accountLogin">
            <Form
              {...layout}
              ref={this.accountFormRef}
              name="account"
              initialValues={{ remember: true }}
              onFinish={(e) =>this.onFinishAccount(e)}
              onFinishFailed={(e) =>this.onFinishFailedAccount(e)}
            >
              <Form.Item
                label="账号"
                name="username"
                rules={[{ required: true, message: '请输入账号' }]}
              >
                <Input placeholder="请输入账号"/>
              </Form.Item>

              <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: '请输入正确的密码' }]}
              >
                <Input.Password placeholder="请输入密码"/>
              </Form.Item>
              <Form.Item label="验证码">
                <Form.Item
                  name="verifyCode"
                  noStyle
                  rules={[{ required: true, message: '请输入验证码' }]}
                >
                  <Input style={{ width: 205 }} placeholder="请输入验证码" />
                </Form.Item>
                <div className="codeImg">
                  <VcodeImg imgSrc={this.state.vCodeImg} imgClick={this.getVCode.bind(this)} />
                </div>
              </Form.Item>

              {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>记住密码</Checkbox>
              </Form.Item> */}

              <Form.Item {...tailLayout}>
                <Button type="primary" className="loginSubmit" htmlType="submit">
                  登录
                </Button>
              </Form.Item>
              <Form.Item {...tailLayout}>
                <div className="statement">登录即同意税悟<span>《免责声明》</span></div>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="手机登录" key="3" className="phoneNum">
            <Form
              {...layout}
              ref={this.phoneFormRef}
              name="phone"
              initialValues={{ remember: true }}
              onFinish={(e) =>this.onFinishPhone(e)}
              onFinishFailed={(e) =>this.onFinishFailedPhone(e)}
            >
              <Form.Item
                label="手机"
                name="username"
                rules={[{ required: true, message: '请输入手机号码' }]}
              >
                <Input placeholder="请输入手机号码"/>
              </Form.Item>

              <Form.Item
                label="验证码"
                name="password"
                rules={[{ required: true, message: '请输入短信验证码' }]}
              >
                <div className="subPhoneCode">
                  <Input placeholder="请输入短信验证码"/>
                  <span onClick={() => this.getPhoneCode()}>获取验证码</span>
                </div>
              </Form.Item>
              <Form.Item {...tailLayout} name="phoneCode">
                <Button type="primary" className="loginSubmit" htmlType="submit">
                  登录
                </Button>
              </Form.Item>
              <Form.Item {...tailLayout}>
                <div className="statement">登录即同意税悟<span>《免责声明》</span></div>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
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