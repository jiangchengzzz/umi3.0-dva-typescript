import React, {Component} from 'react';
import 'antd/dist/antd.css';
import './index.less';
import { Tabs, message } from 'antd';
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';
import CommonQa from './components/commonQa';
import CorrelationCase from './components/correlationCase';
import FavoriteQa from './components/favoriteQa';
import QaContent from './components/qaContent';
import { LoginModelState, connect, Dispatch } from 'umi'

const { TabPane } = Tabs;

interface HomeProps{
  Login: LoginModelState,
  dispatch: Dispatch
}

class Home extends Component<HomeProps> {
  constructor(props: HomeProps){
    super(props)
  }
  state = {
    typeList: [
      {
        name: '全部',
        typeId: '99999',
        active: true
      },
      // {
      //   name: '办税事项',
      //   typeId: '0',
      //   active: false
      // },
      {
        name: '办税表单',
        active: false,
        typeId: '1'
      },
      {
        name: '办事指引',
        typeId: '2',
        active: false
      },
      {
        name: '法规依据',
        typeId: '3',
        active: false
      },
      {
        name: '电子税务局操作指引',
        typeId: '4',
        active: false
      },
      {
        name: '其他',
        typeId: '5',
        active: false
      }
    ],
    actQaType: '99999',
    actTabs: '1',
    isLogin: false,
    qaInfo: {
      docId: '',
      docType: ''
    }
  }
  resetState() {
    this.setState({
      typeList: [
        {
          name: '全部',
          typeId: '99999',
          active: true
        },
        {
          name: '办税事项',
          typeId: '0',
          active: false
        },
        {
          name: '办税表单',
          active: false,
          typeId: '1'
        },
        {
          name: '办事指引',
          typeId: '2',
          active: false
        },
        {
          name: '法规依据',
          typeId: '3',
          active: false
        },
        {
          name: '电子税务局操作指引',
          typeId: '4',
          active: false
        },
        {
          name: '其他',
          typeId: '5',
          active: false
        }
      ],
      actQaType: '99999',
      actTabs: '1',
      isLogin: false,
      qaInfo: {
        docId: '',
        docType: ''
      }
    })
  }
  componentWillMount() {
    // 组件挂载到DOM前调用
    console.log('this.props.login :>> ', this.props.Login);
  }
  componentWillReceiveProps(nextProps: any) {
    if (nextProps.Login.isLogin !== this.props.Login.isLogin) {
      this.setState({
        isLogin: nextProps.Login.isLogin
      })
    }
  }
  tabChange(v: string){
    this.setState({
      actTabs: v
    })
  }
  typeChange(type: string){
    const arr: any = this.state.typeList.map((v) => {
      if (type === v.typeId) {
        v.active = true;
      } else {
        v.active = false;
      }
      return v
    })
    this.setState({
      typeList: arr,
      actQaType: type
    })
  }
  getQa(v: any) {
    this.setState({
      qaInfo: {
        docId: v.docId,
        docType: v.docType
      }
    })
  }
  entranceClick(type: string) {
    let url = '';
    switch (type) {
      case '2':
        url = '/search/formProve';
        break;
      case '50':
        url = '';
        message.info('暂时不支持跳转')
        break;
      case '51':
        url = '';
        message.info('暂时不支持跳转')
        break;
      case '52':
        url = '';
        message.info('暂时不支持跳转')
        break;
      case '53':
        url = '';
        message.info('暂时不支持跳转')
        break;
      case '3':
        url = '/search/lawsRegulations';
        break;
    }
    if (url) {
      window.open(`/#${url}`, '_blank');
    }
  }
  render() {
    const { typeList, actTabs, actQaType } = this.state;
    return (
      <div className="homeContent">
        <div className="qaType">
          <div className="tltle">问题类别</div>
          <div className="typeList">
            {
              typeList.map((v) => {
                return (
                  v.active ?
                  <div className="qaType" key={v.typeId} onClick={() => {this.typeChange(v.typeId)}}>
                    <div className="img">
                      <img src={require(`../../assets/images/qa-type-${v.typeId}-active.png`)} alt=""/>
                    </div>
                    <div className="name active">{v.name}</div>
                  </div>
                  :
                  <div className="qaType" key={v.typeId} onClick={() => {this.typeChange(v.typeId)}}>
                    <div className="img">
                      <img src={require(`../../assets/images/qa-type-${v.typeId}.png`)} alt=""/>
                    </div>
                    <div className="name">{v.name}</div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="qaContentBox">
          <QaContent actQaType={actQaType} resetType={this.resetState.bind(this)} qaInfo={this.state.qaInfo} loginState={this.props.Login.isLogin} />
        </div>
        <div className="qaOther">
          <div className="recommend">
            <Tabs activeKey={actTabs} onChange={(v) => this.tabChange(v)}>
            <TabPane
              tab={
                <div className={actTabs === '1' ? 'tab-1 active' :'tab-1'}>
                  {/* <img src={require(`../../assets/images/qa-other-1${actTabs === '1' ? '-active' :''}.png`)} alt=""/> */}
                  <div></div>
                  常见问题
                </div>
              }
              key="1"
            >
              <CommonQa getQa={this.getQa.bind(this)} />
            </TabPane>
            {
              this.props.Login.isLogin ?
              <TabPane
                tab={
                  <div className={actTabs === '2' ? 'tab-2 active' :'tab-2'}>
                    <div></div>
                    我的收藏
                  </div>
                }
                key="2"
              >
                <FavoriteQa />
              </TabPane>
              : null
            }
            <TabPane
              tab={
                <div className={actTabs === '3' ? 'tab-3 active' :'tab-3'}>
                  <div></div>
                  相关案例
                </div>
              }
              key="3"
            >
              <CorrelationCase loginState={this.props.Login.isLogin} />
            </TabPane>
          </Tabs>
          </div>
          <div className="entrance">
            <div className="title">快速入口</div>
            <div className="enteranceList">
              <div className="entrance1" onClick={() => this.entranceClick('2')}></div>
              <div className="entrance2" onClick={() => this.entranceClick('50')}></div>
              <div className="entrance3" onClick={() => this.entranceClick('51')}></div>
              <div className="entrance4" onClick={() => this.entranceClick('52')}></div>
              <div className="entrance5" onClick={() => this.entranceClick('53')}></div>
              <div className="entrance6" onClick={() => this.entranceClick('3')}></div>
            </div>
            <div className="code">
              <div className="codeImg"></div>
              <div className="text">
                扫码手机资讯
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ Login } : { Login: LoginModelState }) => {
  // 从 state 中取出 namespace 为 users 的 store
  return {
    Login
  }
}
export default connect(mapStateToProps)(Home)