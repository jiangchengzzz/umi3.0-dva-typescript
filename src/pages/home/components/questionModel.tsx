/*
 * @Author: 蒋承志
 * @Description: 我的收藏问题
 * @Date: 2020-09-18 11:59:31
 * @LastEditTime: 2020-10-09 18:27:04
 * @LastEditors: 蒋承志
 */
import React, { FC } from 'react';
import './component.less';
import { Pagination } from 'antd';

interface UserModalProps {
  qaData: any;
  loginState: boolean;
}

const QuestionModel: FC<UserModalProps> = (props: UserModalProps) => {
  const { qaData } = props
  return (
    <div className="qModelbox">
      <div className="contentBox">
        <div className="userAnswer">
          <div className="userInfo">
            <span></span>
            <span>{qaData.reqTime}</span>
          </div>
          <div className="infoBox">
            {
              qaData.question
            }
          </div>
        </div>
        <div className="userImg"></div>
      </div>
    </div>
  )
}
export default QuestionModel;