/*
 * @Author: 蒋承志
 * @Description: 我的收藏问题
 * @Date: 2020-09-18 11:59:31
 * @LastEditTime: 2020-10-13 16:24:30
 * @LastEditors: 蒋承志
 */
import React, { Component, FC } from 'react';
import './component.less';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button, message, Image } from 'antd';
import { setSolveType } from '@/servers/qaHome';
import { setFavoriteConfilm, setFavoriteCancel } from '@/servers/qaHome';

interface UserModalProps {
  qaData: any;
  getQa: Function;
  loginState: boolean;
  qaDetail: Function;
  actQaType: string;
  goPerson: Function,
  confirmLogin: Function
}
class AnswerModel extends Component<UserModalProps> {
  constructor(props: UserModalProps){
    super(props)
    this.conBox = React.createRef();
  }
  state = {
    upload: false,
    solveStatus: null,
    showUpload: false,
    isFavorite: false
  }
  componentDidMount() {
    const con = this.conBox.current;
    if (con) {
      if (this.state.showUpload === false) {
        if (con.clientHeight > 80) {
          this.setState({
            showUpload: true
          })
        }
      }
    }
  }
  componentDidUpdate() {
  }
  upload(type: boolean) {
    this.setState({
      upload: type
    })
  }
  labelClick(label: any) {
    this.props.getQa(label.nodeName, label);
  }
  relationClick(val: any) {
    if(this.props.loginState) {
      let url = '/detail/lawsRegulations';
      switch (String(val.docType)) {
        case '1':
          url = '/detail/manageStandard';
          break;
        case '2':
          url = '/detail/formProve';
          break;
        case '3':
          url = '/detail/lawsRegulations';
          break;
        case '4':
          url = '/detail/policyExplain';
          break;
        case '5':
          url = '/detail/ratepayingServeStandard';
          break;
        case '6':
          url = '/detail/inspectStandard';
          break;
        case '7':
          url = '/detail/fanLawsRegulations';
          break;
        case '8':
          url = '/detail/referCase';
          break;
        case '9':
          url = '/term/detail';
          break;
        default:
          break;
      }
      window.open(`/#${url}?id=${val.docId}&type=${val.docType}${val.docType === '6' ? `&version=${val.docVersion}` : ''}`, '_blank');
    } else {
      this.props.confirmLogin();
    }
  }
  otherIink(link: string) {
    window.open(link, '_blank');
  }
  blclLink(val: any) {
    if(this.props.loginState) {
      let url = '/detail/lawsRegulations';
      switch (String(val.docType)) {
        case '1':
          url = '/detail/manageStandard';
          break;
        case '2':
          url = '/detail/formProve';
          break;
        case '3':
          url = '/detail/lawsRegulations';
          break;
        case '4':
          url = '/detail/policyExplain';
          break;
        case '5':
          url = '/detail/ratepayingServeStandard';
          break;
        case '6':
          url = '/detail/inspectStandard';
          break;
        case '7':
          url = '/detail/fanLawsRegulations';
          break;
        case '8':
          url = '/detail/referCase';
          break;
        case '9':
          url = '/term/detail';
          break;
        case '12':
          url = '/detail/taxationGuide'
        default:
          break;
      }
      window.open(`/#${url}?id=${val.id}&type=${val.docType}${String(val.docType) === '6' ? `&version=${val.docVersion}` : ''}`, '_blank');
    } else {
      this.props.confirmLogin();
    }
  }
  selAnswerState(qaData: any) {
    if (qaData.state === 0) {
      return (
        <div className="infoContent">
          <div className="description" dangerouslySetInnerHTML={{__html: qaData.description}}></div>
        </div>
      )
    } else if(qaData.state === 1) {
      return (
        <div className="infoContent">
          <div className="description" dangerouslySetInnerHTML={{__html: this.props.qaData.description}}></div>
          {
            qaData.answer.docId && qaData.answer.docType !== 12 ?
            <div className="answerName link" onClick={() => this.relationClick(qaData.answer)}>{qaData.answer.docName}</div>
            :
            <div className="answerName">{qaData.answer.docName}</div>
          }
          <div className="answerContent">
            <div className={this.state.upload ? "answerContentBox upload": "answerContentBox"}>
              <div ref={this.conBox }>
                {
                  qaData.answer.docType === 2 ?
                  <div className="formImgBox">
                    {
                      qaData.answer.formImage.map((val: any, i: number) => {
                        return (
                          <div key={i} className="formImg">
                            <Image
                              // width={}
                              src={val}
                            />
                          </div>
                        )
                      })
                    }
                    <div className="imgTitle">
                      填表说明：
                    </div>
                  </div>
                  : null
                }
                {
                  qaData.answer.flowImgPath &&
                  <div className="flowImg">
                    <Image
                      // width={}
                      src={qaData.answer.flowImgPath}
                    />
                  </div>
                }
                <div className="contentAll">
                  <div className="contentHtml" dangerouslySetInnerHTML={{__html: qaData.answer.fullHtml}}>
                  </div>
                  {
                    qaData.answer.blclxxList.length >0 &&
                    <div className="blcl">
                      <div className="processTitle">准备材料</div>
                      <div className="blclList">
                        {
                          qaData.answer.blclxxList.map((v: any, i: number) => {
                            return (
                              v.id ?
                              <div key={i} className="blclLink blcItem" onClick={() => this.blclLink(v)}>{v.clMc}</div>
                              :
                              <div key={i} className="blcItem">{v.clMc}</div>
                            )
                          })
                        }
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
            {
              this.state.showUpload && <div className="upload">
                {
                  this.state.upload ?
                  <div onClick={() =>this.upload(false)}>
                    <span>收起更多</span>
                    <UpOutlined />
                  </div>
                  :
                  <div onClick={() =>this.upload(true)}>
                    <span>展开更多</span>
                    <DownOutlined />
                  </div>
                }
              </div>
            }
          </div>
          <div className="relationInfo">
            <div className="title">
              相关内容：
            </div>
            <div className="relationList">
              {
                qaData.answer.relations.map((v: any, i: number) => {
                  return (
                    <div className="docTypeItem" key={i}>
                      <div className="docType">{v.typeName}：</div>
                      <div className="docNameLIst">
                        {
                          v.content.map((val: any, i: number) => {
                            if (i < 2) {
                              return (
                                <div key={val.id} onClick={() => this.relationClick(val)} className="docItem">{ `${val.dispatchUnit} ${val.dirNum} ${val.name} ${val.writNo ? `（${val.writNo}）`: ''}` }</div>
                              )
                            }
                          })
                        }
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      )
    } else if (qaData.state === 2) {
      return (
        <div className="infoContent">
          <div className="description" dangerouslySetInnerHTML={{__html: qaData.description}}></div>
          <div className="labelList">
            {
              qaData.nodes.map((label: any) => {
                return (
                  <Button type="primary" onClick={() => this.labelClick(label)} shape="round" key={label.nodeId}>{label.nodeName}</Button>
                )
              })
            }
          </div>
        </div>
      )
    } else if (qaData.state === 3) {
      return (
        <div className="infoContent">
          <div className="description" dangerouslySetInnerHTML={{__html: qaData.description}}></div>
        </div>
      )
    } else if (qaData.state === 4) {
      return (
        <div className="infoContent">
          <div className="description otherIink" onClick={() => this.otherIink(qaData.description)} dangerouslySetInnerHTML={{__html: qaData.description}}></div>
          <div className="labelList">
          </div>
        </div>
      )
    } else if (qaData.state === 99) {
      return (
        <div className="infoContent">
          <div className="description" dangerouslySetInnerHTML={{__html: qaData.description}}></div>
          <div className="relationInfo">
            <div className="title">
              大家都在问：
            </div>
            <div className="commonList">
              {
                qaData.recommendedDocs.map((v: any) => {
                  return (
                    <div className="qaItem" key={v.docId} onClick={() => this.props.qaDetail(v)}>
                     {v.docName}
                    </div>
                  )
                })
              }
            </div>
          </div>
          {
            !this.props.loginState &&
            <div className="guideLogin">
              如需获取更好的服务，请 <span onClick={() => this.props.confirmLogin()} className="goLogin">登录</span> "税悟"
            </div>
          }
        </div>
      )
    }
  }
  async handle(type: boolean) {
    const data = {
      dialogId: this.props.qaData.dialogId,
      solved: type ? '1' : '0'
    }
    const res = await setSolveType(data);
    if (res.code === '1000') {
      this.setState({
        solveStatus: type ? true : false
      })
    }
  }
  async setFavorite(docId: string) {
    const data = {
      docId
    }
    if (this.state.isFavorite) {
      const res: any = await setFavoriteCancel(data);
      message.success('取消收藏成功');
      this.setState({
        isFavorite: !this.state.isFavorite
      })
    } else {
      const res: any = await setFavoriteConfilm(data);
      message.success('收藏成功');
      this.setState({
        isFavorite: !this.state.isFavorite
      })
    }
  }
  render() {
    const { qaData } = this.props;
    return (
      <div className="aModelbox">
        <div className="contentBox">
          <div className="robotImg"></div>
          <div className="robotAnswer">
            <div className="robotInfo">
              <span>税小悟</span>
              <span>{qaData.resTime}</span>
            </div>
            <div className="infoBox">
              {
                this.selAnswerState(qaData)
              }
            </div>
          </div>
          {
            qaData.state === 99 ||  qaData.state === 0 || qaData.state === 2 || qaData.state === 3 ?
            null
            :
            <div className="otherHandle">
              <div className="otherItem solveOk" onClick={() => this.handle(true)}>
                <div className={ this.state.solveStatus === true || qaData.solved ? 'img active' : 'img' }></div>
                <div className="text">已解决</div>
              </div>
              <div className="otherItem solveNo" onClick={() => this.handle(false)}>
                <div className={ this.state.solveStatus === false || qaData.solved === false ? 'img active' : 'img' }></div>
                <div className="text">未解决</div>
              </div>
              {
                this.props.loginState && (String(this.props.qaData.answer.docType) === '3' || String(this.props.qaData.answer.docType) === '2') ?
                <div className={ this.state.isFavorite === false ? 'otherItem favorite' : 'otherItem favorite active' } onClick={() => this.setFavorite(this.props.qaData.answer.docId)}>
                  <div className="img"></div>
                  <div className="text">收藏</div>
                </div>
                : null
              }
            </div>
          }
        </div>
        {
          qaData.state === 0 || this.state.solveStatus === false ?
          <div className="manualService">
            <div className="content">
              <span className="warningImg"></span>问题未解决？我要<span className="serviceBth" onClick={() => this.props.goPerson()}>转人工客服</span>
            </div>
          </div> : null
        }
      </div>
    )
  }
}

export default AnswerModel;