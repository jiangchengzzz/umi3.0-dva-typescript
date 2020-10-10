/*
 * @Author: 蒋承志
 * @Description: 我的收藏问题
 * @Date: 2020-09-18 11:59:31
 * @LastEditTime: 2020-10-10 17:11:49
 * @LastEditors: 蒋承志
 */
import React, { Component, FC } from 'react';
import './component.less';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Pagination } from 'antd';

interface PersonServerAnswerModelProps {
  qaData: any;
  loginState: boolean;
}

class PersonServerAnswerModel extends Component<PersonServerAnswerModelProps> {
  constructor(props: PersonServerAnswerModelProps){
    super(props)
  }
  state = {
    upload: false,
    showUpload: false
  }
  componentDidMount() {
  }
  upload(type: boolean) {
    this.setState({
      upload: type
    })
  }
  render() {
    const { qaData } = this.props
    return(
      <div className="aModelbox persionServer">
        <div className="contentBox">
          <div className="robotImg"></div>
          <div className="robotAnswer">
            <div className="robotInfo">
              <span>税小悟</span>
              <span>{qaData.reqTime}</span>
            </div>
            <div className="infoBox">
              <div className="infoContent">
                <div className="answerContent">
                  <div className={this.state.upload ? "answerContentBox upload": "answerContentBox"}>
                    <div className="contentHtml">{this.props.qaData.question}</div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PersonServerAnswerModel;