/*
 * @Author: 蒋承志
 * @Description: 问答内容
 * @Date: 2020-09-18 11:59:31
 * @LastEditTime: 2020-09-29 18:16:49
 * @LastEditors: 蒋承志
 */
import React, {Component} from 'react';
import './qaContent.less';
import request from '@/utils/http';
import { Button } from 'antd';
import E from 'wangeditor';
import { getQa, getLabel, getQaType, getQaDetail } from '@/servers/qaHome';
import AnswerModel from './answerModel';
import QuestionModel from './questionModel'

interface qaInfo{
  docId: string,
  docType: string
}
interface QaContentProps{
  actQaType: string,
  loginState: boolean,
  qaInfo: qaInfo
}
let editor: any;
class QaContent extends Component<QaContentProps> {
  constructor(props: QaContentProps){
    super(props)
  }
  state = {
    labelScreenVal: '',
    labelList: [],
    qaList: [],
    actQaId: ''
  }
  componentDidMount() {
    this.initEditor();
    this.getLabel('');
    this.getQaType('');
    // this.getQaChatList();
  }
  componentWillReceiveProps(nextProps: any) {
    if (nextProps.actQaType !== this.props.actQaType) {
      console.log('123 :>> ', 123);
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
    console.log('label :>> ', type);
    const data = {
      type
    }
    editor.txt.html('');
    const res: any = await getQaType(data);
    const resData: any = res.result;
    console.log('resData31231312312 :>> ', resData);
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
    this.setState({
      qaList: [...this.state.qaList, resData],
      actQaId: resData.dialogId
    })
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
  closeChat() {
  }
  submit() {
    console.log('editor.txt.text() :>> ', editor.txt.text());
    console.log('editor.txt.text() :>> ', editor.txt.html());
    const questionData: any = {
      qaType: 'question',
      dialogId: '313241',
      questionInfo: editor.txt.text(),
      resTime: new Date().getTime()
    }
    console.log('questionData :>> ', questionData);
    this.getQaChatList(editor.txt.text());
  }

  render() {
    const { labelList, qaList } : any = this.state
    console.log('qaList :>> ', qaList);
    return (
      <div className="qaContent">
        <div className="qaInfo">
          <div className="qaList">
            {
              qaList.length > 0 &&
              qaList.map((v: any) => {
                return <div key={v.dialogId}>
                  {
                    v.state !== 99 && <QuestionModel loginState={this.props.loginState} qaData={v} />
                  }
                  <AnswerModel loginState={this.props.loginState} qaData={v} qaDetail={this.getQaDetail.bind(this)} getQa={this.getQaChatList.bind(this)} />
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
              <Button onClick={this.closeChat}>关闭会话</Button>
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