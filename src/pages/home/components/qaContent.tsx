/*
 * @Author: 蒋承志
 * @Description: 问答内容
 * @Date: 2020-09-18 11:59:31
 * @LastEditTime: 2020-10-09 17:06:24
 * @LastEditors: 蒋承志
 */
import React, {Component} from 'react';
import './qaContent.less';
import request from '@/utils/http';
import { Button } from 'antd';
import E from 'wangeditor';
import { getQa, getLabel, getQaType, getQaDetail, getRecord } from '@/servers/qaHome';
import AnswerModel from './answerModel';
import QuestionModel from './questionModel'

interface qaInfo{
  docId: string,
  docType: string
}
interface QaContentProps{
  actQaType: string,
  loginState: boolean,
  qaInfo: qaInfo,
  resetType: Function
}
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
  }
  componentDidMount() {
    this.initEditor();
    this.getLabel('');
    this.getQaType('');
    this.getRecord('');
    // this.getQaChatList();
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
      // question: editor.txt.text(),
      question: q,
      // question: '个人所得税法',
      type: this.props.actQaType
    }
    editor.txt.html('');
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
    console.log('this.messagesEnd :>> ', this.qaBoxCon);
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
      'image',  // 插入图片
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
    this.getQaChatList(label.nodeName)
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
    this.setState({
      labelScreenVal: '',
      labelList: [],
      qaList: [],
      actQaId: '',
      recordList: [],
      havaRecord: '1'
    });
    this.props.resetType();
  }
  submit() {
    this.getQaChatList(editor.txt.text());
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
    const { labelList, qaList, recordList, havaRecord } : any = this.state
    return (
      <div className="qaContent">
        <div className="qaInfo" ref={(el) => { this.qaBoxCon = el; }}>
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
                          <AnswerModel loginState={this.props.loginState} actQaType={this.props.actQaType} qaData={v} qaDetail={this.getQaDetail.bind(this)} getQa={this.getQaChatList.bind(this)} />
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
                  <AnswerModel loginState={this.props.loginState} actQaType={this.props.actQaType} qaData={v} qaDetail={this.getQaDetail.bind(this)} getQa={this.getQaChatList.bind(this)} />
                </div>
              })
            }
          </div>
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
              <Button onClick={() => this.closeChat()}>关闭会话</Button>
            </div>
            <div className="submit">
              <Button onClick={() => this.submit()}>发送</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default QaContent;