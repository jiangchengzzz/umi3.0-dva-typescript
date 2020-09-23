/*
 * @Author: 蒋承志
 * @Description: 问答内容
 * @Date: 2020-09-18 11:59:31
 * @LastEditTime: 2020-09-23 14:57:05
 * @LastEditors: 蒋承志
 */
import React, {Component} from 'react';
import './qaContent.less';
import request from '@/utils/request';
import { Button } from 'antd';
import E from 'wangeditor'

interface QaContentProps{
  actQaType: string
}
let editor: any;
class QaContent extends Component<QaContentProps> {
  constructor(props: QaContentProps){
    super(props)
  }
  state = {
    labelScreenVal: '',
    labelList: []
  }
  componentDidMount() {
    console.log('this.props :>> ', this.props.actQaType);
    this.initEditor()
    this.getLabel();
    this.getQaChatList()
  }
  componentWillReceiveProps(nextProps: any) {
    if (nextProps.actQaType !== this.props.actQaType) {
      console.log('nextProps.actQaType :>> ', nextProps.actQaType);
      editor.txt.html('');
      this.getLabel();
    }
  }
  getQaChatList() {
    request.get('/api/qaChatList', {
      params: {
        value: this.state.labelScreenVal
      }
    }).then((res: any) => {
      this.setState({
        labelList: res.labelList
      })
    }).catch( (e: any) => {
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
      console.log(editor.txt.text());
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
      console.log('1234234 :>> ', html);
    }
    editor.customConfig.uploadImgShowBase64 = true;
    editor.create();
    // editor.txt.html('<p style="color: #cccccc">请输入您要资讯的问题</p>');
  }
  getLabel() {
    request.get('/api/labelList', {
      params: {
        value: this.state.labelScreenVal
      }
    }).then((res: any) => {
      this.setState({
        labelList: res.labelList
      })
    }).catch( (e: any) => {
    })
  }
  labelClick(labelId: string) {
    console.log('labelId :>> ', labelId);
  }
  closeChat() {
    console.log('关闭 :>> ');
  }
  submit() {
    console.log('editor.txt.text() :>> ', editor.txt.text());
    console.log('editor.txt.text() :>> ', editor.txt.html());
    console.log('提交 :>> ');
  }

  render() {
    const { labelList } : any = this.state
    return (
      <div className="qaContent">
        <div className="qaInfo">
          <div className="qaList">

          </div>
        </div>
        <div className="label">
          <div className="title">我想咨询：</div>
          <div className="labelList">
            {
              labelList.map((v: any) => {
                return (
                  <div className="labelItem" key={v.id}>
                    <Button size="small" onClick={() => this.labelClick(v.id)}>{v.name}</Button>
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
              <Button onClick={this.submit}>发送</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default QaContent;