/*
 * @Author: 蒋承志
 * @Description: 我的收藏问题
 * @Date: 2020-09-18 11:59:31
 * @LastEditTime: 2020-09-30 16:16:33
 * @LastEditors: 蒋承志
 */
import React, { Component } from 'react';
import './component.less';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { setSolveType } from '@/servers/qaHome';

interface UserModalProps {
  qaData: any;
  getQa: Function;
  loginState: boolean;
  qaDetail: Function
}

class AnswerModel extends Component<UserModalProps> {
  constructor(props: UserModalProps){
    super(props)
  }
  state = {
    upload: false,
    solveStatus: null
  }
  upload(type: boolean) {
    this.setState({
      upload: type
    })
  }
  labelClick(label: any) {
    this.props.getQa('', label)
  }
  relationClick(id: string) {
    console.log('id :>> ', id);
  }
  otherIink(link: string) {
    window.open(link, '_blank');
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
          <div className="answerName">{qaData.answer.docName}</div>
          <div className="answerContent">
            <div className={this.state.upload ? "answerContentBox upload": "answerContentBox"}>
              {
                qaData.answer.docType === 2 ?
                <div className="formImgBox">
                  {
                    qaData.answer.formImage.map((val: any, i: number) => {
                      return (
                        <div key={i} className="formImg">
                          <img src={val} alt=""/>
                          {/* <img src={require('../../../assets/images/formImg.png')} alt=""/> */}
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
              <div className="contentHtml" dangerouslySetInnerHTML={{__html: qaData.answer.fullHtml}}></div>
            </div>
            <div className="upload">
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
                                <div key={val.id} onClick={(val: any) => this.relationClick(val.id)} className="docItem">{ `${val.dispatchUnit} ${val.dirNum} ${val.name}（${val.writNo}）` }</div>
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
  setFavorite() {
    console.log('收藏 :>> ');
  }
  render() {
    const { qaData } = this.props;
    console.log('qaData :>>12312 ', qaData);
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
                <div className={ this.state.solveStatus === true ? 'img active' : 'img' }></div>
                <div className="text">已解决</div>
              </div>
              <div className="otherItem solveNo" onClick={() => this.handle(false)}>
                <div className={ this.state.solveStatus === false ? 'img active' : 'img' }></div>
                <div className="text">未解决</div>
              </div>
              {
                this.props.loginState ?
                <div className="otherItem favorite" onClick={() => this.setFavorite()}>
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
              <span className="warningImg"></span>问题未解决？我要<span className="serviceBth">转人工客服</span>
            </div>
          </div> : null
        }
      </div>
    )
  }
}

export default AnswerModel;