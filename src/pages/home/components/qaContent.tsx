/*
 * @Author: 蒋承志
 * @Description: 问答内容
 * @Date: 2020-09-18 11:59:31
 * @LastEditTime: 2020-10-13 11:29:34
 * @LastEditors: 蒋承志
 */
import React, {Component} from 'react';
import './qaContent.less';
import request from '@/utils/http';
import { Button, message } from 'antd';
import E from 'wangeditor';
import { getQa, getLabel, getQaType, getQaDetail, getRecord, confirmSocket } from '@/servers/qaHome';
import AnswerModel from './answerModel';
import QuestionModel from './questionModel';
import PersonServerAnswerModel from './personServerAnswerModel';
import http from '@/utils/http';
import { handleDate } from '@/utils/base';

/**
 * @Description: 空值判断函数
 * @return {type}
 * @Author: 蒋承志
 */
function checkVal(str: string) {
  let num = 0,
  reg = /<p>(&nbsp;|&nbsp;\s+)+<\/p>|<p>(<br>)+<\/p>/g;
  while (num < str.length && str != '')
  {
    num++;
    let k = str.match(reg);
    if (k) {
      str = str.replace(k[0], '');
    }
  }
  return str.length !== 0;
}
interface qaInfo{
  docId: string,
  docType: string
}
interface QaContentProps{
  actQaType: string,
  loginState: boolean,
  qaInfo: qaInfo,
  resetType: Function,
  confirmLogin: Function
}
let isSocket: any = null;
let editor: any;
class QaContent extends Component<QaContentProps> {
  constructor(props: QaContentProps){
    super(props)
  }
  qaBoxCon = null;
  state = {
    labelScreenVal: '',
    labelList: [],
    qaList: [],
    actQaId: '',
    recordList: [],
    havaRecord: '1', // 1：开始第一次，2：有且没有更多 3： 有更多
    isPersonServer: false,
    psList: []
  }
  componentDidMount() {
    this.initEditor();
    this.getLabel('');
    this.getQaType('');
    this.getRecord('');
  }
  componentWillReceiveProps(nextProps: any) {
    if (nextProps.actQaType !== this.props.actQaType) {
      editor.txt.html('');
      this.getLabel(nextProps.actQaType);
      this.getQaType(nextProps.actQaType);
      // 获取俩天记录
    }
    if (nextProps.qaInfo.docId !== this.props.qaInfo.docId) {
      this.getQaDetail(nextProps.qaInfo)
    }
  }
  goPerson() {
    message.info('已开启人工服务')
    this.setState({
      isPersonServer: true
    }, () => {
      this.startSocket();
    })
  }
  async startSocket() {
    const num: number = new Date().getTime();
    const loc: string = window.location.host;
    let host: string = 'kf'
    switch (loc) {
      case 'kf.sw.com':
        host =  'kf'
        break;
      case 'ysc.sw.com':
        host =  'ysc'
        break;
      case 'zsc.sw.com':
        host =  'zsc'
        break;
      case 'sw.noask-ai.com/':
          host =  'kf'
          break;
      default:
        break;
    }
    isSocket = new WebSocket(`ws://${host}.im.sxw.com:9595/app/3331333731383036?client=sxw&identity=${num}`);
    isSocket.onopen = () => {
      // Web Socket 已连接上，使用 send() 方法发送数据
    };
    isSocket.onmessage =  (evt: any) =>
    {
      const data = JSON.parse(evt.data)
      if (data.event === 'sxw-msg') {
        const resData: any = {
          dialogId: String(new Date().getTime()),
          state: 2,
          reqTime: data.data.dateTime,
          question: data.data.content,
          detailType: data.data.contentType
        }
        this.setState({
          psList: [...this.state.psList, resData]
        })
      }
    };
    // isSocket.onclose = function()
    // {
    //   // 关闭 websocket
    // };
    // 确认
    const res = await confirmSocket(num);
  }
  inputSocket(data: string) {
    const resData: any = {
      dialogId: String(new Date().getTime()),
      state: 1,
      reqTime: handleDate.dateFormat(new Date(), 'yyyy-mm-dd HH:MM'),
      question: data,
      detailType: ''
    }
    this.setState({
      psList: [...this.state.psList, resData]
    })
    isSocket.send(data);
  }
  async getQaType(type: string) {
    const data = {
      type: type === '99999' ? '' : type
    }
    editor.txt.html('');
    const res: any = await getQaType(data);
    const resData: any = res.result;
    this.setState({
      qaList: [resData],
      actQaId: resData.dialogId
    })
  }
  async getQaChatList(q: string, label?: any) {
    const data = {
      nodeId: label ? label.nodeId : '',
      preDialogId: this.state.actQaId,
      question: q,
      type: this.props.actQaType
    }
    const res: any = await getQa(data);
    const resData: any = res.result;
    this.setState({
      qaList: [...this.state.qaList, resData],
      actQaId: resData.dialogId
    }, () => {
      this.scrollBottom()
    })
  }
  async getQaDetail(info: qaInfo) {
    const data = {
      docId: info.docId,
      docType: info.docType,
    }
    // editor.txt.html('');
    const res: any = await getQaDetail(data);
    const resData: any = res.result;
    resData.answer.fullHtml = resData.answer.fullHtml;
    this.setState({
      qaList: [...this.state.qaList, resData],
      actQaId: resData.dialogId
    }, () => {
      this.scrollBottom()
    })
  }
  scrollBottom() {
    if (this.qaBoxCon) {
      const scrollHeight = this.qaBoxCon.scrollHeight;//里面div的实际高度  2000px
      const height = this.qaBoxCon.clientHeight;  //网页可见高度  200px
      const maxScrollTop = scrollHeight - height;
      this.qaBoxCon.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
      //如果实际高度大于可见高度，说明是有滚动条的，则直接把网页被卷去的高度设置为两个div的高度差，实际效果就是滚动到底部了。
    }
  }
  /**
   * @Description: 初始化富文本编辑器
   * @return {type}
   * @Author: 蒋承志
   */
  initEditor() {
    const elemMenu = this.refs.editorElemMenu;
    const elemBody = this.refs.editorElemBody;
    editor = new E(elemMenu,elemBody)
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    editor.customConfig.onchange = (html: any) => {
      this.setState({
        // editorContent: editor.txt.text()
        editorContent: editor.txt.html()
      })
    }
    editor.customConfig.menus = [
      'emoticon',  // 表情
      // 'image',  // 插入图片
    ];
    editor.customConfig.emotions = [
      {
        // tab 的标题
        title: 'emoji',
        // type -> 'emoji' / 'image'
        type: 'emoji',
        // content -> 数组
        content: ['😀', '😃', '😄', '😁', '😆']
      }
    ]
    // editor.customConfig.onfocus = function () {
    //   if (editor.txt.html() === '<p style="color: #cccccc">请输入您要资讯的问题</p>') {
    //     editor.txt.html('');
    //   }
    // }
    editor.customConfig.onchange = function (html: any) {
      // html 即变化之后的内容
    }
    editor.customConfig.uploadImgShowBase64 = true;
    editor.create();
    // editor.txt.html('<p style="color: #cccccc">请输入您要资讯的问题</p>');
  }
  async getLabel(type: string) {
    const data = {
      type
    }
    const res = await getLabel(data);
    this.setState({
      labelList: res.result.list
    })
  }
  labelClick(label: any) {
    if (this.state.isPersonServer) {
      this.inputSocket(label.nodeName);
    } else {
      this.getQaChatList(label.nodeName)
    }
  }
  showRecord() {
    if (this.state.havaRecord === '1') {
      this.setState({
        havaRecord: this.state.recordList.length === 10 ? '2' : '3'
      });
    } else {
      const record: any = this.state.recordList[0];
      this.getRecord(record.dialogId);
    }
  }
  closeChat() {
    if (this.state.isPersonServer) {
      isSocket.onclose = () =>
      {
        // 关闭 websocket
        message.info('已关闭人工服务')
      };
      this.setState({
        isPersonServer: false
      });
    } else {
      this.setState({
        labelScreenVal: '',
        labelList: [],
        qaList: [],
        actQaId: '',
        recordList: [],
        havaRecord: '1',
        isPersonServer: false,
        psList: []
      }, () => {
        this.getLabel('');
        this.getQaType('');
        this.getRecord('');
      });
    }

    this.props.resetType();
  }
  submit() {
    if (checkVal(editor.txt.html())) {
      if (this.state.isPersonServer) {
        this.inputSocket(editor.txt.html());
      } else {
        this.getQaChatList(editor.txt.html());
      }
      editor.txt.html('');
    } else {
      message.info('请输入有效的内容');
    }
  }
  async getRecord(dialogId: string){
    const data = {
      dialogId
    }
    const res = await getRecord(data);
    let flag: string;
    // 0: 啥都不显示 1： 只显示展示更多 2：都显示 3： 只显示记录
    if (!dialogId) {
      if (res.result.list.length > 0) {
        flag = '1';
      } else {
        flag = '0';
      }
    } else {
      flag = res.result.list.length === 10 ? '2' : '3';
    }
    this.setState({
      recordList: [...this.state.recordList , ...res.result.list],
      havaRecord: flag
    })
  }
  render() {
    const { labelList, qaList, recordList, havaRecord, psList } : any = this.state;
    console.log('this.state.isPersonServer', this.state.isPersonServer)
    return (
      <div className="qaContent">
        <div className="qaInfo" ref={(el) => { this.qaBoxCon = el; }}>
          {
            !this.state.isPersonServer ?
              <div className="qaList">
                {
                  havaRecord === '0' ?
                    null
                  :
                    <div className="record">
                      {
                        havaRecord !== '3' ?
                        <div className="showMoreRecord">
                          <span  onClick={() => this.showRecord()}>点击加载更多记录</span>
                        </div>
                        : null
                      }
                      {
                        havaRecord !== '1' ?
                          recordList.map((v: any) => {
                            return <div style={{pointerEvents: 'none'}} key={v.dialogId}>
                              {
                                v.state !== 99 && <QuestionModel loginState={this.props.loginState} qaData={v} />
                              }
                              <AnswerModel loginState={this.props.loginState} actQaType={this.props.actQaType} qaData={v} goPerson={this.goPerson.bind(this)} qaDetail={this.getQaDetail.bind(this)} getQa={this.getQaChatList.bind(this)} confirmLogin={() => this.props.confirmLogin()} />
                            </div>
                          })
                        : null
                      }
                    </div>
                }
                {
                  qaList.length > 0 &&
                  qaList.map((v: any) => {
                    return <div key={v.dialogId}>
                      {
                        v.state !== 99 && <QuestionModel loginState={this.props.loginState} qaData={v} />
                      }
                      <AnswerModel loginState={this.props.loginState} actQaType={this.props.actQaType} goPerson={this.goPerson.bind(this)} qaData={v} qaDetail={this.getQaDetail.bind(this)} getQa={this.getQaChatList.bind(this)} confirmLogin={() => this.props.confirmLogin()} />
                    </div>
                  })
                }
              </div>
             :
              <div className="qaList">
                {
                  psList.length > 0 &&
                  psList.map((v: any) => {
                    return <div key={v.dialogId}>
                      {
                        v.state === 1 && <QuestionModel loginState={this.props.loginState} qaData={v} />
                      }
                      {
                        v.state === 2 && <PersonServerAnswerModel loginState={this.props.loginState} qaData={v} />
                      }
                    </div>
                  })
                }
              </div>
          }

        </div>
        <div className="label">
          <div className="title">我想咨询：</div>
          <div className="labelList">
            {
              labelList.map((v: any) => {
                return (
                  <div className="labelItem" key={v.nodeId}>
                    <Button size="small" onClick={() => this.labelClick(v)}>{v.nodeName}</Button>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="importText">
          {/* <div className="importType">
          </div> */}
          <div className="importCon">
            <div className="text-area" >
              <div ref="editorElemMenu" className="editorElem-menu importType">
                <div className="yuyin typeItem"></div>
              </div>
              <div ref="editorElemBody" className="editorElem-body">
              </div>
            </div>
          </div>
          <div className="sub">
            <div className="close">
              <Button onClick={() => this.closeChat()}>
                {
                  this.state.isPersonServer ?
                  <span>结束人工咨询</span>
                  :
                  <span>关闭会话</span>
                }
              </Button>
            </div>
            <div className="submit">
              <Button type="primary" onClick={() => this.submit()}>发送</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default QaContent;